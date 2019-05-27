import React from 'react'
import { Link } from 'react-router-dom'

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
          localStorage.setItem('token', user.token)
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
       
        return(
            <div className="login-form-container">
            <h1>Login</h1>
            <form onSubmit={this.handleLoginSubmit}>
              <div class="login-form">
                <label for="username"><b>Username</b></label><br/>
                <input onChange={this.handleChange} type="text" placeholder="Enter Username" name="username" required/>
                <br/>
                <br/>
                <label for="password"><b>Password</b></label><br/>
                <input onChange={this.handleChange} type="password" placeholder="Enter Password" name="password" required/>
                <br/>
                <br/>
                <label for="email"><b>E-mail</b></label><br/>
                <input onChange={this.handleChange} type="email" placeholder="Enter E-mail" name="email" required/>
                <br/>
                <br/>
                <button button className="tiny ui inverted red basic button" type="submit" onSubmit={()=>this.handleLoginSubmit()}>Login</button>
                <br/>
                <h4>No Account Yet?</h4>
                <Link to="/newaccount">
                
                <button button className="tiny ui inverted red basic button" type="submit" >Create New Account</button>
                </Link>
              </div>
            </form>
          </div>
        );
        

    }

   
}
