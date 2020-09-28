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
          playerGuess: 'Elain',
          result: 'n/a',
        };
        
      }

      handleChange = (event) => {
        this.setState({
          playerGuess: event.target.value,
            
        });
        var player = event.target.value;
        console.log("player: ",player)
        var mainObj=this
        $.ajax({
            data:"QUERY="+player,
            url:'http://127.0.0.1:8080/query',
            method:'POST',
            success:function(data)
            {
                console.log("found: ",data)
                mainObj.setState({
                  result: player + " found!!!",
                });
            },
            error: function()
            {
                console.log("not found: ",player)
                mainObj.setState({
                  result: player + " not found",
                });
            }
        });
          
          
          
      };

      render() {
        return (
          <div>
            <input
              value={this.state.playerGuess}
              onChange={this.handleChange}
            />
            <p>{this.state.result}</p>
          </div>
        );
      }
    }
    
    
    
    
function setUpGraph()
{
    var config={
                container_id: "viz",
                server_url:"bolt://54.87.236.230:34038",
                server_user:"neo4j",
                server_password:"friends-axis-conduct",
                initial_cypher:"MATCH (m:Match)<-[sg:SCORED_GOAL]-(person:Person) WHERE person.name='Maren Meinert' MATCH p=(m:Match)-[it:IN_TOURNAMENT]->(Tournament) RETURN m,person,sg,p LIMIT 25",
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

setUpGraph();