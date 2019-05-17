import React,{Component} from 'react';

import './App.css';
import CircuitContainer from './containers/CircuitContainer';
import GatesContainer from './containers/GatesContainer';
import InputOptionsContainer from './containers/InputOptionsContainer'

class  App extends Component{

  state = {
      AndGates: [],
      OrGates: [],
      NotGates: [],
      ExorGates: [],
      ExNorGates: [],
      NorGates: [],
      NandGates:[],
      wires: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/AndGates')
    .then(res=> res.json())
    .then((AndGatesData) => {
        //console.log(gatesData)
       this.setState({
         AndGates: [...this.state.AndGates, AndGatesData]
       })
    })

    fetch('http://localhost:3000/OrGates')
    .then(res=> res.json())
    .then((OrGatesData) => {
        //console.log(gatesData)
       this.setState({
         OrGates: [...this.state.OrGates, OrGatesData]
       })
    })

    fetch('http://localhost:3000/NotGates')
    .then(res=> res.json())
    .then((NotGatesData) => {
        //console.log(gatesData)
       this.setState({
         NotGates: [...this.state.NotGates, NotGatesData]
       })
    })

    fetch('http://localhost:3000/wires')
    .then(res=> res.json())
    .then((wiresData) => {
        //console.log(wiresData)
       this.setState({
         wires: [...this.state.wires, wiresData]
       })
        
    })
}

  render(){
    //console.log(this)
  return (
    <div>
      <CircuitContainer AndGates={this.state.AndGates} 
                        OrGates={this.state.OrGates}
                        NotGates={this.state.NotGates} 
                        wires={this.state.wires}
      />
      <GatesContainer />
      {/* <InputOptionsContainer /> */}
    </div>
  );
  }
}

export default App;
