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
    currentlyDragging: {
      x: 0,
      y: 0,
      offsetX: 0,
      offsetY: 0,
      gateType: null
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
        currentlyDragging: {
          id: newId,
          x: e.target.x,
          y: e.target.y,
          offsetX: i_offsetX,
          offsetY: i_offsetY,
          gateType: e.target.id
        }
      })
    
    }

  

    handleDragEnd = (e) => {
      
      
      let circuit = document.getElementById("circuit-created")

      //some logs . Please bear with it some days. Until everything works fine 

      console.log('Before:', e.pageX - circuit.getBoundingClientRect().x, e.clientY - circuit.getBoundingClientRect().y - this.state.currentlyDragging.offsetY )
      console.log(e.clientY)
      console.log(e.clientX) 
      console.log(circuit.getBoundingClientRect().y)
      console.log(this.state.currentlyDragging.offsetY)

            let finalPositionY = e.clientY - circuit.getBoundingClientRect().y -(2* this.state.currentlyDragging.offsetY) + 52

            let finalPositionX = e.clientX - circuit.getBoundingClientRect().x - (2* this.state.currentlyDragging.offsetX)
            
      console.log('After: ', finalPositionX, finalPositionY)

      let newFixedInput1 = null;
      let newFixedInput2 = null;

      const gate = {
        "id": this.state.currentlyDragging.newId,
        "type": this.state.currentlyDragging.gateType,
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