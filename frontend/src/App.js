import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import NavBar from './components/NavBar';
import NewUser from './components/NewUser';
import UserCircuitsContainer from './containers/UserCircuitsContainer';
import IndividualCircuit from './components/IndividualCircuit';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NewCircuit from './components/NewCircuit';


//window.socket = io('http://localhost:80/');

export default class App extends Component {

  state={
    token: localStorage.getItem('token')
  }

  saveToken = (token) =>{
    this.setState({
      token: token
    })
  }
    
    render(){
      if(this.state.token === null) {
        return (
          <Router>
          <div className="App">
            <Switch>
              <Route path="/" render={() => <Login saveToken={this.saveToken} />}/>
            </Switch>
          </div>
        </Router>
        )
      } else {
      return(
      <Router>
          <NavBar />
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" render={() => <Login saveToken={this.saveToken} />} />
              <Route exact path="/newaccount" component={NewUser} />
              <Route exact path="/circuits" component={UserCircuitsContainer} />
              <Route exact path="/circuits/:id" component={IndividualCircuit} />
              <Route exact path="/newcircuit" component={NewCircuit} />
          </Switch>
      </Router>
      )
    }
  }

    

    componentDidMount(){
        //this.checkAuth()
    }
}

