const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SongXAlbum = sequelize.define('SongXAlbum', {
  song_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  album_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = SongXAlbum;
