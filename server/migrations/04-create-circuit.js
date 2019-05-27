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
      built: {
          allowNull: false,
          type: Sequelize.BOOLEAN
      },
      saved: {
          allowNull: false,
          type: Sequelize.BOOLEAN
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
