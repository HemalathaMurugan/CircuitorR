// This is going to be the controller file

const Sequelize = require("sequelize");
const express = require("express")
const cors = require('cors');
const bodyParser = require("body-parser")// this will convert to json file
const port = 3002
const faker = require("faker");
// const server = http.createServer(app);
// const http = require('http');
const jwt = require('jsonwebtoken')
var app = require('express')();
var server = require('http').Server(app);
const io = require('socket.io')(server);


server.listen(80);

//import models 
const User = require('./models/User')
const Circuit = require('./models/Circuit')
const Gate = require('./models/Gate')
const Wire = require('./models/Wire')


app.use(cors());//middleware like body-parser and cors are run just through the app.use command 
app.use(bodyParser.json());
app.options('*', cors())
// server.listen(port, () => console.log(`Listening on port ${port}`));//joins together with http.createServer(app) & replaces app.listen(3002)

//Connect to your database using sequelize 
const sequelize = new Sequelize({ 
    dialect: 'sqlite',    
    storage: './database.sqlite'    
}) 


//index -> users
app.get('/users', (req, res) =>{
    User.findAll({
       include:[{
                model: Circuit
            },
            {
                model: Gate
            },
            {
                model: Wire
            }]
    }).then(users => res.json(users))
})

//users show page 
app.get('/users/:id', (req, res) =>{
    User.findByPk(req.params.id)
    .then(user => res.json(user))
})

//create users
// app.post('/users', urlencodedParser, async (req, res) => {
//     bcrypt.hash(req.body.password, 10, (err, hash)=>{
//       User.create({username: req.body.username, password_digest: hash })
//     })   
// })


//  User.destroy({ where: {  }})
app.post ('/login', (req, res) => {
   
    User.findOne({where: {username: req.body.username}})
    .then(user => {
        if(user.authenticate(req.body.password)){
            res.json(user)
        } else {
            res.json({ message: 'Nope'})
        }
    })
})

app.post ('/users', (req, res) => {
    let user = User.build(req.body)
    user.password = req.body.password

    user.save().then(user => {
        //if(user.authenticate(req.body.password))
            res.json(user)
        //}
    })
})


io.on('connection', function (socket) {  //wait for a connection
    socket.on('gateDrop', function (data) { //socket.on evenetlistener is gonna wait for the gatedrop from that particular socket(a client connection that did gateDrop) that made the connection 
        io.emit("renderGate", data)// once the gatedrop happens its gonna renderGate to all the sockets that are on now
      });
  });




//middleware for express server
//emitType is an event listener &b payload will be the call back function
//
//----put everything related to backend socket here
//--- frontend socket is used to get something from the backend
//socket.on -> will be here in backend -> will be getting all data from frontend
//socket.emit -> will be in frontend to get all the incoming messages
//http methods for usermodel, api

//all the fetch requests are to be defined here

//app.listen(3002);