import React,{Component} from 'react';
import {Button, GridColumn} from 'semantic-ui-react'
import './App.css';
import CircuitContainer from './containers/CircuitContainer';
import GatesContainer from './containers/GatesContainer';
import InputOptionsContainer from './containers/InputOptionsContainer'
import { Grid,  Segment} from 'semantic-ui-react'
import ReactDOM from 'react-dom'

//db.json accepts the keys to be strictly strings and does not accept comment lines

// const exampleData = {
//   gates: [
//     {
//         id: 0,
//         type: "and",
//         location: {
//           x: 200, y: 200
//         },
//         fixedInput1: 0,
//         fixedInput2: 1
//     },
//     {
//         id: 1,
//         type: "and",
//         location: {
//           x: 200, y: 120
//         },
//         fixedInput1: 0,
//         fixedInput2: 1
//     },
//     {
//         id: 2,
//         type: "or",
//         location: {
//           x: 350, y: 160
//         },
//     },
//     {
//         id: 3,
//         type: "not",
//         location: {
//           x: 440, y: 160
//         },
//     }
//   ],
//   wires: [
//     {
      
//       inputID: 0,
//       outputID: 2,
//       // location: {
//       //   x: 100, y: 100
//       // },
//     },
//     {
//       inputID: 1,
//       outputID: 2,
//       // location: {
//       //   x: 100, y: 100
//       // }, 
//     },
//     {
//       inputID: 2,
//       outputID: 3,
//       // location: {
//       //   x: 100, y: 100
//       // },
//     },
//     {
//       inputID: 3,
//       outputID: "display",
//       // location: {
//       //   x: 100, y: 100
//       // },
//     },
//   ]
// }

class  App extends Component{

  state = {
    gates: [],
    wires: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/gates')
    .then(res=> res.json())
    .then((gatesData) => {
        console.log(gatesData)
       this.setState({
         gates: [...this.state.gates, gatesData]
       })
    })

    fetch('http://localhost:3000/wires')
    .then(res=> res.json())
    .then((wiresData) => {
        console.log(wiresData)
       this.setState({
         wires: [...this.state.wires, wiresData]
       })
    })

    
}

  render(){
    console.log(this.state.gates)
    console.log(this.state.wires)
  return (
    <div>
      <div className="App">
       
        <header className="App-header">
             <Segment>
               <Grid celled>
                <Grid.Row>
                      <Grid.Column width={3}>
                          <div className="ui container">
                        
                          <GatesContainer />
                          </div>
                      </Grid.Column>


                      <Grid.Column width={13}>
                          <div className="ui container" >
                          <CircuitContainer gates={this.state.gates} 
                                           wires = {this.state.wires}
                          />
                          </div>
                      </Grid.Column>

                        
                  </Grid.Row>

                  <Grid.Row>

                      <Grid.Column width={3}>
                          Input option Container is to rendered here
                      </Grid.Column>

                      <Grid.Column width={10}>
                          Waveforms are to be rendered here. may be with a waveform container
                      </Grid.Column>

                      <Grid.Column width={3}>
                          If you want to add an extra column you can add like this
                      </Grid.Column>


                  </Grid.Row>

                </Grid> 
              </Segment>
              <div style={{width: "500px", height: "500px", border: "red"}}>{()=>this.getCircuitOutput()}</div>
        </header>
      </div>
      
    </div>
  );
  }

  getCircuitOutput = () => {
    const outputWire = this.state.wires.find(wire => wire.outputID === "display")
    const outputValue = this.getSignal(outputWire)
    if (!outputValue) {
      return "1"
    } else {
      return "0"
    }
  }

  getSignal = (wire) => {
    // console.log(wire)
    const gate = this.state.gates.find(gate => gate.id === wire.inputID)
    const inputWires = this.state.wires.filter(wire => wire.outputID === gate.id)
    return this.performGateCalculation(inputWires[0], inputWires[1], gate)
  }

  performGateCalculation = (inputWire1, inputWire2, gate) => {
    let value1 = null
    let value2 = null
    console.log(gate)
    console.log(gate.fixedInput1, gate.fixedInput2)
    if (gate.fixedInput1 !== undefined && gate.fixedInput2 !== undefined) {
      value1 = gate.fixedInput1
      value2 = gate.fixedInput2
    } else {
      if (inputWire1 !== undefined) value1 = this.getSignal(inputWire1)
      if (inputWire2 !== undefined) value2 = this.getSignal(inputWire2)
    }

    if (gate.type === "and") {
      return value1 && value2
    } else if(gate.type === "or"){
      return value1 || value2
    } else if(gate.type === "not"){
      return !value1
    } else if(gate.type === "exor"){
      return value1!==value2
    } else if(gate.type === "exnor"){
      return !(value1!==value2)
    } else if(gate.type === "nand"){
      return !(value1 && value2)
    } else if(gate.type === "nor"){
      return !(value1 || value2)
    }
  }
}

export default App;

//yet to render GatesContainer and InputOptionsContainer once they are defined