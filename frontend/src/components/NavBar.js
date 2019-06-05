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
import { Link, withRouter } from 'react-router-dom'
import MenuButton from './MenuButton'

export default withRouter(class NavBar extends React.Component{
    state={
        activeRooms: [],
        activeRoomsChecker: false
    }

    componentDidMount() {
        window.socket.emit("getActiveRooms", {}, response => {
            this.setState({activeRooms: Object.keys(response)})
            console.log(response)
        })
    }

    logout = () =>{
        localStorage.clear()
        this.props.history.push('/login')
    }

    loginButtonName = () => {
        let display = ""
        localStorage.token===null ? display="Login" : display="Logout"
        return display
    }

    toggleActiveRooms = () => {
        this.setState({activeRoomsChecker: !this.state.activeRoomsChecker})
    }

    render(){
        console.log(this.state.activeRooms)
        console.log(this.state.activeRoomsChecker)
        let path = window.location.href.split('/').pop()
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
                    
                        <button onClick={this.newCircuit} className="tiny ui inverted red basic button" type="submit">New Circuit</button>

                        <Link to="/circuits">
                        <button className="tiny ui inverted red basic button" type="submit">My Circuits</button>
                        </Link>

                                <div class="tiny ui inverted red basic floating dropdown labeled search icon button" onClick={this.toggleActiveRooms}>
                                    
                                    <span class="text">Circuits active Now</span>
                                    {
                                        this.state.activeRoomsChecker
                                        ?
                                            this.state.activeRooms.map (room => {
                                                return (
                                                    <div class="item" onClick={()=>this.props.history.push(`/circuits/${room}`)} >
                                                        <i style={{ visibility: path.includes(room) ? 'visible' : 'hidden' }} class="world icon"></i>{room}
                                                    </div>
                                                )
                                            })
                                        :
                                            null
                                    }
                                </div>
             
                        Welcome {localStorage.username===null ? null: localStorage.username}!
                           
                        <button className="tiny ui inverted red basic right floated button"  onClick={this.logout} type="submit">
                           {this.loginButtonName()}
                        </button>
                    
                
                    </Modal.Header>
                </div>
        
        
        )
    }

    newCircuit = e => {
       
        //fetch('http://10.185.0.55:80/my/circuits', {
            fetch('http://localhost:80/my/circuits', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({

            })
        })
        .then(res=> res.json())
        .then(circuit=> {
            this.props.history.push(`/circuits/${circuit.id}`)
        })
    }
})

