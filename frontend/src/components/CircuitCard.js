import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import CircuitShowPage from './CircuitShowPage';
import IndividualCircuit from './IndividualCircuit'
import { withRouter } from 'react-router-dom'

class CircuitCard extends React.Component{
    state = {
        currentCircuit: this.props.circuit,
        clicked: false
    }

    handleClick = () => {
        // this.setState({
        //     currentCircuit: {...this.state.currentCircuit, clicked: true}
        // })
        console.log('we are here')
        //return <Route path={`/circuits/${this.props.circuit.id}`} render={() => <IndividualCircuit circuit={this.props.circuit} />} />
        this.props.history.push({
            pathname: `/circuits/${this.props.circuit.id}`,
            state: { currentCircuit: this.props.circuit }
          })
    }
   

    render(){
        console.log(this.props.circuit)
        return(
            <div>
            <div class="ui cards">
                    <div class="card">
                        <div class="content">
                        <div class="header">Circuit {`${this.props.circuit.id}`}</div>
                        <div class="description">
                            You have saved a circuit on this card
                        </div>
                        </div>
                        <div class="ui bottom attached button" onClick={()=>this.handleClick()} >
                        <i class="add icon" ></i>
                        Click Here to view 
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default withRouter(CircuitCard)