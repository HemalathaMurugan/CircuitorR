import React,{Component} from 'react'
import Circuit from '../components/Circuit'
import NewCircuit from '../components/IndividualCircuit'
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
      
      let opvalues = [];
      let opvalue = null;
      outputGates.forEach((gate)=> {
          let [ inputWire1, inputWire2] = this.props.wires.filter((wire)=> wire.outputID === gate.id)
          
          opvalue = this.performGateCalculation(inputWire1, inputWire2, gate)
          opvalues.push(opvalue)
      })
      
     console.log('opvalue', opvalue)
    return opvalue ? 1 : 0
  }

  getSignal = (wire) => {
    // console.log(wire)
    const gate = this.props.gates.find(gate => gate.id === wire.inputID)
    const inputWires = this.props.wires.filter(wire => wire.outputID === gate.id)
    return this.performGateCalculation(inputWires[0], inputWires[1], gate)
  }

  performGateCalculation = (inputWire1, inputWire2, gate) => {
    let value1 = 0
    let value2 = 0
    if (inputWire1 !== undefined) value1 = this.getSignal(inputWire1)
    else value1 = gate.fixedInput1
    if (inputWire2 !== undefined) value2 = this.getSignal(inputWire2)
    else value2 = gate.fixedInput2
    value1 = value1 ? 1 : 0
    value2 = value2 ? 1 : 0
    console.log('VALUES', gate, value1, value2)

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
    // onClick = {(e)=>this.handleClick(e)}> mousepointer
  }


  handleBuild = () => {
    //yet to set built=true -reminder
    this.setState({ built: true })
    console.log('got build click')
    let output;
    if((this.props.wires.length>0) && (this.props.gates.length>0)){
       //this.findInputGates();
       this.setState({
         output: this.getCircuitOutput().toString()
       })
    //return <ErrorsContainer output={output}/>
    }
  }

  renderNewCircuit = () => {
    return (
      <NewCircuit changeFixedInput={this.props.changeFixedInput} /> 
                
    )
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
    fetch('http://localhost:80/my/circuits', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        gates: this.props.gates,
        wires: this.props.wires,
        saved: this.state.saved,
        built: this.state.built,
        userId: localStorage.userId
      })
    })
  }

    render(){
        console.log(this.props.gates)
        console.log(this.props.wires)
        return(
          <div className="circuit-container">
            <div>
             
                <Circuit changeFixedInput={this.props.changeFixedInput} gates={this.props.gates} wires={this.props.wires}  
                /> 
                <br></br>
                {()=>this.renderNewCircuit()}
            </div>
            <div class="topcorner">
                  
                <div class="ui buttons">
                    <button onClick={this.handleBuild} class="ui button">
                      <i class="stop icon"></i>
                      Build
                    </button>
                    {/* <button class="ui labeled icon button">
                      <i class="left chevron icon"></i>
                      Undo
                    </button>
                    
                    <button class="ui button" onClick={()=>this.saveCircuit()}>
                      <i class="save icon"></i>
                      Save 
                    </button>
                    <button class="ui right labeled icon button">
                      Redo
                      <i class="right chevron icon"></i>
                    </button>*/}
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
