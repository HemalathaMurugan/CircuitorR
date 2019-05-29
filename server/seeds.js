const faker = require("faker")
const User = require('./models/User')
const Circuit = require('./models/Circuit')
const Gate = require('./models/Gate')
const Wire = require('./models/Wire')

;(async function(){

    await User.destroy({ where: {} })
    await Gate.destroy({ where: {} })
    await Wire.destroy({ where: {} })
    await Circuit.destroy({ where: {} })

    for(let i=0; i<5 ; i++){
        User.create({
            username: faker.name.findName(),
            password: faker.internet.password(),
            email: faker.internet.email()
        })
    }
    
    let user1 = await User.create({
        username: "hema2",
        password: "password",
        email: "hema2@gmail.com"
    })
    
    let circuit1 = await Circuit.create({
        id:1,
        built: false,
        saved: false,
        userId: user1.id // foreign keys cannot be hard coded.It will throw error
    })
    
    let gate1 = await Gate.create({
        id: 1,
        type: "and",
        fixedInput1: 1,
        fixedInput2: 1,
        locationX: 200,
        locationY: 120,
        circuitId: circuit1.id
    })
    let gate2 = await Gate.create({
        id: 2,
        type: "or",
        fixedInput1: 0,
        fixedInput2: 1,
        locationX: 200,
        locationY: 220,
        circuitId: circuit1.id
    })
    let gate3 = await Gate.create({
        id: 3,
        type: "or",
        fixedInput1: null,
        fixedInput2: null,
        locationX: 400,
        locationY: 180,
        circuitId: circuit1.id
    })
    
    Wire.create({
        id:1 ,
        inputID: gate1.id,
        outputID: gate3.id,
        circuitId: circuit1.id
    })
    Wire.create({
        id: 2,
        inputID: gate2.id,
        outputID: gate3.id,
        circuitId: circuit1.id
    })
    // Wire.create({
    //     id: 3,
    //     InputID: gate3.id,
    //     outputID: "display",
    //     circuitId: circuit1.id
    // })
})()

// // // const faker = require("faker");

// // // const gateTypes = ["and", "or", "not", "exor", "nand", "nor", "exnor"]
// // // const binaryInputs = [0,1]
// // // var previousXLocations = []
// // // var previousYLocations = []


// // // for(let i = 0; i<=10; i++){
// // //    User.create({
// // //        username: faker.name.findName(),
// // //        password: faker.internet.password(),
// // //        email: faker.internet.email()
// // //    }).then(user => {
// // //        createCircuit({
// // //            id: 1, //seeding each user with just one circuit
// // //            built: Math.random() >= 0.5, //random boolean
// // //            saved: Math.random() >= 0.5
// // //        }).then(user => {
        
// // //             let x_gap = 85 //since gate width is 70, lets maintain a gap of 85px in the x axis between gates
// // //             let y_gap = 65 //gate height is 50 px. let the gap be 65px
// // //             //creating 3 gates for eah user
// // //             for(let j=1;j<4;j++){
// // //                 createGate({
// // //                     id: j, 
// // //                     type: `${gateTypes[Math.floor(Math.random() * Math.floor(gateTypes.length))]}`,//chooses a random string within the gateTypes array
// // //                     fixedInput1: binaryInputs[Math.floor(Math.random() * Math.floor(binaryInputs.length))],
// // //                     fixedInput2: binaryInputs[Math.floor(Math.random() * Math.floor(binaryInputs.length))],
// //                             //create above two as null if you are seeding them .Then fix random for gateids 0 and 1 alone
// // //                     locationX: Math.floor(Math.random()*Math.floor(570)) + x_gap + previousXLocations[previousXLocations.length -1], //limit x coordinate of gate within 570(an approximate max of ckt container)
// // //                     locationY: Math.floor(Math.random()*Math.floor(500)) + y_gap + previousYLocations[previousXLocations.length - 1]//creates a random int with a max of value within the parantheses
// // //                 }).then(previousXLocations.push(locationX), previousYLocations.push(locationY))         
// // //             }

// // //             }).then({
// // //                 createWire({

// // //                 })
// // //             })
// // //         })
// // //     }