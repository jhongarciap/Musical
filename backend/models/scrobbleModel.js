const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Scrobble = sequelize.define('Scrobble', {
  id_song: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  timestamps: false,
});

module.exports = Scrobble;
