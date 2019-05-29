// This is going to be the controller file

const Sequelize = require("sequelize");
const express = require("express")
const cors = require('cors');
const bodyParser = require("body-parser")// this will convert to json file
//const port = 3002
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
    //    include:[{
    //             model: Circuit
    //         },
    //         {
    //             model: Gate
    //         },
    //         {
    //             model: Wire
    //         }]
    }).then(users => res.json(users))
})

//users show page 
app.get('/users/:id', (req, res) =>{
    User.findByPk(req.params.id)
    .then(user => res.json(user))
})

//create users
app.post('/users', async (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
      User.create({username: req.body.username, password_digest: hash, email: req.body.email })
    })   
})


//  User.destroy({ where: {  }})
app.post('/login', (req, res) => {
   
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
        if(user.authenticate(req.body.password)){
            res.json(user)
        }
    })
})

//to get the circuits belong to one user
app.get('/my/circuits', (req, res) => {
    console.log('HERE')
    const [ _, token ] = req.headers.authorization.split(' ')
    let { id } = jwt.verify(token, '17eb365ddb4c387e1a9507e77bee1678')
    console.log(id)
    Circuit.findAll()
    .then(circuits => {
        let userCircuits = []
        circuits.forEach( circuit =>{
            console.log(`${circuit.userId}`, id)
            if(`${circuit.userId}` === `${id}`){
                userCircuits.push(circuit)
            }
        })

         res.json(userCircuits)
    })
})

app.get('/circuits/:id', (req, res) => {
    Circuit.findByPk(req.params.id)
    .then( circuit => res.json(circuit))
})


//index of circuits
app.get('/circuits', (req, res) => {
    Circuit.findAll() 
    .then(circuits=> res.json(circuits))
})

app.get('/gates', (req, res) => {
    Gate.findAll()
    .then(gates => res.json(gates) )
})

//get gates that belong to a particular circuit of the current user
app.get('/my/circuits/:id/gates', (req, res) => {
    //const [ _, token ] = req.headers.authorization.split(' ')
    //let { id } = jwt.verify(token, '17eb365ddb4c387e1a9507e77bee1678')
    
    Gate.findAll()
    .then(gates => {
       // res.json(gates)
       let userGates = []
       
       gates.forEach( gate =>{
        console.log(`${gate.circuitId}`, `${req.params.id}`)
            if(`${gate.circuitId}`===`${req.params.id}`){
                userGates.push(gate)
            }
       })
       console.log(userGates)
       res.json(userGates)
     })
})

//get wires that belong to a particular circuit of the current user
app.get('/my/circuits/:id/wires', (req, res) => {
    //const [ _, token ] = req.headers.authorization.split(' ')
    //let { id } = jwt.verify(token, '17eb365ddb4c387e1a9507e77bee1678')
    
    Wire.findAll()
    .then(wires => {
       // res.json(gates)
       let userWires = []
       
       wires.forEach( wire =>{
        console.log(`${wire.circuitId}`, `${req.params.id}`)
            if(`${wire.circuitId}`===`${req.params.id}`){
                userWires.push(wire)
            }
       })
       console.log(userWires)
       res.json(userWires)
     })
})


//post or create a new circuit
app.post('/circuits', async (req, res) => {
    // console.log(req.body.gates)
   let gates = req.body.gates
   let wires = req.body.wires
   console.log("I am here"+ gates)
   console.log("I am here" + wires)
   let circuit = await Circuit.create({built: req.body.built, saved: req.body.saved})
    //console.log(circuit)
   gates.forEach( gate => {
        // Gate.create
       let newGate = Gate.create({fixedInput1: gate.fixedInput1, fixedInput2: gate.fixedInput2,
                     locationX: gate.location.x, locationY: gate.location.y } )
           newGate.setCircuit(circuit)  //many belongs to one association        
   })
   wires.forEach( wire => {
       let newWire = Wire.create({InputID: wire.inputID, OutputID: wire.outputID})
       newWire.setWire(circuit)  
   })
    console.log('Successfully saved!')
})


//to get one particular circuit that belongs to a particular user
app.get('./users/:userId/circuits/:circuitId', (req, res)=> {
    
})


//to update the circuit
// app.patch('/circuits/:id', async (req, res) => {
//     let circuit = await Circuit.findByPk(req.params.id)
//     circuit.update(req.body)
// })

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