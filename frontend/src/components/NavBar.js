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
import { Link } from 'react-router-dom'
import MenuButton from './MenuButton'

export default class NavBar extends React.Component{
    logout = () =>{
        localStorage.clear()
    }
    render(){
        return(
            <div>
                    <Modal.Header
                        style={{
                            backgroundColor: "#1d1d1d",
                            color: "white"
                        }}
                    >
                    <div className="logo">
                             <img />       
                    </div>
                    {/* <div>
                        <MenuButton/>
                    </div> */}
                    <div>
                    <Link to="/newcircuit">
                            <button className="tiny ui inverted red basic button" type="submit">New Circuit</button>
                    </Link>
                    </div>

                    <div>
                        <Link to="/">
                        <button className="tiny ui inverted red basic button" type="submit">Home</button>
                        </Link>
                    </div>

                    <div>
                        Logged in as //modify this to show the current username
                    </div>

                    <div>
                        <Link to="/"> 
                        <button className="tiny ui inverted red basic button" onClick={this.logout} type="submit">Logout</button>
                        //yet to modify this to forget the token
                        </Link>
                    </div>
                
                    </Modal.Header>
                </div>
        
        
        )
    }
}