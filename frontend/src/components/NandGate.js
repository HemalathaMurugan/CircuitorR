import React from 'react'

export default class NandGate extends React.Component {
    
    render(){
        return(
            <div>
                <img    id="existing-nand"
                        src={require('../assets/nand.png')} alt="HTML5"
                        style={{width: "70px",position:"absolute", height:"50px", top: this.props.location.y, left: this.props.location.x}}
                 />
            </div>
        )
    }
}