import React,{Component} from 'react'
import Circuit from '../components/Circuit'

export default class CircuitContainer extends Component {

    AndGates = () => {
        return this.props.AndGates.map((gate, index)=> gate)
    }

    OrGates = () => {
        return this.props.OrGates.map((gate, index)=> gate)
    }

    NotGates = () => {
        return this.props.NotGates.map((gate, index)=> gate)
    }

    wires = () => {
        return this.props.wires.map((wire, index)=> wire)
    }
    render(){
        return(
            <div>
                <Circuit AndGates={this.AndGates}
                         OrGates = {this.OrGates}
                         NotGates = {this.OrGates}
                         wires = {this.props.wires}
                />
            </div>
        )
    }
}
