import React from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import { useForm } from "react-hook-form";

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