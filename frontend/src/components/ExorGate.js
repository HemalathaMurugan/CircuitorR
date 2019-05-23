import React from 'react'

export default class ExorGate extends React.Component {
    
    render(){
        return(
            <div>
                <img    id="existing-exor"
                        src={require('../assets/exor.png')} alt="HTML5"
                        style={{width: "70px",position:"absolute", height:"50px", top: this.props.location.y, left: this.props.location.x}}
                 />
            </div>
        )
    }
}