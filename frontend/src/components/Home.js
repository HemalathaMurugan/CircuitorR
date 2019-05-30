import React from 'react';
import {Link} from 'react-router-dom'

export default class Home extends React.Component{
  render(){
    if(localStorage.getItem('token') === null){
      return(
          <div>
              Please Login
          </div>
      )
  } else {
    return(
      <div>
        {/* <img src="../assets/logo.png"/> */}
      <div class="ui placeholder segment">
       
      <div class="ui centered card">
      <div class="image">
        <img src={require("../assets/logo.png")} />
      </div>
      <div class="content" style={{ marginTop: '100px'}}>
        <a class="header"></a>
        <div class="meta">
          <span class="date">
          Welcome to CircuitorR!
          </span>
        </div>
        <div class="ui placeholder segment">
          Digital logic circuits are created with basic Components called logic gates.
          <br></br>
          There are seven basic logic gates: 
          <br></br>
          <h4 align="center">And</h4>
          <h4 align="center">Or</h4>
          
          <h4 align="center">Not</h4>
          
          <h4 align="center">Exclusive -Or</h4>
          
          <h4 align="center">Nand</h4>
          
          <h4 align="center">Nor</h4>
         
          <h4 align="center">Exclusive - And</h4>
          
          You can play around with these logic gates and check their functionalities. 


        </div>
      </div>
      <div class="extra content">
        <a>
          <i class="user icon"></i>
          Not Confident in creating one?!? Visit the circuits by other users that are active now to get an idea.
        </a>
      </div>
    </div>
    
    </div>
    </div>
        
    )
  }
  }
}

{/* Home page of a user:
        This should show all options for the users . Like their own circuits . Link to create new circuit etc
        Options and contents the user sees: 
        1. About the website -> light intro to digital circuit; What can you do here; About errors
        2. Link to view previously saved circuits
        3. Link to enter into a room(we socket)
        4. chat box */}