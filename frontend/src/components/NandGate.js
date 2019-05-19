import React from 'react'

export default class NandGate extends React.Component {
    
    render(){
        console.log(this.props)
        return(
            <div>
                <img src={require('../assets/nand2.png')} alt="HTML5"
                 style={{width: "70px",position:"absolute", height:"50px", top: this.props.location.y, left: this.props.location.x}}
                 />
            </div>
        )
    }
}