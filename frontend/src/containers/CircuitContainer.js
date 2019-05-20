import React,{Component} from 'react'
import Circuit from '../components/Circuit'

export default class CircuitContainer extends Component {

    // AndGates = () => {
    //     return this.props.AndGates.map((gate, index)=> gate)
    // }

    // OrGates = () => {
    //     return this.props.OrGates.map((gate, index)=> gate)
    // }

    // NotGates = () => {
    //     return this.props.NotGates.map((gate, index)=> gate)
    // }

    // wires = () => {
    //     return this.props.wires.map((wire, index)=> wire)
    // }
    render(){
        console.log(this.props)
        return(
            <div className="whats going on">
                <Circuit gates={this.props.gates} wires={this.props.wires}
                />
            </div>
        )
    }
}
