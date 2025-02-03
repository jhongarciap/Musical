const { Song, Artist, Album, Scrobble, SongXArtist, SongXAlbum } = require('../models');

async function saveScrobbles(req, res) {
  try {
    const { scrobbles } = req.body;

    for (const track of scrobbles) {
      // 1. Buscar o crear el artista
      let artist = await Artist.findOne({ where: { name: track.artistName } });
      if (!artist) {
        artist = await Artist.create({ name: track.artistName });
      }

      // 2. Buscar o crear el álbum
      let album = await Album.findOne({ where: { name: track.albumName } });
      if (!album) {
        album = await Album.create({ name: track.albumName });
      }

      // 3. Buscar o crear la canción
      let song = await Song.findOne({ where: { name: track.songName } });
      if (!song) {
        song = await Song.create({
          name: track.songName,
          year: track.year,
          length: track.length
        });
      }

      // 4. Asociar la canción con el artista en SongXArtist
      let songArtist = await SongXArtist.findOne({
        where: { song_id: song.id, artist_id: artist.id }
      });
      if (!songArtist) {
        await SongXArtist.create({ song_id: song.id, artist_id: artist.id });
      }

      // 5. Asociar la canción con el álbum en SongXAlbum
      let songAlbum = await SongXAlbum.findOne({
        where: { song_id: song.id, album_id: album.id }
      });
      if (!songAlbum) {
        await SongXAlbum.create({ song_id: song.id, album_id: album.id });
      }

      // 6. Guardar el scrobble
      await Scrobble.create({
        song_id: song.id,
        id_user: req.user.id,  // Agregar id_user
        date: track.date,
        count: track.count,
        year: track.year,
        length: track.length
      });
    }

    return res.status(200).json({ message: 'Scrobbles guardados correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error guardando los scrobbles' });
  }
}

module.exports = { saveScrobbles };
