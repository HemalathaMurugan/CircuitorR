import React from 'react'

export default class extends React.Component{
    render(){
        return(
            <div>
            <div class="ui cards">
                    <div class="card">
                        <div class="content">
                        <div class="header">Circuit {`${this.props.circuit.id}`}</div>
                        <div class="description">
                            {localStorage.username}'s Circuit Number {`${this.props.circuit.id}`} is here!
                        </div>
                        </div>
                        <div class="ui bottom attached button">
                        <i class="add icon" onClick={()=>{console.log('yet to reach circuit show page')}}></i>
                        Click Here to view 
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}