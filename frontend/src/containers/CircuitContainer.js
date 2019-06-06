import React,{Component} from 'react'
import Circuit from '../components/Circuit'
import IndividualCircuit from '../components/IndividualCircuit'
import ErrorsContainer from './ErrorsContainer';
import {Popup} from 'semantic-ui-react'


export default class CircuitContainer extends Component {

  state = {
    output: null,
    inputGates: [],
    saved: false, //future usage: If user clicks save, the circuit can be found in my circuits. Otherwise No.
    built: false, //future usage: If built -> coukld not be editted
    
  }

  
  
  getCircuitOutput = () => {
      // setRecentlyDropped = (type) => {
  //   this.setState({recentlyDropped: type})
  // }  ---> this would be the solution if circuitcontainer was the parent of individualcircuit
  
  
  //Please dont remove the following comments at any cost!
  
  //when this function was invoked in the render function of this component, it threw errors.
  //because fetch was not complete. So this.props.wires and this.props.wires were undefined before the fetch even works.
  //so the ternary on the line where the function was invoked fixed the problem.

      const inputGates = this.props.wires.map((wire) => wire.inputID) //this is the inputgate of that particular wire
      const outputGates = this.props.gates.filter((gate) => inputGates.includes(gate.id) === false )
      
      let opvalues = [];
      let opvalue = null;
    
      if(outputGates.length > 1){
        alert('Invalid Circuit')
        return 'NOPE! That was Invalid.Start a New Circuit Please'
      }
      let gate = outputGates[0]
        let [ inputWire1, inputWire2] = this.props.wires.filter((wire)=> wire.outputID === gate.id)
        
        opvalue = this.performGateCalculation(inputWire1, inputWire2, gate)
        opvalues.push(opvalue)
      
      
     console.log('opvalue', opvalue)
    return opvalue ? 1 : 0
  }

  getSignal = (wire) => {
    
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
    //return <ErrorsContainer output={output}/> ---set error contents with or without linking particular error gate/wire
    }
  }

  handleHelpClick = () => {

  }

  handleResetClick = () => {
    fetch(`http://localhost:80/my/circuits/${this.props.currentCircuitId}/gates`,{
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        gates: []
        
      })
    }).then( res => res.json())
    .then(json => {
      return json;
    })

    fetch(`http://localhost:80/my/circuits/${this.props.currentCircuitId}/wires`,{
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        wires: []
        
      })
    }).then( res => res.json())
    .then(json => {
      return json;
    })
    this.props.settingStateAfterReset()
  }

 
  handleUndoClick = (recentlyDropped) => {
    console.log('got here -> undo is clicked')
    //console.log(this.state.recentlyDropped)
    if(recentlyDropped){
      //It was throwing error before having the above conditional. 'Cannot read type of null'
     if(!recentlyDropped.type){ //this means that it is a wire
      console.log('CONFIRM THAT IT IS A WIRE', recentlyDropped.id)
      fetch(`http://localhost:80/my/circuits/${this.props.currentCircuitId}/wires/${recentlyDropped.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }   
        }).then(res => res.json())
          .then(json => {
            return json;
          })
          this.props.settingStateAfterUndo("wire", recentlyDropped.id)
        }
     else { //this means that it is a gate
      console.log('CONFIRM THAT IT IS A GATE', recentlyDropped.id)
      fetch(`http://localhost:80/my/circuits/${this.props.currentCircuitId}/gates/${recentlyDropped.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }   
       }).then(res => res.json())
        .then(json => {
        return json;
     })
     this.props.settingStateAfterUndo("gate", recentlyDropped.id)
    }
  }
  }
 

    render(){
        console.log(this.props.currentCircuitId)
        console.log(this.props.recentlyDropped)
        return(
          <div className="circuit-container">
            <div>
             
                <Circuit 
                        changeFixedInput={this.props.changeFixedInput}
                        gates={this.props.gates}
                        wires={this.props.wires} 
                        //handleUndoClick={() => this.handleUndoClick(this.props.recentlyDropped)} 
                /> 
                <br></br>
                {/* {()=>this.renderIndividualCircuit()} */}
            </div>
            <div class="topcorner">
                  
                <div class="ui buttons">
                    <button class="ui button" onClick={this.handleBuild} >
                      <i class="stop icon"></i>
                      Build
                    </button>
                    <button  class="ui labeled icon button" onClick={()=>this.handleUndoClick(this.props.recentlyDropped)}>
                      <i class="left chevron icon"></i>
                      Undo
                    </button>
                    
                    <button class="ui button" onClick={this.handleHelpClick}>
                      <i class="save icon"></i>
                      Help 
                    </button>
                    <button class="ui right labeled icon button" onClick={this.handleResetClick}>
                      Reset
                      <i class="right chevron icon" ></i>
                    </button>
                  </div>  
                  
                  <div >
                    Output: {this.state.output ? this.state.output : null}
                      
                  </div>
        

              </div>
            
              
            
          </div>  
        )
    }
}
