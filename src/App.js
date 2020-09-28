import React from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import { useForm } from "react-hook-form";
import NeoVis from 'neovis.js/dist/neovis.js';

export default class PlayerChecker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerGuess: '',
            result: 'n/a',
        };

    }

    handleChange = (event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            this.setState({playerGuess: event.target.value})
            if(parseInt(event.target.value)<100)
            {
                this.setState({
                    playerGuess: event.target.value,

                });
                var ranking = event.target.value;
                var mainObj=this
                $.ajax({
                    data:"QUERY="+(parseInt(ranking)-1),
                    url:'http://127.0.0.1:8080/query',
                    method:'POST',
                    success:function(data)
                    {
                        console.log("found: ",data)
                        var topPlayers = extractNames(JSON.parse(data));
                        console.log(topPlayers);
                        var i;
                        for (i = 0; i < topPlayers.length; i++) {
                            setUpGraph(i,topPlayers[i]);
                        }
                    },
                    error: function()
                    {
                        console.log("not found: ",ranking)
                        mainObj.setState({
                            result: ranking + " not found",
                        });
                    }
                });
            }
            else
            {
                console.log("else: ")
                this.setState({playerGuess: ""})
            }
        }
        else
        {
            console.log("else: ")
            this.setState({playerGuess: ""})
        }
    };

render() {
    return (
        <div>
        <input
        value={this.state.playerGuess}
        onChange={this.handleChange}
        />
        </div>
    );
}
}




function extractNames(plRankings)
{
    var topPlayers=[]
    plRankings.forEach(function(entry) {
        //console.log(entry._fields[1]);
        topPlayers.push(entry._fields[1]);
    });
    //console.log(topPlayers);
    return topPlayers;
}

function setUpGraph(i,player)
{
    console.log("player --- ",player);
    var config={
        container_id: "viz"+i,
        server_url:"bolt://54.87.236.230:34038",
        server_user:"neo4j",
        server_password:"friends-axis-conduct",
        initial_cypher:"MATCH (m:Match)<-[sg:SCORED_GOAL]-(person:Person) WHERE person.name='"+player+"' MATCH p=(m:Match)-[it:IN_TOURNAMENT]->(Tournament) RETURN m,person,sg,p LIMIT 25",
        labels:{
            "Person":{
                caption: "name",

            },
            "Match":{
                caption: "stage",
            },
            "Tournament":{
                caption: "name",
            }
        },
        relationships: {
            "SCORED_GOAL": {
                caption: "minute"
            },
            "IN_TOURNAMENT": {
                thickness: "1",
                caption: false
            }
        },

    }
    var viz = new NeoVis(config);
    viz.render();
}

//setUpGraph();



