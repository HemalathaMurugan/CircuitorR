
    
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

    state = {
        username: '',
        password: '',
        email: ''
    }

   
    formSubmit = (e) => {
        e.persist()
        e.preventDefault()
       // fetch('http://10.185.0.55:80/newuser', {
           fetch('http://localhost:80/newuser',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            })

        }).then(res => res.json())
        //the following function was checkAuth in previous project
        .then(user => {
        console.log(user)
           localStorage.setItem('token', user.token) 
           localStorage.setItem('username', user.username)
           localStorage.setItem('email', user.email)
           localStorage.setItem('userId', user.id)
           console.log(localStorage)
         //   localStorage.setItem('token', user.token)
           //this.props.history.push('/')
           this.props.saveToken(user.token)
           
         })
       
    }

    handleChange = (e) => {
        console.log(e.target.id, e.target.value)
        this.setState({
            [e.target.id]: e.target.value
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
                <form style={{display: "inline-block"}}>
                <div class="new-user-form">
                    <label for="username"><b>Username</b></label><br/>
                    <input type="text" placeholder="Enter Username" id="username" onChange={(e)=>this.handleChange(e)} />
                    <br/>
                    <br/>
                    <label for="password"><b>Password</b></label><br/>
                    <input type="password" placeholder="Enter Password" id="password" onChange={(e)=>this.handleChange(e)} />
                    <br/>
                    <label for="email"><b>Email</b></label><br/>
                    <input type="email" placeholder="Enter email" id="email"onChange={(e)=>this.handleChange(e)}/>
                    <br/>
                    <br/>
                    <button button className="tiny ui red basic button" type="submit"  onClick={(e)=>this.formSubmit(e)} >Confirm Submit</button>
                </div>
                </form>
                </body>
            </div>
            </div>
        )
        }
    }
}

//onChange={(e)=>this.handleChange(e)}
//onChange={(e)=>this.handleChange(e)}
