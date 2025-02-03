const { Song, Artist, Album, Scrobble, SongXArtist, SongXAlbum } = require('../models');

async function saveScrobbles(req, res) {
  try {
    const { scrobbles } = req.body;

    // Contar cuántas veces se ha scrobbleado cada canción
    const scrobbleCounts = {};
    scrobbles.forEach(track => {
      const key = `${track.songName}-${track.artistName}`;
      scrobbleCounts[key] = (scrobbleCounts[key] || 0) + 1;
    });

    for (const track of scrobbles) {
      // 1. Buscar o crear el artista
      let [artist] = await Artist.findOrCreate({ where: { name: track.artistName } });

      // 2. Buscar o crear el álbum
      let [album] = await Album.findOrCreate({ where: { name: track.albumName, id_artist: artist.id } });

      // 3. Buscar o crear la canción
      let [song, created] = await Song.findOrCreate({
        where: { name: track.songName },
        defaults: { year: track.year, length: track.length }
      });

      if (created) {
        await song.reload();
      }

      if (!song.id) {
        console.error("🚨 Error: No se pudo obtener el ID de la canción");
        continue;
      }

      // 4. Asociar la canción con el artista en SongXArtist
      await SongXArtist.findOrCreate({ where: { song_id: song.id, artist_id: artist.id } });

      // 5. Asociar la canción con el álbum en SongXAlbum
      await SongXAlbum.findOrCreate({ where: { song_id: song.id, album_id: album.id } });

      // 6. Guardar el scrobble con la fecha y la cantidad de veces que aparece
      await Scrobble.create({
        id_song: song.id,
        id_user: req.user.id,
        date: new Date(track.date * 1000),  // Convertir Unix Timestamp a Date
        count: scrobbleCounts[`${track.songName}-${track.artistName}`] // Obtener el conteo correcto
      });

      console.log(`✅ Scrobble guardado: ${track.songName} - ${track.artistName} | Fecha: ${new Date(track.date * 1000)} | Count: ${scrobbleCounts[`${track.songName}-${track.artistName}`]}`);
    }

    return res.status(200).json({ message: 'Scrobbles guardados correctamente' });
  } catch (error) {
    console.error("🚨 Error guardando los scrobbles:", error);
    return res.status(500).json({ error: 'Error guardando los scrobbles' });
  }
}

module.exports = { saveScrobbles };
