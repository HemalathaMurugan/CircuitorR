import React,{Component} from 'react'
import Circuit from '../components/Circuit'
import ErrorsContainer from './ErrorsContainer';


export default class CircuitContainer extends Component {

  state = {
    output: null
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
    // }----------------------- METHOD2 TO GET OUTPUT
    //------------------------- iterate though all wires . If any gate is there whose id is not in the inputId of the wire
    //that one is gonna give a direct output
      const inputGates = this.props.wires.map((wire) => wire.inputID)
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
    console.log('got build click')
    let output;
    if((this.props.wires.length>0) && (this.props.gates.length>0)){
       this.setState({
         output: this.getCircuitOutput()
       })
    //return <ErrorsContainer output={output}/>
    }
  }

    render(){
        //console.log(this.props)
        //console.log("ouput: ", ()=> this.getCircuitOutput())
        return(
          <div className="circuit-container">
            <div>
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
                    <button onClick={()=>this.handleBuild()} class="ui button">
                      <i class="stop icon"></i>
                      Build
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
