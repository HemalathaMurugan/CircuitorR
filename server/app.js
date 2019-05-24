// put all models here like thids

const User = require('./models/User')
const Circuit = require('./models/Circuit')
const Gate = require('./models/Gate')
const Wire = require('./models/Wire')

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
// this will convert to json file

const app = express();
//create server as app

app.use(cors());
app.use(bodyParser.json());
//middleware for express server
//emitType is an event listener &b payload will be the call back function
//
//----put everything related to backend socket here
//--- frontend socket is used to get something from the backend
//socket.on -> will be here in backend -> will be getting all data from frontend
//socket.emit -> will be in frontend to get all the incoming messages
//http methods for usermodel, api

//all the fetch requests are to be defined here

app.listen(3002);