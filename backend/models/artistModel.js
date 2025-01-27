const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Artist = sequelize.define('Artist', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = Artist;

