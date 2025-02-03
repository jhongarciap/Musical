const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Album = sequelize.define('Album', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_artist: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
});

module.exports = Album;
