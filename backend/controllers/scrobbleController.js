const { Song, Artist, Album, Scrobble } = require('../models');

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
      let album = await Album.findOne({ 
        where: { name: track.albumName, id_artist: artist.id } 
      });
    
      if (!album) {
        album = await Album.create({ 
          name: track.albumName, 
          id_artist: artist.id 
        });
      }
    
      // 3. Buscar o crear la canción en la tabla Song
      let song = await Song.findOne({
        where: { name: track.songName, id_artist: artist.id, id_album: album.id }
      });
    
      if (!song) {
        song = await Song.create({
          name: track.songName,
          id_artist: artist.id,
          id_album: album.id
        });
      }
    
      // 4. Guardar el scrobble con la canción
      await Scrobble.create({
        song_id: song.id, // Ahora referencia la canción correctamente
        artist_id: artist.id,
        album_id: album.id,
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
