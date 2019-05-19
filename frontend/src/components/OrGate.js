import React from 'react'

export default class OrGAte extends React.Component {
    render(){
        console.log(this.props)
        console.log(this.props.actualGate.location.top)
        console.log(this.props.actualGate.location.left)     
                
        return(
            <div>
                <img src={require('../assets/or-gate-md.png')} alt="HTML5"
                 style={{width: "70px", height:"50px",position:"absolute", top: this.props.location.y, left: this.props.location.x}}
                 />
            </div>
        )
    }
}