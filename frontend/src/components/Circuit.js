import React from 'react'
import AndGate from './AndGate'
import OrGate from './OrGate'
import NotGate from './NotGate'
import Wire from './Wire'

export default class extends React.Component {
    
    render(){
        
        return(
            <div>
                <AndGate ands = {this.props.AndGates} />
                <OrGate ors={this.props.OrGates} />
                <NotGate nots={this.props.NotGates} />
                <Wire wires = {this.props.wires} />
            </div>
        )
    }
}