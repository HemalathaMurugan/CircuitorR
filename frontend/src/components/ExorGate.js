import React from 'react'

export default class ExorGate extends React.Component {
    
    render(){
        return(
            <div>
                <img    id="existing-and"
                        src={require('../assets/exor1.png')} alt="HTML5"
                        style={{position: "absolute", width: "70px", height:"50px", top: this.props.location.y, left: this.props.location.x}}
                    
                 />
            </div>
        )
    }
}