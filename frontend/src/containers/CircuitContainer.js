import React,{Component} from 'react'
import Circuit from '../components/Circuit'
import ErrorsContainer from './ErrorsContainer';
import {Popup} from 'semantic-ui-react'


export default class CircuitContainer extends Component {

  state = {
    output: null,
    inputGates: [],
    saved: false,
    built: false
  }
  
  
  //Please dont remove the following comments at any cost!
  
  //when this function was invoked in the render function of this component, it threw errors.
  //because fetch was not complete. So this.props.wires and this.props.wires were undefined before the fetch even works.
  //so the ternary on the line where the function was invoked fixed the problem.

  
  getCircuitOutput = () => {
    // const outputWire = this.props.wires.find(wire => wire.outputID === "display")
    // const outputValue = this.getSignal(outputWire)
    // if (!outputValue) {
    //   return "1"
    // } else {
    //   return "0"
    // }----------------------- METHOD2 TO GET OUTPUT -WITHOUT "display" STRING IN THE OUTPUT ID PLACE
    //------------------------- iterate though all wires . If any gate is there whose id is not in the inputId of the wire
    //that one is gonna give a direct output
      const inputGates = this.props.wires.map((wire) => wire.inputID) //this is the inputgate of that particular wire
      const outputGates = this.props.gates.filter((gate) => inputGates.includes(gate.id) === false )
      console.log('inputGates IDs: ',inputGates)
      console.log('outputGates: ', outputGates)
      let opwires = [];
      let opvalues = [];
      let opvalue = null;
      let opwire = null;
      // if(this.props.wires.length>0 && this.props.gates.length>0){
          outputGates.forEach((gate)=> {
          
              opwire = this.props.wires.find((wire)=> wire.outputID === gate.id)
              opwires.push(opwire)
              opvalue = this.getSignal(opwire)
              opvalues.push(opvalue)
              console.log('Ouput Wires: ', opwires)
              console.log('Output Values: ', opvalues)
              
              //return opvalue
          })
          // if (!opvalue){
          //   return '0'
          // } else {
          //   return '1'
          // }
     
    return opvalue
  }

  getSignal = (wire) => {
    // console.log(wire)
    const gate = this.props.gates.find(gate => gate.id === wire.inputID)
    const inputWires = this.props.wires.filter(wire => wire.outputID === gate.id)
    return this.performGateCalculation(inputWires[0], inputWires[1], gate)
  }

  performGateCalculation = (inputWire1, inputWire2, gate) => {
    let value1 = null
    let value2 = null
    if (gate.fixedInput1 !== undefined && gate.fixedInput2 !== undefined) {
      value1 = gate.fixedInput1
      value2 = gate.fixedInput2
    } else if(gate.fixedInput2 === undefined && gate.fixedInput1 !== undefined){
        value1 = this.getSignal(inputWire1)
    }else {
      if (inputWire1 !== undefined) value1 = this.getSignal(inputWire1)
      if (inputWire2 !== undefined) value2 = this.getSignal(inputWire2)
    }

    if (gate.type === "and") {
      return value1 && value2
    } else if (gate.type === "or") {
      return value1 || value2
    } else if (gate.type === "not") {
      return !value1
    } else if (gate.type === "exor") {
      return value1 !== value2
    } else if (gate.type === "exnor") {
      return !(value1 !== value2)
    } else if (gate.type === "nand") {
      return !(value1 && value2)
    } else if (gate.type === "nor") {
      return !(value1 || value2)
    }
  }

  handleClick = (e) => {
    console.log('Current posotion check:::',e.clientX, e.clientY)
    // onClick = {(e)=>this.handleClick(e)}>
  }


  handleBuild = () => {
    //yet to set built=true -reminder
    this.setState({ built: true })
    console.log('got build click')
    let output;
    if((this.props.wires.length>0) && (this.props.gates.length>0)){
       this.findInputGates();
       this.setState({
         output: this.getCircuitOutput()
       })
    //return <ErrorsContainer output={output}/>
    }
  }

  chooseInput  = () => {
    return(
    <select name="inputs">
                            <option value="0">0</option>
                            <option value="1">1</option>
                           
    </select>)
  }

  // findInputGates = () => {
  //   // this.props.gates.forEach( gate => {
  //   //   this.props.wires.forEach( wire => {
  //   //     console.log(gate.location.x)
  //   //    console.log(document.getElementById("existing-wire").getBoundingClientRect().x)
  //   //   })
  //   // })
  // }

  findInputGates = () =>{
     let wires = document.getElementsByClassName("wire")
     console.log(wires)
     console.log(document.getElementsByClassName("wire"))
    // for(let i=1; i < this.props.gates.length; i++){
    //   for(let j=1; j <this.props.wires.length; j++){
    //     this.props.gates[i].location.x
    //     console.log()
    //   }
    // }
  }

  askInput = () => {
    return (<i class="minus sign icon"
               data-content="choose binary input" 
               onClick={this.chooseInput} 
               data-variation="mini"
               data-position-left="200px"
            ></i>)
  }

  saveCircuit = () => {
    this.setState({ saved: true })
    console.log('you reached me')
    fetch('http://localhost:80/circuits', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        gates: this.props.gates,
        wires: this.props.wires,
        saved: this.state.saved,
        built: this.state.built
      })
    })
  }
// {
//       "id": 2,
//       "type": "exor",
//       "location": {
//         "x": 355.6875,
//         "y": 225.53125
//       },
//       "fixedInput1": null,
//       "fixedInput2": null
//     },
    render(){
        
        return(
          <div className="circuit-container">
            <div>
              {/* {this.askInput()} */}
                <Circuit gates={this.props.gates} wires={this.props.wires}  
                /> 
                <br></br>
                
            </div>
            <div class="topcorner">
                  
                <div class="ui buttons">
                    <button class="ui labeled icon button">
                      <i class="left chevron icon"></i>
                      Undo
                    </button>
                    <button onClick={this.handleBuild} class="ui button">
                      <i class="stop icon"></i>
                      Build
                    </button>
                    <button class="ui button" onClick={()=>this.saveCircuit()}>
                      <i class="save icon"></i>
                      Save 
                    </button>
                    <button class="ui right labeled icon button">
                      Redo
                      <i class="right chevron icon"></i>
                    </button>
                  </div>
                  
                  <div >
                    Output: {this.state.output ? this.state.output : null}
                        {/* <img src='../assets/dim.jpeg' class="visible content"/>
                        <img src='../assets/bulbGlowing.svg' class="hidden content"/> */}
                  </div>
        

              </div>
            
              
            
          </div>  
        )
    }
}
