// 'use strict';

// module.exports = (sequelize, DataTypes) => {
//     const Wire = sequelize.define('Wire', {
//         id: DataTypes.STRING,
//         inputID: DataTypes.STRING,//actually a number. To have o/p as 'display' at times, we have them stored as string
//         outputID: DataTypes.STRING
//     }, {});

//     //associations/relationships
//     Wire.associate = function(models) {
//         Wire.belongsTo(model.Circuit)
//     };
//     return Wire;

// }-------------------

    //WHEN WE HAVE THEM DEFINED THE ABOVE WAY, WE CANNOT INCLUDE WIRE IN HAS MANY OR BELONGS TO OR ANY OTHER RELATIONSHIPS/ASSOCIATIONS
    //WHEN WE DONT HAVE ANY RELATIONSHIPS THIS WAY MAY BE SUITABLE




//---------------------------ANOTHER WAY OF DOING IT
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
});

const Model = Sequelize.Model;

class Wire extends Model {

}


Wire.init({
    InputID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    OutputID: {
        type: DataTypes.STRING,
        allowNull: false// Need alteration based on the output wire modification
    }
},{
    sequelize,
    modelName: 'wire'
})

module.exports = Wire

sequelize.sync()
