module.exports = {
  up: async (queryInterface, Sequelize) => {
    const MatchesTable = queryInterface.createTable("teams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      team_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });

    return MatchesTable;
  },

  down: async (queryInterface) => queryInterface.dropTable("teams"),
};
