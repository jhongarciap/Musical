const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Song = sequelize.define('Song', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Songs',
  timestamps: false,
});

module.exports = Song;
