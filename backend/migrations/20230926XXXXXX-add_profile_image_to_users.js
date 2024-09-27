module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Users', 'profile_image', {
        type: Sequelize.STRING,
        allowNull: true,
      });
      await queryInterface.addColumn('Users', 'is_pro', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('Users', 'profile_image');
      await queryInterface.removeColumn('Users', 'is_pro');
    },
  };
  