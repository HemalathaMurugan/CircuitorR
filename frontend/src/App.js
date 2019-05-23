import React, { Component } from 'react';
import { Button, GridColumn } from 'semantic-ui-react'
import './App.css';
import CircuitContainer from './containers/CircuitContainer';
import GatesContainer from './containers/GatesContainer';
import InputOptionsContainer from './containers/InputOptionsContainer'
import { Grid, Segment } from 'semantic-ui-react'
import ReactDOM from 'react-dom'



class App extends Component {

  state = {
    gates: [],
    wires: [],
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

  componentDidMount() {
    fetch('http://localhost:3000/gates')
      .then(res => res.json())
      .then((gatesData) => {
        console.log(gatesData)
        this.setState({
          gates: gatesData
        })
      })

    fetch('http://localhost:3000/wires')
      .then(res => res.json())
      .then((wiresData) => {
        console.log(wiresData)
        this.setState({
          wires:  wiresData
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
      let newId = this.state.gates.length + 1
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
      let circuit = document.getElementById("circuit-created")
      //some logs . Please bear with it some days. Until everything works fine 
      console.log('Before:', e.pageX - circuit.getBoundingClientRect().x, e.clientY - circuit.getBoundingClientRect().y - this.state.currentlyDraggingGate.offsetY )
      console.log(e.clientY)
      console.log(e.clientX) 
      console.log(circuit.getBoundingClientRect().y)
      console.log(this.state.currentlyDraggingGate.offsetY)

            let finalPositionY = e.clientY - circuit.getBoundingClientRect().y -(2* this.state.currentlyDraggingGate.offsetY) + 52

            let finalPositionX = e.clientX - circuit.getBoundingClientRect().x - (2* this.state.currentlyDraggingGate.offsetX)      
      console.log('After: ', finalPositionX, finalPositionY)

      let newFixedInput1 = null;
      let newFixedInput2 = null;
      const gate = {
        "id": this.state.currentlyDraggingGate.newId,
        "type": this.state.currentlyDraggingGate.gateType,
        "location": {
          "x": finalPositionX,
          "y": finalPositionY
        },
        "fixedInput1": newFixedInput1,
        "fixedInput2": newFixedInput2
      }
      this.setState({ gates: [ ...this.state.gates, gate ]})

      //I forgot the setState with the new gate initially. So it was showing up after reloading the page
      //reason being, update was happening on the backend only. So reload could render elements updates in db.json
      //setState would make the changes to appear in the frontend as well. Thats the advantage of setState. 
      //We can update the changes both on the server and on the frontend with the use of fetch-post request and seState simultaneously

      fetch('http://localhost:3000/gates',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(gate)
      })
  }

  handleWireDragStart = (e) => {
    let mouseX = e.clientX
    let mouseY = e.clientY
    let wireX = e.target.getBoundingClientRect().left
    let wireY = e.target.getBoundingClientRect().top

    //On the first drag end, that should be the input gate (inputID)
    //On the second drag end, that should be the output gate (outputID)
    //My understanding of Josh's suggestion -> 
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
    let mouseX = e.clientX
    let mouseY = e.clientY 
    let wireRectLeft = mouseX - 70 - circuit.getBoundingClientRect().x - (2*this.state.currentlyDraggingWire.offsetX)
    let wireRectRight = wireRectLeft + 70
    let wireRectTop = mouseY - 50 - circuit.getBoundingClientRect().y  + this.state.currentlyDraggingWire.offsetY
    let wireRectBottom = wireRectTop + 50
    //console.log('Left:',wireRectLeft, 'Right:',wireRectRight, 'Top:',wireRectTop, 'Bottom:',wireRectBottom)
    this.state.gates.forEach(gate => {
      let gateLeft = gate.location.x
      let gateRight = gate.location.x + 70
      let gateTop = gate.location.y
      let gateBottom = gate.location.y + 50
      if ((wireRectLeft < gateRight) && (wireRectRight > gateLeft) && 
          (wireRectTop < gateBottom) && (wireRectBottom > gateTop)) {
        
          console.log('condition true')
       
          console.log('mouse Positions x and y: ', e.clientX, e.clientY)
          if(this.state.currentlyDraggingWire.inputID === null){

                this.setState({
                  currentlyDraggingWire: {
                    offsetX: this.state.currentlyDraggingWire.offsetX,
                    offsetY: this.state.currentlyDraggingWire.offsetY,
                    inputID: gate.id,
                    outputID: null
                  }
                })          
               
          } else {
                    
                    this.setState({
                      currentlyDraggingWire: {
                        offsetX: this.state.currentlyDraggingWire.offsetX,
                        offsetY: this.state.currentlyDraggingWire.offsetY,
                        inputID: this.state.currentlyDraggingWire.inputID,
                        outputID: gate.id
                      }
                    })

                    
                  }
       }
    })

  }

  handleWireDragEnd = (e) => {
    console.log('got here- wire drag ENDS')
    const newWire = {
      inputID: this.state.currentlyDraggingWire.inputID,
      outputID: this.state.currentlyDraggingWire.outputID
    }

    this.setState({
      wires: [...this.state.wires, newWire]
    })

    fetch('http://localhost:3000/wires', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newWire)
    })
  }
    

      //Josh said the mouse pointer is going to be the output gate until a real gate is clicked 

      

       
      //console.log(this.state.currentlyDraggingWire)

      //once this state is set properly add event listener to each of the existing gate or in this gate(within this loop) , so as to detect the onclick -> onclicking this, would again confirm that this is the input gate 
      //check within the onclick event listener whether this is an inputID ;If not, set this as the output id

      //gate.onClick(console.log('got here - gate onclick'))
    
  //Ideas for drawing wires: on drag of pointer -> create a rectangular div like the ones we did for wire 
  // and rightside edge and top/bottom(depending on the position of gates and pointers)could be moved 
  //like a dragging with right side edge increasing, can be shown as the pointer is dragged



  DUMMY_handleWireDragEnd =(e) => {

    let circuit = document.getElementById("circuit-created")
    let mouseX = e.clientX
    let mouseY = e.clientY 
    //Remember ->all gates have 50x70 dimension. Wire's dimension is 50x50
    let wireRectLeft = mouseX - 50 - circuit.getBoundingClientRect().x - (2*this.state.currentlyDraggingWire.offsetX)
    let wireRectRight = wireRectLeft + 50
    let wireRectTop = mouseY - 50 - circuit.getBoundingClientRect().y  + this.state.currentlyDraggingWire.offsetY
    let wireRectBottom = wireRectTop + 50
    console.log('Left:',wireRectLeft, 'Right:',wireRectRight, 'Top:',wireRectTop, 'Bottom:',wireRectBottom)
    this.state.gates.forEach(gate => {
      let gateLeft = gate.location.x
      let gateRight = gate.location.x + 70
      let gateTop = gate.location.y
      let gateBottom = gate.location.y + 50

      //point of start wire---------
      let wireCenterX = wireRectLeft + 25
      let wireCenterY = wireRectRight + 25
      let gateRightSideCenterX = gateRight 
      let gateRightSideCenterY = gateTop + 25
      //-----------------------NOT IN USE FOR NOW

      if((wireCenterX== gateRightSideCenterX) && (wireCenterY==gateRightSideCenterY)){
        if(this.state.currentlyDraggingWire.inputID === null){
        
        this.setState({
          currentlyDraggingWire: {
            offsetX: this.state.currentlyDraggingWire.offsetX,
            offsetY: this.state.currentlyDraggingWire.offsetY,
            inputID: gate.id,
            outputID: null
          }
        })
        } else {
          this.setState({
            currentlyDraggingWire: {
              offsetX: this.state.currentlyDraggingWire.offsetX,
              offsetY: this.state.currentlyDraggingWire.offsetY,
              inputID: this.state.currentlyDraggingWire.inputID,
              outputID: gate.id
            }
          })
          console.log('got here- FRONTEND WIRE IS DRAWN')
        }
      }

      

    })
  }

  render() {
    
    return (
      <div>
        <div className="App">

          <header className="App-header">
            <Segment>
              <Grid celled>
                <Grid.Row>
                  {/* {()=>this.newTechnique()} */}
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
                      <CircuitContainer gates={this.state.gates} wires={this.state.wires}/>
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
           
          </header>
        </div>
      </div>
    );
  }

}

export default App;

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
      // }