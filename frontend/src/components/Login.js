import React from 'react'

export default class Login extends React.Component{
    state = {
        username: '',
        password: '',
        email: ''
    }

    handleLoginSubmit = (e) =>{
        e.preventDefault()
       let username =  e.target.username.value
       let password = e.target.password.value
       let email = e.target.email.value
       
       fetch('http://localhost:3000/login',{
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
       .then(user => {
          localStorage.setItem('token', user.auth_token)
          this.props.checkAuth()
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
                <input onChange={this.handleChange} type="text" placeholder="Enter Username" name="user_name" required/>
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
                <button button className="" type="submit">Login</button>
                <br/>
                
                
                <button button className="" type="submit">Create New Account</button>
               
              </div>
            </form>
          </div>
        );
        
    }
}
