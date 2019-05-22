import React from 'react'

export default class NotGate extends React.Component {
    
    render(){
        return(
            <div>
                <img src={require('../assets/not2.png')} alt="HTML5"
                 style={{width: "70px",position:"absolute", height:"50px", top: this.props.location.y, left: this.props.location.x}}
                 />
            </div>
        )
    }
}