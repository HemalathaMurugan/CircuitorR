import React from 'react'
import AndGate from './AndGate'
import OrGate from './OrGate'
import NotGate from './NotGate'
import Wire from './Wire'
import ReactDOM from 'react-dom'

const circuitRoot = document.getElementById("circuit");

export default class extends React.Component {
    constructor(){
        super();
        //creating a new div that wraps the component
        this.el = document.createElement("div");
    }

    componentDidMount(){
        circuitRoot.appendChild(this.el)
    }

    componentWillUnmount(){
        circuitRoot.removeChild(this.el)
    }

    // state = {
    //     gates: [
    //     {
    //         id: 0,
    //         type: "And",
    //         location: "whatever"
    //     },
    //     {
    //         id: 1,
    //         type: "And",
    //         location: "whatever"
    //     },
    //     {
    //         id: 2,
    //         type: "or",
    //         location: "whatever"
    //     }
    //     ],
    //     wires: []
    // }
    
    // render(){
        
    //     return(
    //         <div>
    //             {this.props.gates.filter((gate)=>gate.type==="and")
    //             .map((gate, index)=> {
    //                 <AndGate  id={gate.id} location={gate.location}/>

    //             })}
    //             {/* <AndGate ands = {this.props.AndGates} />
    //             <OrGate ors={this.props.OrGates} />
    //             <NotGate nots={this.props.NotGates} />
    //             <Wire wires = {this.props.wires} /> */}
    //         </div>
    //     )
    // }
    renderAndGates = () => {
        return this.props.gates.filter((gate)=>gate.type==="and")
        .map((gate, index)=> 
            <AndGate  actualGate={gate} id={gate.id} location={gate.location}/>

        )
    }

    renderOrGates = () => {
        return this.props.gates.filter((gate)=>gate.type==="or")
        .map((gate, index)=> 
            <OrGate  actualGate={gate} id={gate.id} location={gate.location}/>

        )
    }

    renderNotGates = () => {
        return this.props.gates.filter((gate)=>gate.type==="not")
        .map((gate, index)=> 
            <NotGate  actualGate={gate} id={gate.id} location={gate.location}/>

        )
    }

    renderWires = () => {
       
        return this.props.wires.map((wire, index)=> {
            const inputGate = this.props.gates.find( gate => gate.id == wire.inputID)
            const outputGate = this.props.gates.find( gate => gate.id == wire.outputID)
            if (!outputGate) return null

            let x, y, width, height, bT, bR, bL, bB;

            //The following is actually the below one from the top of what you see
            //i.e, as the value of y incereases, the location what do we see decreases
           
             // Output gate is above the input gate:

            //Note: slight adjustment is to be done to rectify the line positions depending on the 
            //input wires of the gate images. We can do that once we finalise the images of the gates
            if(inputGate.location.y > outputGate.location.y){
                x = inputGate.location.x + 70;
               
                width = outputGate.location.x - inputGate.location.x - 70;
                height = inputGate.location.y - outputGate.location.y;
                y = inputGate.location.y + 26 - height; 
                //other two cases we had 24 because( (50/2)-(2/2))->(gateheight/2 - wireheight/2)
                //this case 26 because (gateheight/2 + wireheight/2)->(50/2)-(2/2)
                bL = null;
                bB = "solid";
                bT = null;
                bR = "solid";
                // bL = "solid";
                // bB = "solid";
                // bT = "solid";
                // bR = "solid";
            }

             // InputGate is above the outputGate
             if(inputGate.location.y < outputGate.location.y){
                x = inputGate.location.x + 70;
                y = inputGate.location.y + 24;
                width = outputGate.location.x - inputGate.location.x - 70;
                height = outputGate.location.y - inputGate.location.y ;
                bL = null;
                bB = null;
                bT = "solid";
                bR = "solid";
            }

            if(inputGate.location.y === outputGate.location.y){
                x = inputGate.location.x + 70;
                y = inputGate.location.y + 24; //since, half width of gate is 25px and wire's half width is 1px
                width = outputGate.location.x - inputGate.location.x - 70;
                height = 0;
                bT= null;
                bB= "solid";
                bL= "solid";
                bR = "solid";
            }

            
            return <Wire 
                wire={wire} 
                x={x}
                y={y}
                width={width}
                height={height}
                bT = {bT}
                bR = {bR}
                bL = {bL}
                bB = {bB}
            />
        } )
    }


    render(){
        console.log(this.props)
        //this.el = document.createElement("div");
        // const {children} = this.props;
        // return ReactDOM.createCircuit(children, this.el)

        return(
            <div>The circuit created by the user by drag and drop
                {()=>this.renderAndGates()}
                {()=>this.renderOrGates()}
                {()=>this.renderNotGates()}
                {()=>this.renderWires()}
            </div>
        )
        
        // return(
        //     <div>
               
        //         {/* {this.renderAndGates()} */}
        //         <OrGate ors={this.props.OrGates} />
        //         <NotGate nots={this.props.NotGates} />
        //         <Wire wires = {this.props.wires} />
        //     </div>
        // )
    }
}
