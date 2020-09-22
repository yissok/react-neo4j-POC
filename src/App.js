import React from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import { useForm } from "react-hook-form";



function App() {
    var playerStatus="n/a"

    const {register, handleSubmit, errors} = useForm();

    const onSubmit = data => {
        var player = document.getElementById("playerCheck").value;
        console.log("player: ",player)
        $.ajax({
            data:"QUERY="+player,
            url:'http://127.0.0.1:8080/query',
            method:'POST',
            success:function(data)
            {
                console.log("dataaaaa: ",data)
                playerStatus="found!"
                document.getElementById("playerStatus").value=playerStatus
            },
            error: function()
            {
                //alert(player,' not found!');
                console.log("not found: ",player)
                playerStatus="not found"
                document.getElementById("playerStatus").value=playerStatus
            }
        });
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>Enter a player name to check if she is in the database:</p>
                <input id="playerCheck" type='text' placeholder="Elaine0"/>
                <input type='submit'/>
            </form>

            <input id="playerStatus" value={playerStatus}/>
        </div>
    )
  
}

export default App;

