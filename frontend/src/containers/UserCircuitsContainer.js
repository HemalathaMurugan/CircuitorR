

import React from 'react';
import { stringify } from 'querystring';
import CircuitCard from '../components/CircuitCard';
import IndividualCircuit from '../components/IndividualCircuit';

export default class UserCircuitsContainer extends React.Component{
    state = {
        userCircuits: [],
        XclickedCircuit: {},
        
    }

    componentDidMount(){
        
            //get
             fetch(`http://localhost:80/my/circuits`,{
                //fetch(`http://10.185.0.55:80/my/circuits`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=> res.json())
            .then(circuits=> {

                this.setState({
                    userCircuits: circuits
                })
            })

        
    }

    //if delete was clicked, state of that circuitcard would be -> deleteClicked: true
    handleDeleteClickedCard = (passed_id) => {
        console.log('got here - delete click handle ')
       this.setState({ XclickedCircuit: this.state.userCircuits.find( circuit => circuit.id === passed_id)})//not used at all.
       let updatedUserCircuits = this.state.userCircuits.filter( circuit => circuit.id!==passed_id)
       this.setState({
           userCircuits: updatedUserCircuits
       })
        fetch(`http://localhost:80/my/circuits/${passed_id}`,{
            method: 'DELETE' ,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }   
        }).then(res => res.json())
        .then(json => {
            return json;
        })
        console.log(this.state.userCircuits)
    }

    render(){
       
        console.log(this.state.userCircuits)
        //console.log(this.state.currentgates)
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
                    return (<CircuitCard circuit={circuit} handleDeleteClickedCard={(id)=>this.handleDeleteClickedCard(id)}/>)
                })}
            </div>
        )
        }
    }
}
