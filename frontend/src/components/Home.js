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
        <div class="ui centered card">
            <div class="image">
              <img src="/images/avatar2/large/elyse.png" />
            </div>
            <div class="content">
              <a class="header">My circuitor</a>
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