import React,{Component} from 'react'
import Circuit from '../components/Circuit'

export default class CircuitContainer extends Component {

  
  //when this function was invoked in the render function of this component, it threw errors.
  //because fetch was not complete. So this.props.wires and this.props.wires were undefined before the fetch even works.
  // so the ternary on the line where the function was invoked fixed the problem.
  getCircuitOutput = () => {
    
    const outputWire = this.props.wires.find(wire => wire.outputID === "display")
    const outputValue = this.getSignal(outputWire)
    console.log("ouput wire:", outputWire)
    if (!outputValue) {
      return "1"
    } else {
      return "0"
    }
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
    console.log(gate)
    console.log(gate.fixedInput1, gate.fixedInput2)
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


    render(){
        //console.log(this.props)
        //console.log("ouput: ", ()=> this.getCircuitOutput())
        return(
            <div className="whats going on">
                <Circuit gates={this.props.gates} wires={this.props.wires}
                />
                 <p style={{ width: "500px", height: "500px" }}>Ouput: {((this.props.wires.length  > 0) && (this.props.gates.length > 0))? this.getCircuitOutput() : null}</p>
            </div>
        )
    }
}
