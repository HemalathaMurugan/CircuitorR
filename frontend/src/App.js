import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import NavBar from './components/NavBar';
import NewUser from './components/NewUser';
import UserCircuitsContainer from './containers/UserCircuitsContainer';
import NewCircuit from './components/NewCircuit';
import IndividualCircuit from './components/IndividualCircuit';
import CircuitShowPage from './components/CircuitShowPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'




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
              <Route exact path="/newuser" component={NewUser} />
              <Route exact path="/circuits" component={UserCircuitsContainer} />
              <Route exact path="/circuits/:id" component={IndividualCircuit} />
              <Route exact path="/newcircuit" component={NewCircuit} />
              <Route exact path="/circuits/:id" component={CircuitShowPage} />
             
          </Switch>
      </Router>
      )
    }
  }

    

    componentDidMount(){
        //this.checkAuth()
    }
}

//<Route exact path="/" component={Home}/>  without exact path on this line will always take you to the home page
//even if you give some other path 
