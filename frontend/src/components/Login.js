import React from 'react'
import { Link } from 'react-router-dom'
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

export default class Login extends React.Component{
    state = {
        username: '',
        password: '',
        email: ''
    }

    handleLoginSubmit = (e) =>{
        console.log(e.target)
        console.log(this.props)
        e.preventDefault()
       let username =  e.target.username.value
       let password = e.target.password.value
       let email = e.target.email.value
       
       fetch('http://localhost:80/login',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email
            })
       })
       .then(res=> res.json())
       //the following function was checkAuth in previous project
       .then(user => {
           console.log(user)
          localStorage.setItem('token', user.token) 
          localStorage.setItem('username', username)
          localStorage.setItem('email', email)
          localStorage.setItem('userId', user.id)
          console.log(localStorage)
        //   localStorage.setItem('token', user.token)
          //this.props.history.push('/')
          this.props.saveToken(user.token)
        })
      }
    
      handleChange = (e) => {
        this.setState({
          [e.target.username]: e.target.value
        })
      }

    render(){
          if(localStorage.getItem('token') !== null){
            return(
                <div>
                    You are logged in
                </div>
            )
        } else {
       
        return(
            <div className="login-form-container">
            <Modal.Header
                    style={{
                        backgroundColor: "#1d1d1d",
                        color: "white"
                    }}
                >
            <h1>Login</h1>
            <Form onSubmit={this.handleLoginSubmit}>
              <div class="login-form">
                <label for="username"><b>Username</b></label><br/>
                <Form.Input onChange={this.handleChange} type="text" placeholder="Enter Username" name="username" required/>
                <br/>
                <br/>
                <label for="password"><b>Password</b></label><br/>
                <Form.Input onChange={this.handleChange} type="password" placeholder="Enter Password" name="password" required/>
                <br/>
                <br/>
                <label for="email"><b>E-mail</b></label><br/>
                <Form.Input onChange={this.handleChange} type="email" placeholder="Enter E-mail" name="email" required/>
                <br/>
                <br/>
                <button button className="tiny ui inverted red basic button" type="submit" onSubmit={()=>this.handleLoginSubmit()}>Login</button>
                <br/>
                <h4>No Account Yet?</h4>
                <Link to="/newaccount">
                
                <button button className="tiny ui inverted red basic button" type="submit" >Create New Account</button>
                </Link>
              </div>
            </Form>
            </Modal.Header>
          </div>
        );
        

    }
  }

   
}
