import React, {Component} from 'react';
// import AndGate from '../components/AndGate'
// import OrGate from '../components/OrGate'
// import NotGate from '../components/NotGate'
// import Wire from '../components/Wire'

export default class GatesContainer extends Component{
    render(){
        return(
            <div id="gates-container">
                <h5>Pick up a Gate and drop --> THERE</h5>
                <img    id="or"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/or-gate-md.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                
                />
                <br></br>
                OR
                <br></br>
               
                
                
                <img    id="and"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/and2.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                />
                <br></br>
                 AND
                <br></br>
               
                
                <img    id="not"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/not2.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                />
                <br></br>
                NOT
                
                <br></br>
               
                
                <img    id="exor"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/exor1.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                />
                <br></br>
                EXOR
                <br></br>
                
                
                <img    id="exnor"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/xnor.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                />
                <br></br>
                EXNOR
                <br></br>
                
                
                <img    id="nand"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/nand.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                />
                <br></br>
                NAND
                <br></br>
                
                
                <img    id="nor"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/newNor.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                />
                <br></br>
                 NOR
                <br></br>
               
                <br></br>
                
                <img    id="wire-pointer"
                        draggable = "true" 
                        style={{height:"50px", width:"50px", padding: "0px"}}
                        src={require('../assets/pointer.png')} 
                        onDragStart={(e)=>this.props.handleWireDragStart(e)}
                        onDrag = {(e) => this.props.handleWireDragging(e)}
                        onDragEnd={(e)=>this.props.handleWireDragEnd(e)}
                />
                <br></br>
                WIRE
                <br></br>
                
                <h5>Use this wire to connect them</h5>
            </div>
        )
    }
}