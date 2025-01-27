const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SongXGenre = sequelize.define('SongXGenre', {
  song_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = SongXGenre;
