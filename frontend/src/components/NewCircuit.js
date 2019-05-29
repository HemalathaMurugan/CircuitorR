//when a previously saved or built circuit is clicked by the user the individual circuit should be rendered .
//which is to be rendered with this component

import React from 'react';

export default class IndividualCircuit extends React.Component{
    render(){
        if(localStorage.getItem('token') === null){
            return(
                <div>
                    Please Login
                </div>
            )
        } else {
        return(
            <div>
                NewCircuit Page
            </div>
        )
        }
    }
}