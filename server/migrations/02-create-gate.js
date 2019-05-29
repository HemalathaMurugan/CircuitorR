'use strict';
module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Gates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fixedInput1: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      fixedInput2: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      locationX: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      locationY: {
        type: Sequelize.FLOAT,
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
