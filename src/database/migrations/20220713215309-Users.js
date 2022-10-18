'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      displayName: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: Sequelize.STRING,
      image: Sequelize.STRING,
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
