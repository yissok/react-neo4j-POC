import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'; 

function App() {
    const logic = () => {
        console.log("hello")
        var player="Elaine";
        $.ajax({
            data:"QUERY="+player,
            url:'http://127.0.0.1:8080/query',
            method:'POST',
            success:function(data)
            {
                console.log("dataaaaa: ",data)

            },
            error: function()
            {
                //alert(player,' not found!');
                console.log("not found: ",player)
            }
        });
    }
    
  return(
      <div>
      <h2>Hello</h2>
      <button onClick={logic}>Hello</button>
      </div>
  )
  
}
export default App; // Don’t forget to use export default!

