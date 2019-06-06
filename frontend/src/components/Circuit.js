import React from 'react'
import AndGate from './AndGate'
import OrGate from './OrGate'
import NotGate from './NotGate'
import ExorGate from './ExorGate'
import ExnorGate from './ExnorGate'
import NandGate from './NandGate'
import NorGate from './NorGate'
import Wire from './Wire'
import ReactDOM from 'react-dom'

const circuitRoot = document.getElementById("circuit");

export default class extends React.Component {
    constructor() {
        super();
        //creating a new div that wraps the component
        this.el = document.createElement("div");
    }

    componentDidMount() {
        circuitRoot.appendChild(this.el)
    }

    componentWillUnmount() {
        circuitRoot.removeChild(this.el)
    }

    
    
    renderAndGates = (gates) => {
        //My biggest mistake
        // gates.filter((gatesArray) =>  {
        //     gatesArray.filter(function(gate) {
        //         gate.type === 'and'
        //     })
        // })
        // .map((gate, index)=> 
        //     <AndGate  actualGate={gate} id={gate.id} location={gate.location}/>
        // )
        //setState was using spread operator. so it was stored as a nested array.
        //map or filter iterator could not iterate inside of that nested array despite giving index [0] on that nested array
        // console.log("Gates[0]:::", gates[0])
        // console.log("Gates:::", gates);
        if(gates === {} || gates === []){
            return null
        } else{
        return gates.filter((gate) => gate.type === "and")
            .map((gate, index) =>
                <AndGate     actualGate={gate}
                             id={gate.id} 
                             location={gate.location} 
                             inputWires={this.findInputWiresFor(gate)}
                             changeFixedInput={this.props.changeFixedInput}
                />
            )
        }
    }

    renderOrGates = (gates) => {
        if(gates === {} || gates === []){
            return null
        } else{
        return gates.filter((gate) => gate.type === "or")
            .map((gate, index) =>
                <OrGate key={index}
                        actualGate={gate}
                        id={gate.id} 
                        location={gate.location}
                        inputWires={this.findInputWiresFor(gate)}
                        changeFixedInput={this.props.changeFixedInput}
                />
            )
        }
    }

    renderNandGates = (gates) => {
        if(gates === {} || gates === []){
            return null
        } else{

        return gates.filter((gate) => gate.type === "nand")
            .map((gate, index) =>
                <NandGate   key={index}
                            actualGate={gate}
                            id={gate.id}
                            location={gate.location} 
                            inputWires={this.findInputWiresFor(gate)}
                            changeFixedInput={this.props.changeFixedInput}
                />
            )
        }
    }

    renderNotGates = (gates) => {
        if(gates === {} || gates === []){
            return null
        } else{
        return gates.filter((gate) => gate.type === "not")
            .map((gate, index) =>
                <NotGate actualGate={gate}
                         key = {index}
                         id={gate.id}
                         location={gate.location} 
                         inputWires={this.findInputWiresFor(gate)}
                         changeFixedInput={this.props.changeFixedInput}
                />
            )
        }
    }

    renderNorGates = (gates) => {
        if(gates === {} || gates === []){
            return null
        } else{
        return gates.filter((gate) => gate.type === "nor")
            .map((gate, index) =>
                <NorGate actualGate={gate}
                         id={gate.id} location={gate.location}
                         inputWires={this.findInputWiresFor(gate)}
                         changeFixedInput={this.props.changeFixedInput}
                />
            )
        }
    }


    renderExorGates = (gates) => {
        if(gates === {} || gates === []){
            return null
        } else{
        return gates.filter((gate) => gate.type === "exor")
            .map((gate, index) =>
                <ExorGate   actualGate={gate} 
                            id={gate.id}
                            location={gate.location} 
                            inputWires={this.findInputWiresFor(gate)}
                            changeFixedInput={this.props.changeFixedInput}
                />
            )
        }
    }

    

    renderExnorGates = (gates) => {
        if(gates === {} || gates === []){
            return null
        } else{
        return gates.filter((gate) => gate.type === "exnor")
            .map((gate, index) =>
                <ExnorGate  actualGate={gate}
                            id={gate.id}
                            location={gate.location}
                            inputWires={this.findInputWiresFor(gate)}
                            changeFixedInput={this.props.changeFixedInput}
                />
            )
        }
    }

    renderWires = (gates, wires) => {
        if(gates === {} || gates === [] && wires.length === 0){
            return null
        } else{

        return wires.map((wire, index) => {
            const inputGate = gates.find(gate => gate.id === wire.inputID)
            const outputGate = gates.find(gate => gate.id === wire.outputID)
            if (!outputGate) {
                return null
            } else {

            let x, y, width, height, bT, bR, bL, bB;

            //The following is actually the below one from the top of what you see
            //i.e, as the value of y increases, the location what do we see decreases

            // Output gate is above the input gate:

            //Note: slight adjustment is to be done to rectify the line positions depending on the 
            //input wires of the gate images. We can do that once we finalise the images of the gates
            if (inputGate.location.y > outputGate.location.y) {
                x = inputGate.location.x + 70;

                width = outputGate.location.x - inputGate.location.x - 70;
                height = inputGate.location.y - outputGate.location.y;
                y = inputGate.location.y + 26 - height;
                //other two cases we had 24 because( (50/2)-(2/2))->(gateheight/2 - wireheight/2)
                //this case 26 because (gateheight/2 + wireheight/2)->(50/2)+(2/2)
                bL = null;
                bB = "solid";
                bT = null;
                bR = "solid";
               
            }

            // InputGate is above the outputGate
            if (inputGate.location.y < outputGate.location.y) {
                x = inputGate.location.x + 70;
                y = inputGate.location.y + 24 ;
                width = outputGate.location.x - inputGate.location.x - 70;
                height = outputGate.location.y - inputGate.location.y;
                bL = null;
                bB = null;
                bT = "solid";
                bR = "solid";

            }

            //This happens only with a not gate
            if (inputGate.location.y === outputGate.location.y) {
                x = inputGate.location.x + 70;
                y = inputGate.location.y + 24; //since, half width of gate is 25px and wire's half width is 1px
                width = outputGate.location.x - inputGate.location.x - 70;
                height = 0;
                bT = null;
                bB = "solid";
                bL = "solid";
                bR = "solid";

            }
        

            return <Wire
                wire={wire}
                x={x}
                y={y}
                width={width}
                height={height}
                bT={bT}
                bR={bR}
                bL={bL}
                bB={bB}
            />
        }
        })
    
    
        }
    }

    findInputWiresFor(gate){
        return this.props.wires.filter( wire => wire.outputID === gate.id)
    }

   

    render() {

       console.log(this.props)
        return (
            <div id="circuit-created" style={{ position: 'absolute', width: '100%', height: '100%'}}>
                {this.renderExorGates(this.props.gates)}
                {this.renderExnorGates(this.props.gates)}
                {this.renderNorGates(this.props.gates)}
                {this.renderNandGates(this.props.gates)}
                {this.renderAndGates(this.props.gates)}
                {this.renderOrGates(this.props.gates)}
                {this.renderNotGates(this.props.gates)}
                {this.renderWires(this.props.gates, this.props.wires)}
            </div>
        )

       
    }
}


//This file is the circuit show page 