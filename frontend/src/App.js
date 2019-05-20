import React, { Component } from 'react';
import { Button, GridColumn } from 'semantic-ui-react'
import './App.css';
import CircuitContainer from './containers/CircuitContainer';
import GatesContainer from './containers/GatesContainer';
import InputOptionsContainer from './containers/InputOptionsContainer'
import { Grid, Segment } from 'semantic-ui-react'
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

class App extends Component {

  state = {
    gates: [],
    wires: []
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

  render() {
    console.log('State:', this.state.gates)
    console.log('Wires:', this.state.wires)
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

//yet to render GatesContainer and InputOptionsContainer once they are defined
