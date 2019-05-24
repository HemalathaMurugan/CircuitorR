'use strict';

module.exports = (sequelize, DataTypes) => {
    const Wire = sequelize.define('Wire', {
        id: DataTypes.STRING,
        inputID: DataTypes.STRING,
        outputID: DataTypes.STRING
    }, {});

    //associations/relationships
    Wire.associate = function(models) {
        Wire.belongsTo(model.Circuit)
    };
    return Wire;

}





//---------------------------
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize({
//     dialect: "sqlite",
//     storage: "./database.sqlite"
// });

// const Model = Sequelize.Model;

// class Wire extends Model {

// }


// Wire.init({
//     //columns 
// },{
//     sequelize,
//     modelName: 'wire'
// })

// module.exports = Wire

// sequelize.sync()