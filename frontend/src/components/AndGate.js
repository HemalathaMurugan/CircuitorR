import React from 'react'


export default class AndGate extends React.Component {
    
    // render(){
    //     console.log(this.props)
    //     // location = {x: 5, y: 300}
    //     return(
    //         <div style={{left: this.props.location.x, top: this.props.location.y, position: "absolute"}}>
    //             And Gate
    //         </div>
    //     )
    // }

    render(){
        console.log(this.props.location)
        return(
            <div>
                <img src={require('../assets/and2.png')} alt="HTML5"
                 style={{position: "absolute", width: "70px", height:"50px", top: this.props.location.y, left: this.props.location.x}}
                 />
            </div>
        )
    }
}