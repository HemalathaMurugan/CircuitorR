import React from 'react'

export default class ErrorsContainer extends React.Component {
    
    renderOutput = () => {
        if(this.props.output[0]===1){
        return (
        <div>
            <p> Output: {this.props.output} </p>
            <img  style={{height:"50px", width:"70px", padding: "0px"}}
                  src={require('../assets/glowing.jpeg')}
            />
        </div>
        )
        } else if(this.props.output[0]===0){
            return (
                <div>
                    <p> Output: {this.props.output} </p>
                    <img  style={{height:"50px", width:"70px", padding: "0px"}}
                          src={require('../assets/dim.jpeg')}
                    />
                </div>
                )
        }
    }

    renderErrors = () => {
        return (
            <div>
                Errors
            </div>
        )
    }

    render(){
        console.log(this.props)
        return(
            <div>
                {!this.props.output ? this.renderErrors() : this.renderOutput()}
            </div>
        )
    }
}