'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Artists', 'picture', {
      type: Sequelize.STRING,  // o Sequelize.BLOB si la imagen será un archivo binario
      allowNull: true,  // O false si la columna es obligatoria
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Artists', 'picture');
  }
};
