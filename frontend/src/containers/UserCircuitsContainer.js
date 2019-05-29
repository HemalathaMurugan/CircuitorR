//The circuits belonging to one particular user are to be rendered with this component 
//This is like 'My circuits" page of the user 

import React from 'react';
import { stringify } from 'querystring';
import CircuitCard from '../components/CircuitCard';

export default class UserCircuitsContainer extends React.Component{
    state = {
        userCircuits: [],
        clickedCircuit: {},
        currentCircuitGates: [],
        currentCircuitWires: []
    }

   
    componentDidMount(){
        
            //get
            fetch(`http://localhost:80/my/circuits`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> res.json())
            .then(circuits=> {

                this.setState({
                    userCircuits: circuits
                })
            })

            //get
            fetch(`http://localhost:80/my/circuits/:id/gates`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> res.json())
            .then(gates => {

                this.setState({
                    currentCircuitGates: gates
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
                <h3>CircuitorR History of   {`${localStorage.username}`}</h3>
                {this.state.userCircuits.map( circuit => {
                    return (<CircuitCard circuit={circuit}/>)
                })}
               
            </div>
        )
        }
    }
}

// A particular user who has logged in when clicks and land here on this page
// They should be able to circuit cards of all their own circuits
// //to write a method to get all the circuits that belong this particular user who is logged in}
