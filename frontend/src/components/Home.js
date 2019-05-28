import React from 'react';

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
        Home page of a user:
        This should showv all options for the users . Like their own circuits . Link to create new circuit etc
      </div>
    )
  }
  }
}