// 'use strict';

// module.exports = (sequelize, DataTypes) => {
//     const Circuit = sequelize.define(Circuit, {
//         id: DataTypes.STRING,
//         built: DataTypes.BOOLEAN,
//         saved: DataTypes.BOOLEAN
//         //if I get time to do waveforms, another column 'simulated: DataTypes.BOOLEAN' is to be added here
//     }, {});

//     //associations
//     Circuit.associate = function(models){
//         Circuit.hasMany(models.Gate);
//         Circuit.hasMany(models.Wire);
//         Circuit.belongsTo(models.User);
//     }
  
// }
//
//--------ANOTHER WAY OF DOING IT. 




const Sequelize = require("sequelize");
const { STRING, BOOLEAN } = Sequelize
const Gate = require("./Gate")
const Wire = require("./Wire")
const User = require("./User")


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
});


const Model = Sequelize.Model;

class Circuit extends Model {

}

Circuit.init({
    built: {
        type: BOOLEAN,
        allowNull: false
        
    },
    saved: {
        type: BOOLEAN,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'circuit'
})

module.exports = Circuit

sequelize.sync()
//updates the database columns



Circuit.hasMany(Gate, {as: 'Gates'})
Circuit.hasMany(Wire, {as: 'Wires'})
Gate.belongsTo(Circuit, {foreignKey: 'circuitId'});
// Gate.belongsToMany(User, { through: Circuit}) ---> this way tries to create a new joint table. So threw error
// Wire.belongsToMany(User, { through: Circuit })
Wire.belongsTo(Circuit, {foreignKey: 'circuitId'});
User.hasMany(Circuit, {as: 'Circuits'}) //userId comes automatically


//if it has hasMany -> you dont have to mention belong to in the child class


// After defining 