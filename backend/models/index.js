'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const Song = require('./songModel');
const Artist = require('./artistModel');
const Album = require('./albumModel');
const Genre = require('./genreModel');
const Scrobble = require('./scrobbleModel');
const SongXArtist = require('./songXartistModel');
const SongXAlbum = require('./songxalbumModel');
const SongXGenre = require('./songxgenreModel');

// Relaciones Song <-> Artist
Song.belongsToMany(Artist, { through: SongXArtist, foreignKey: 'song_id' });
Artist.belongsToMany(Song, { through: SongXArtist, foreignKey: 'artist_id' });

// Relaciones Song <-> Album
Song.belongsToMany(Album, { through: SongXAlbum, foreignKey: 'song_id' });
Album.belongsToMany(Song, { through: SongXAlbum, foreignKey: 'album_id' });

// Relaciones Song <-> Genre
Song.belongsToMany(Genre, { through: SongXGenre, foreignKey: 'song_id' });
Genre.belongsToMany(Song, { through: SongXGenre, foreignKey: 'genre_id' });

// Relaciones Album <-> Artist
Album.belongsTo(Artist, { foreignKey: 'id_artist' });
Artist.hasMany(Album, { foreignKey: 'id_artist' });

// Relaciones Song <-> Scrobble
Scrobble.belongsTo(Song, { foreignKey: 'id_song' });
Song.hasMany(Scrobble, { foreignKey: 'id_song' });

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Excluye archivos ocultos
      file !== basename && // Excluye el propio index.js
      file.slice(-3) === '.js' && // Solo archivos .js
      file.indexOf('.test.js') === -1 // Excluye archivos de pruebas
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file)); // Importa el modelo
    db[model.name] = model; // Guarda directamente en db
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = { db, Song, Artist, Album, Genre, Scrobble, SongXAlbum, SongXArtist, SongXGenre };