
    
import React from 'react'

export default class NewUser extends React.Component {
    // componentDidMount(){
    //     this.getCircuit(this.props.match.params.id)
    //   }
    
    //   //clicked circuit path worked after refreshing. Fix:
    //   componentWillReceiveProps(newProps){
    //     if(this.props.match.isExact!== newProps.match.params.id){
    //       this.getCircuit(newProps.match.params.id)
    //     }
    //   }
    
    formSubmit = (e) => {
       // fetch('http://10.185.0.55:80/users', {
           fetch('http://localhost:80/users',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: {
                uername: e.target.username,
                password: e.target.password,
                email: e.target.email
            }

        })
    }

    render(){
        if(!(localStorage.getItem('token') === null)){
            return(
                <div>
                    <br></br>
                    You are already logged in as {`${localStorage.username}`}! 
                </div>
            )
        } else {
        return(
           
            <div style={{}}className="ui inverted segment">
            
            <div class="ui inverted form">
                <h1>Create a New Account</h1>
                <body style={{textAlign: "center"}}>
                <form style={{display: "inline-block"}} onSubmit={(e)=>this.formSubmit(e)}>
                <div class="new-user-form">
                    <label for="username"><b>Username</b></label><br/>
                    <input type="text" placeholder="Enter Username" name="username" required/>
                    <br/>
                    <br/>
                    <label for="password"><b>Password</b></label><br/>
                    <input type="password" placeholder="Enter Password" name="password" required/>
                    <br/>
                    <label for="email"><b>Email</b></label><br/>
                    <input type="email" placeholder="Enter email" name="email" required/>
                    <br/>
                    <br/>
                    <button button className="tiny ui red basic button" type="submit">Confirm Submit</button>
                </div>
                </form>
                </body>
            </div>
            </div>
        )
        }
    }
}