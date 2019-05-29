//The circuits belonging to one particular user are to be rendered with this component 
//This is like 'My circuits" page of the user 

import React from 'react';
import { stringify } from 'querystring';

export default class UserCircuitsContainer extends React.Component{
    state = {
        userCircuits: [],
        currentCircuitGates: [],
        currentCircuitWires: []
    }

   
    componentDidMount(){
            fetch('http://localhost:80/my/circuits',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then( res=> res.json())
            .then (circuits => {
                this.setState({
                    userCircuits: circuits
                })
            })
    }
    

    render(){
       
        console.log(this.state.userCircuits)
        if(localStorage.getItem('token') === null){
            return(
                <div>
                    Please Login
                </div>
            )
        } else {
        return(
            <div>
                A particular user whi has logged in when clicks and land here on this page
                They should be able to circuit cards of all their own circuits
                //to write a method to get all the circuits that belong this particular user who is logged in}

            </div>
        )
        }
    }
}