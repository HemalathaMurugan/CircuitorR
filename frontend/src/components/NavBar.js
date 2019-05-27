import React from 'react'
import {
    Button,
    Form,
    Message,
    Container,
    Header,
    Icon,
    Select,
    Modal
  } from "semantic-ui-react";
export default class NavBar extends React.Component{
    render(){
        return(
            <div>
                <Modal.Header
                    style={{
                        backgroundColor: "#1d1d1d",
                        color: "white"
                    }}
                >

                NavBar: -----------------------------------
                </Modal.Header>
            </div>
        )
    }
}