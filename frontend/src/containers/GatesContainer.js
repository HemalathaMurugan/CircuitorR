import React, {Component} from 'react';
// import AndGate from '../components/AndGate'
// import OrGate from '../components/OrGate'
// import NotGate from '../components/NotGate'
// import Wire from '../components/Wire'

export default class GatesContainer extends Component{
    render(){
        return(
            <div id="gates-container">Users can choose from these options
                <img    id="or"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/or-gate-md.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                />
                <br></br>

                <img    id="and"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/and2.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                />
                <br></br>

                <img    id="not"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/not2.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                />
                <br></br>

                <img    id="exor"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/exor1.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                />
                <br></br>

                <img    id="exnor"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/xnor.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                />
                <br></br>

                <img    id="nand"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/nand2.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                />
                <br></br>

                <img    id="nor"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/nor.png')} 
                        onDragStart={(e)=>this.props.handleDragStart(e)}
                        onDragEnd={(e)=> this.props.handleDragEnd(e)}
                />
                <br></br>

                <img    id="wire"
                        draggable = "true" 
                        style={{height:"50px", width:"70px", padding: "0px"}}
                        src={require('../assets/or-gate-md.png')} 
                        onDragStart={null}
                        onDragEnd={null}
                />
                <br></br>

            </div>
        )
    }
}