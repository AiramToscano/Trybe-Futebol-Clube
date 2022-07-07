'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const MatchesTable = queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });

    return MatchesTable;
  },

  down: async (queryInterface) => queryInterface.dropTable("users"),
};
