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

    loginButtonName = () => {
        let display = ""
        localStorage.token===null ? display="Login" : display="Logout"
        return display
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
                        <Link to="/">
                        <button className="tiny ui inverted red basic button" type="submit">Home</button>
                        </Link>
                    
                        <Link to="/newcircuit">
                                <button className="tiny ui inverted red basic button" type="submit">New Circuit</button>
                        </Link> 
                    
                   
                        <Link to="/"> 
                        <button className="tiny ui inverted red basic button" onClick={this.logout} type="submit">
                           {this.loginButtonName()}
                        </button>
                        
                        </Link>
                       
                        Welcome {localStorage.username===null ? null: localStorage.username}!
                    
                
                    </Modal.Header>
                </div>
        
        
        )
    }
}