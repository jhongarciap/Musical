const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SongXArtist = sequelize.define('SongXArtist', {
  song_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = SongXArtist;
