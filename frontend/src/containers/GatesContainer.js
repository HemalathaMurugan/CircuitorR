import React, {Component} from 'react';
// import AndGate from '../components/AndGate'
// import OrGate from '../components/OrGate'
// import NotGate from '../components/NotGate'
// import Wire from '../components/Wire'

export default class GatesContainer extends Component{
    render(){
        return(
            <div>Users can choose from these options
                <img style={{height:"50px", width:"70px"}} src={require('../assets/or-gate-md.png')} />
                <br></br>
                <img style={{height:"50px", width:"70px"}} src={require('../assets/and2.png')} />
                <br></br>
                <img style={{height:"50px", width:"70px"}} src={require('../assets/not2.png')} />
                <br></br>
                <img style={{height:"50px", width:"70px"}} src={require('../assets/nand2.png')} />
                <br></br>
                <img style={{height:"50px", width:"70px"}} src={require('../assets/exor.png')} />
                <br></br>
                <img style={{height:"50px", width:"70px"}} src={require('../assets/exnor.jpeg')} />
                <br></br>
                <img style={{height:"50px", width:"70px"}} src={require('../assets/and2.png')} />
                <br></br>
            </div>
        )
    }
}