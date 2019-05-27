// 'use strict';

// module.exports = (sequelize, DataTypes) => {
//     const Gate = sequelize.define('Gate', {
//         id: DataTypes.STRING,
//         type: DataTypes.STRING,
//         fixedInput1: DataTypes.STRING.BINARY,
//         fixedInput1: DataTypes.STRING.BINARY,
//         //location which is an object in the frontend. Remember to retrieve this data and put it into objects
//         locationX: DataTypes.FLOAT,
//         locationY: DataTypes.FLOAT
//     }, {});
//     //associations/relationships
//     Gate.associate = function(models){
//         Gate.belongsTo(model.Circuit)
//     }
// }


//use strict rules: 
//------------------------------------
// In function calls like f(), the this value was the global object. In strict mode, it is now undefined
//In normal JavaScript, a developer will not receive any error feedback assigning values to non-writable properties
//with statement is not allowed-> with (Math){x = cos(2)}; // will throw an error
//string “arguments” cannot be used as a variable -> let arguments = 3.14; // will throw an error
//string “eval” cannot be used as a variable -> let eval = 3.14; // will throw an error
//Deleting an undeletable property is not allowed -> delete Object.prototype; // will throw an error
//Writing to a get-only property is not allowed -> let obj = {get x() {return 0} };
//                                                 obj.x = 3.14; // will throw an error
//Writing to a read-only property is not allowed -> 
//      let obj = {};
//      Object.defineProperty(obj, “x”, {value:0, writable:false});
//      obj.x = 3.14; //will throw an error
//Escape characters are not allowed -> let x = \010; // will throw an error
//Octal numeric literals are not allowed -> let x = 010; // will throw an error
//Duplicating a parameter name is not allowed -> Duplicating a parameter name is not allowed
//Duplicating a parameter name is not allowed -> let x = 3.14;
//Deleting a function is also not allowed -> 
//      function x(p1, p2) {};
//      delete x; // will throw an error
// Objects are variables too.Using an object, without declaring it, is not allowed:
//      x = {p1:10, p2:20}; // will throw an error
//In normal JavaScript, mistyping a variable name creates a new global variable. In strict mode, this will throw an error, making it impossible to accidentally create a global variable
//Using strict mode, don’t allow to use a variable without declaring it
//x = 3.14; // will throw an error -> using variables without declaring is not allowed

//-------------------------------------ANOTHER WAY OF DOING IT
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
});

const Model = Sequelize.Model;

class Gate extends Model {

}

Gate.init({
   fixedInput1: {
       type: DataTypes.STRING.BINARY,
       allowNull: true
   },
   fixedInput2: {
        type: DataTypes.STRING.BINARY,
        allowNull: true
   },
    //location which is an object in the frontend. Remember to retrieve this data and put it into objects
   locationX: {
        type: DataTypes.FLOAT,
        allowNull: false
   },
   locationY: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'gate'
})

module.exports = Gate

sequelize.sync()