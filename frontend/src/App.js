import React, { Component } from 'react';
//import { Button, GridColumn } from 'semantic-ui-react'
import './App.css';

// import CircuitContainer from './containers/CircuitContainer';
// import GatesContainer from './containers/GatesContainer';
// import ErrorsContainer from './containers/ErrorsContainer'
// import InputOptionsContainer from './containers/InputOptionsContainer'
// import { Grid, Segment } from 'semantic-ui-react'
// import ReactDOM from 'react-dom'
// import io from 'socket.io-client';
import Login from './components/Login';
import Home from './components/Home';
import NavBar from './components/NavBar';
import NewUser from './components/NewUser';
import UserCircuitsContainer from './containers/UserCircuitsContainer';
import IndividualCircuit from './components/IndividualCircuit';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


//window.socket = io('http://localhost:80/');

export default class App extends Component {
    render(){
      return(
      <BrowserRouter>
          <NavBar />
          <Switch>
              <Route path="/home" component={Home}/>
              <Route exact path="/login" component={Login} />
              <Route exact path="/new" component={NewUser} />
              <Route exact path="/circuits" component={UserCircuitsContainer} />
              <Route exact path="/circuits/:id" component={IndividualCircuit} />
          </Switch>
      </BrowserRouter>
      )
    }
}

