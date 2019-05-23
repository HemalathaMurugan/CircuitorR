import React from 'react'



export default class extends React.Component {
    render(){
        const { x, y, width, height, bT, bR, bL, bB } = this.props
        //passing borders as props so as to display the borders depending upon the positions of input and output gate
        return(
            <div
                id="existing-wire"
                style={{
                position:'absolute',
                borderColorTop: "black",
                borderColorRight: "black",
                borderTop: bT,
                borderTopWidth: "2px",
                borderRight: bR,
                borderRightWidth: "2px",
                borderLeft: bL,
                borderLeftWidth: "2px",
                borderBottom: bB,
                borderBottomWidth: "2px",
                left: x,
                top: y,
                width: width,
                height: height
                // backgroundColor: color,
                //height: 0
                
                }}
                //all the above code is just to display the wire.
                //we have set the wire's functionality already. In the functions - getSignal() 
                //and in the function -performanceCalculation() 
                //In circuit.js also renderwires is just for the displaying part.The inputID and outputId 
                //of the wire tells what signal it is gonna transmit. 
            />
        )
    }
}