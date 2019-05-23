import React from 'react'

export default class Exnorgate extends React.Component {
    
    render(){
        return(
            <div>
                <img    id="existing-exnor"
                        src={require('../assets/xnor.png')} alt="HTML5"
                        style={{width: "70px",position:"absolute", height:"50px", top: this.props.location.y, left: this.props.location.x}}
                 />
            </div>
        )
    }
}