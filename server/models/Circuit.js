'use strict';

module.exports = (sequelize, DataTypes) => {
    const Circuit = sequelize.define(Circuit, {
        id: DataTypes.STRING,
        built: DataTypes.BOOLEAN,
        saved: DataTypes.BOOLEAN
        //if I get time to do waveforms, another column 'simulated: DataTypes.BOOLEAN' is to be added here
    }, {});

    //associations
    Circuit.associate = function(models){
        Circuit.hasMany(models.Gate);
        Circuit.hasMany(models.Wire);
        Circuit.belongsTo(models.User);
    }
  
}




//--------ANOTHER WAY OF DOING IT. 
// const Sequelize = require("sequelize");
// const Gate = require("./Gate")
// const Wire = require("./Wire")


// const sequelize = new Sequelize({
//     dialect: "sqlite",
//     storage: "./database.sqlite"
// });

// const Model = Sequelize.Model;

// class Circuit extends Model {

// }

// Circuit.init({
//     //columns 
// },{
//     sequelize,
//     modelName: 'circuit'
// })

// module.exports = Circuit

// sequelize.sync()
// //updates the database columns

// Circuit.hasMany(Gate, {as: 'Gates'})
// Circuit.hasMany(Wire, {as: 'Wires'})

// //if it has hasMany -> you dont have to mention belong to in the child class


// // After defining 