import React from 'react'

export default class Exnorgate extends React.Component {
    
    render(){
        let numberOfInputs = 2
        let numberOfUserInputs = numberOfInputs - this.props.inputWires.length;
        let selectBoxes = []
        for(let i = 1; i <= numberOfUserInputs; i++){
            let key = `fixedInput${i}`
            selectBoxes.push(
                <select value={this.props.actualGate[key]} style={{ zIndex: 1000}} onChange={ e => this.props.changeFixedInput(this.props.id, i, e.target.value)}>
                    <option>0</option>
                    <option>1</option>
                </select>
            )
        }
        return(
            <div style={{position: "absolute",  top: this.props.location.y, left: this.props.location.x}}>
                <img    id="existing-exnor"
                        src={require('../assets/xnor.png')} alt="HTML5"
                        style={{width: "70px", height:"50px"}}
                 />
                 {selectBoxes}
            </div>
        )
    }
}