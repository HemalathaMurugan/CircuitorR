import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import CircuitShowPage from './CircuitShowPage';

export default class extends React.Component{
    

    handelClick = () => {
        return (
           
                <Router>
                    <Switch>
                        <Route exact path="/circuits/:id" component={CircuitShowPage}/>
                    </Switch>
                </Router>
           
        )
    }

    render(){
        console.log(this.props.circuit)
        return(
            <div>
            <div class="ui cards">
                    <div class="card">
                        <div class="content">
                        <div class="header">Circuit {`${this.props.circuit.id}`}</div>
                        <div class="description">
                            You have saved a circuit on this card
                        </div>
                        </div>
                        <div class="ui bottom attached button" onClick={()=>this.handelClick()}>
                        <i class="add icon" ></i>
                        Click Here to view 
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}