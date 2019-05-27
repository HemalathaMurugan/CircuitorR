'use strict';
module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Wires', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inputID: {
          allowNull: false,
          type: Sequelize.STRING 
          //a number. To set outputID to display at times , we have it as string instead of integer
      },
      outputID: {
          type: Sequelize.STRING,
          allowNull: false
      },
      circuitId:{
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Gates');
  }
};
