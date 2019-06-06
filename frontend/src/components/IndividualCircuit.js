
import React from 'react';

import CircuitContainer from '../containers/CircuitContainer';
import GatesContainer from '../containers/GatesContainer';
import ErrorsContainer from '../containers/ErrorsContainer'
import InputOptionsContainer from '../containers/InputOptionsContainer'
import { Grid, Segment } from 'semantic-ui-react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client';


 window.socket = io('http://localhost:80/');
//window.socket = io('http://10.185.0.55:80/');

export default class  IndividualCircuit extends React.Component{
   
  state = {
    gates: [],
    wires: [],
    recentlyDropped: null, //detect whether gate or wire is the recently formed one-> undo
    currentlyDraggingGate: {
      offsetX: 0,
      offsetY: 0,
      gateType: null
    },
    currentlyDraggingWire: {
      offsetX: 0,
      offsetY: 0,
      inputID: null,
      outputID: null,
      endLocation: {
        x: 0,
        y: 0
      }

    }
  }

 //clicked circuit path worked after refreshing. Fix: following two methods
  componentDidMount(){
    this.getCircuit(this.props.match.params.id)
  }

  componentWillReceiveProps(newProps){
    if(this.props.match.params.id !== newProps.match.params.id){
      this.getCircuit(newProps.match.params.id)
    }
  }

  getCircuit(id) {
    
    console.log('ID:',id)
    // window.socket.on("connection", () => {
      window.socket.emit("connectToRoom", id)
      window.socket.on("renderGate", (gate) => {
        
        let newGate = {
          id: gate.id,
          type: gate.type,
          fixedInput1: gate.fixedInput1,
          fixedInput2: gate.fixedInput2,
          location: {
            x: gate.locationX,
            y: gate.locationY
          }
        }
       
        // console.log('CHECKING MATCH',gate.circuitId, id)
        if (gate.circuitId === id) {
          this.setState({ gates: [ ...this.state.gates, newGate ]})
        }
      })
      window.socket.on('renderWire', (wire)=> {
        let newWire = {
          id: wire.id,
          inputID: wire.inputID,
          outputID: wire.outputID
        }
        this.setState({ wires: [...this.state.wires, newWire]})
      })
   
    fetch(`http://localhost:80/my/circuits/${id}/gates`,{
        //fetch(`http://10.185.0.55:80/my/circuits/${id}/gates`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res=> res.json())
        .then(i_gates => {
            let result = []
            i_gates.forEach( gate=> {
              let c_gate = {
                id: gate.id,
                type: gate.type,
                fixedInput1: gate.fixedInput1,
                fixedInput2: gate.fixedInput2,
                location: {
                  x: gate.locationX,
                  y: gate.locationY
                }

              }
              result.push(c_gate)
            })

            this.setState({
                gates: result
            })
        })

         fetch(`http://localhost:80/my/circuits/${id}/wires`,{
          // fetch(`http://10.185.0.55:80/my/circuits/${id}/wires`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res=> res.json())
        .then(i_wires=> {

            this.setState({
                wires: i_wires
            })
        })

  }



  handleDragStart = (e) => {
      let mouseX = e.clientX //current x position of mouse
      console.log(e.target)
      console.log('rect', e.target.getBoundingClientRect())
      let gateX = e.target.getBoundingClientRect().left //current x position of gate 
      let mouseY = e.clientY
      let gateY = e.target.getBoundingClientRect().top
      let i_offsetX =  (mouseX - gateX)
      let i_offsetY =  (mouseY - gateY)
      //console.log('offset', i_offsetX, i_offsetY)
      let newId = Math.max(...this.state.gates.map(gate => gate.id)) + 1
      //we modified this line because the gate id were formed asynchronously when multiple users on sockets do drag and drop
      //so id dupication was happening with the fetch requests
      //Math.max gives the id (which is highest in number) and post the gates in the right order
      this.setState({
        currentlyDraggingGate: {
          id: newId,
          offsetX: i_offsetX,
          offsetY: i_offsetY,
          gateType: e.target.id //this id is the one set in the gate image container to determine its type
        }
      })
    
    }

    handleDragEnd = (e) => {
      e.preventDefault()
      let circuit = document.getElementById("circuit-created")
      
      
      let finalPositionY = e.clientY - circuit.getBoundingClientRect().y -(2* this.state.currentlyDraggingGate.offsetY) + 52

      let finalPositionX = e.clientX - circuit.getBoundingClientRect().x - (2* this.state.currentlyDraggingGate.offsetX)      
      

      let newFixedInput1 = 0;
      let newFixedInput2 = 0;
      let id = this.props.match.params.id
      const gate = {
       // "id": this.state.currentlyDraggingGate.id, //id will be automatically generated in sequelize
        "type": this.state.currentlyDraggingGate.gateType,
        "location": {
          "x": finalPositionX,
          "y": finalPositionY
        },
        "fixedInput1": newFixedInput1,
        "fixedInput2": newFixedInput2,
        "circuitId": id
        
      }
      
     
      
       fetch(`http://localhost:80/my/circuits/${id}/gates`,{
        //fetch(`http://10.185.0.55:80/my/circuits/${id}/gates`,{
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(gate)
      }).then(res => res.json())
      .then( gate => {
        window.socket.emit("gateDrop", gate)
          //helps in detection of undo
          this.setState({
            recentlyDropped: gate
          })
         // this.setState({ gates: [ ...this.state.gates, newGate ]}) ---> this line was replaced by window.socket.emit('gateDrop',gate)
        
      })
      

      //I forgot the setState with the new gate initially. So it was showing up after reloading the page
      //reason being, update was happening on the backend only. So reload could render elements updates in db.json
      //setState would make the changes to appear in the frontend as well. Thats the advantage of setState. 
      //We can update the changes both on the server and on the frontend with the use of fetch-post request and setState simultaneously
      
      
   
  }

  handleWireDragStart = (e) => {
    let mouseX = e.clientX
    let mouseY = e.clientY
    let wireX = e.target.getBoundingClientRect().left
    let wireY = e.target.getBoundingClientRect().top

    //On the first drag end, that should be the input gate (inputID)
    //On the second drag end, that should be the output gate (outputID)
    //Second way could be :suggestion -> (if time permits)
    //add onclick on each of the gate. If clicked , set that as inputId (if !inputId)
    //if this gate's Id !== inputId, set this as inputId. else-> set this gate in putputId
    //lets try that in ten mins
    let i_offsetX =  mouseX - wireX
    let i_offsetY =  mouseY - wireY
    let newID = this.state.wires.length + 1
    this.setState({
      currentlyDraggingWire: {
        offsetX: i_offsetX,
        offsetY: i_offsetY,
        inputID: null, 
        outputID: null
      }
    })

  }

  handleWireDragging = (e) => {
   // console.log('got here wire dragging - ondrag event listener works')
    let circuit = document.getElementById("circuit-created")
    //let mouseX = e.clientX
    //let mouseY = e.clientY 
    let wireRectLeft = e.clientX - circuit.getBoundingClientRect().x - (2*this.state.currentlyDraggingWire.offsetX) + 52
    let wireRectRight = wireRectLeft + 50 //since i fixed wire's width as 50 not 70(as in the gate)
    let wireRectTop = e.clientY - circuit.getBoundingClientRect().y  - (2*this.state.currentlyDraggingWire.offsetY)
    let wireRectBottom = wireRectTop + 50
    //console.log('Left:',wireRectLeft, 'Right:',wireRectRight, 'Top:',wireRectTop, 'Bottom:',wireRectBottom)
    this.state.gates.forEach(gate => {
      let gateLeft = gate.location.x
      let gateRight = gate.location.x + 70
      let gateTop = gate.location.y
      let gateBottom = gate.location.y + 50

      if((wireRectLeft < gateRight) && (wireRectRight > gateLeft) && 
          (wireRectTop < gateBottom) && (wireRectBottom > gateTop)){
        
          //console.log('condition true')
       
          //console.log('mouse Positions x and y: ', e.clientX, e.clientY)
          if(this.state.currentlyDraggingWire.inputID === null){

                //this.setState({
                  this.state.currentlyDraggingWire = {
                    offsetX: this.state.currentlyDraggingWire.offsetX,
                    offsetY: this.state.currentlyDraggingWire.offsetY,
                    inputID: gate.id,
                    outputID: null
                  }
                //})          
               //setstate with wires output gate's x and y as mouse pointers x and y -> modify wire frontend for this
          } else {
                    
                    ///this.setState({
                      this.state.currentlyDraggingWire = {
                        offsetX: this.state.currentlyDraggingWire.offsetX,
                        offsetY: this.state.currentlyDraggingWire.offsetY,
                        inputID: this.state.currentlyDraggingWire.inputID,
                        outputID: gate.id
                      }
                   // })      
                  }
       }
    })

  }

  handleWireDragEnd = (e) => {
    console.log('got here- wire drag ENDS')
    let id = this.props.match.params.id
    let newID = this.state.wires.length + 1
    const newWire = {
      id: newID,
      inputID: this.state.currentlyDraggingWire.inputID,
      outputID: this.state.currentlyDraggingWire.outputID,
      circuitId: id
    }
    console.log(newWire)
   

    if( 
      [null, undefined].includes(newWire.inputID)
        ||
      [null, undefined].includes(newWire.outputID)
      ||
      (newWire.inputID===newWire.outputID)
    ){
      return
    }
    window.socket.emit("wireDrop", newWire)
    // this.setState({--->this line was creating two wires during every drop;Fix: moving websocket line above
    //   wires: [...this.state.wires, newWire]
    // })
    
    fetch(`http://localhost:80/my/circuits/${id}/wires`, {
      // fetch(`http://10.185.0.55:80/my/circuits/${id}/wires`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(newWire)
    }).then( res => res.json())
    .then( newWire => {
      //window.socket.emit("wireDrop", newWire) Moving this line above so that only valid wires get emitted
      this.setState({
        recentlyDropped: newWire //helps in detection for undo
      })
    }) 
   
  }
    

      //mouse pointer is going to be the output gate until a real gate is clicked 
      //once this state is set properly add event listener to each of the existing gate or in this gate(within this loop) , so as to detect the onclick -> onclicking this, would again confirm that this is the input gate 
      //check within the onclick event listener whether this is an inputID ;If not, set this as the output id

      //gate.onClick(console.log('got here - gate onclick'))
    
  //Ideas for drawing wires: on drag of pointer -> create a rectangular div like the ones we did for wire 
  // and rightside edge and top/bottom(depending on the position of gates and pointers)could be moved 
  //like a dragging with right side edge increasing, can be shown as the pointer is dragged
       
    changeFixedInput = (gateID, inputNumber, value)=> {
        console.log(value)
        let modifiedGates = []
        let inputFieldName = `fixedInput${inputNumber}`
        let givenGate = this.state.gates.find( gate => gate.id===gateID)
            givenGate[inputFieldName] = parseInt(value)
        
            modifiedGates = this.state.gates.map( gate => 
            gate.id !== gateID ? gate : givenGate)
            //givenGate.fixedInput1 = value
            this.setState({
                gates: modifiedGates
            })
    }

    settingStateAfterUndo = (wireOrGate, UndoId) => {
        if(wireOrGate === "gate"){
          let remainingGates = this.state.gates.filter( gate => gate.id!==UndoId)
          this.setState({
            gates: remainingGates
          })
        } else if(wireOrGate === "wire"){
          let remainingWires = this.state.wires.filter( wire => wire.id!==UndoId)
          this.setState({
            wires: remainingWires
          })
        }

    }

    settingStateAfterReset = () => {
      this.setState({
        gates: [],
        wires: []
      })
    }


  render() {
    // if (this.state.id !== this.props.params.match.id) {
    //   fetchGatesandWires()
    // }
    console.log('RECENTLY DROPPED',this.state.recentlyDropped)
    if(localStorage.getItem('token') === null){
        return(
            <div>
                Please Login
            </div>
        )
    } else {
    return (
    
       
        <div className="App">
       
        
          <header className="App-header">
            <Segment>
              <Grid celled>
                <Grid.Row>
                  
                  <Grid.Column width={3}>
                    <div className="ui container">
                      <GatesContainer handleDragStart={this.handleDragStart}
                                      handleDragEnd = {this.handleDragEnd}
                                      handleWireDragStart = {this.handleWireDragStart}
                                      handleWireDragEnd = {this.handleWireDragEnd}
                                      handleWireDragging = {this.handleWireDragging}
                      />
                      
                    </div>
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <div className="ui container" >
                      <CircuitContainer recentlyDropped={this.state.recentlyDropped}
                                        changeFixedInput={this.changeFixedInput} 
                                        gates={this.state.gates} 
                                        wires={this.state.wires}
                                        currentCircuitId = {this.props.match.params.id}
                                        settingStateAfterUndo = {this.settingStateAfterUndo}
                                        settingStateAfterReset = {this.settingStateAfterReset}
                        />
                    </div>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  {/* <Grid.Column width={3}>
                    <InputOptionsContainer gates={this.state.gates} />
                  </Grid.Column> */}
                  {/* <Grid.Column width={10}>
                    Waveforms are to be rendered here. may be with a waveform container
                  </Grid.Column> */}
                  {/* <Grid.Column width={3}>
                    <div id="errors-container">
                      <ErrorsContainer inputGates={this.state.inputGates} />
                    </div>
                  </Grid.Column> */}
                </Grid.Row>
              </Grid>
            </Segment>
           
          </header>
        </div>
        
      
      
    );
    }
    }
  

}


//yet to render (~~GatesContainer and )InputOptionsContainer once they are defined
//point to remember
//db.json accepts the keys to be strictly strings and does not accept comment lines
//logging technique used to display true or false
// if(gate.id == 4){
      //   console.log(gateLeft, gateRight, gateTop, gateBottom)
      //   console.log('Clause 1', wireRectLeft < gateRight)
      //   console.log('Clause 2', (wireRectRight > gateLeft))
      //   console.log('Clause 3', (wireRectTop < gateBottom))
      //   console.log('Clause 4', (wireRectBottom > gateTop))
