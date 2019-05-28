
    
import React from 'react'

export default class NewUser extends React.Component {

    render(){
        if(!(localStorage.getItem('token') === null)){
            return(
                <div>
                    <br></br>
                    You are already logged in! 
                </div>
            )
        } else {
        return(
            <div className="new-user-form-container">
                <h1>Create a New Account</h1>
                <form>
                <div class="new-user-form">
                    <label for="username"><b>Username</b></label><br/>
                    <input type="text" placeholder="Enter Username" name="username" required/>
                    <br/>
                    <br/>
                    <label for="password"><b>Password</b></label><br/>
                    <input type="password" placeholder="Enter Password" name="password" required/>
                    <br/>
                    <label for="email"><b>Password</b></label><br/>
                    <input type="email" placeholder="Enter email" name="email" required/>
                    <br/>
                    <br/>
                    <button button className="tiny ui inverted red basic button" type="submit">Submit</button>
                </div>
                </form>
            </div>
        )
        }
    }
}