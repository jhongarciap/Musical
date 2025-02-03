const { Song, Artist, Album, Scrobble, SongXArtist, SongXAlbum, Genre, SongXGenre } = require('../models');
const axios = require('axios'); // Asegúrate de tener axios instalado para realizar las peticiones HTTP

// Función para obtener la portada desde Last.fm
async function fetchAlbumCover(albumName, artistName) {
  const apiKey = 'c8c448175ee92bd1dac3f498aae48741'; // Reemplaza con tu API Key de Last.fm
  const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${artistName}&album=${albumName}&format=json`;

  try {
    const response = await axios.get(url);
    const albumData = response.data.album;

    // Buscar la imagen de la portada de tamaño 'large'
    const portada = albumData.image.find(image => image.size === 'large')['#text']
    

    return portada; // Devuelve la URL de la portada
  } catch (error) {
    console.error("Error al obtener los datos del álbum:", error);
    return null; // Si hay un error, devolvemos null
  }
}

// Función para obtener la foto del artista desde Last.fm
async function fetchArtistPhoto(artistName) {
  const apiKey = 'c8c448175ee92bd1dac3f498aae48741'; // Reemplaza con tu API Key de Last.fm
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=${apiKey}&artist=${artistName}&format=json`;

  try {
    const response = await axios.get(url);
    const artistData = response.data.artist;

    // Buscar la imagen de la foto de tamaño 'large'
    const photo = artistData.image.find(image => image.size === 'large')['#text']||
    artistData.image.find(image => image.size === 'large') ['#text']|| // Si no existe una imagen mega, buscamos 'large'
    artistData.image[0]['#text']; // Si no hay 'mega' ni 'large', usamos la primera disponible




    return photo; // Devuelve la URL de la foto del artista
  } catch (error) {
    console.error("Error al obtener los datos del artista:", error);
    return null; // Si hay un error, devolvemos null
  }
}

// Función para guardar los scrobbles
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

      let [artist] = await Artist.findOrCreate({ where: { name: track.artistName }});
      const artistPhoto = await fetchArtistPhoto(track.artistName);

      // Si obtenemos una foto válida, la guardamos en el artista
      if (artistPhoto) {
        artist.picture = artistPhoto; // Asignar la URL de la foto
        await artist.save();
      }
      // 2. Obtener la portada del álbum desde Last.fm
      const portada = await fetchAlbumCover(track.albumName, track.artistName);

      // 3. Buscar o crear el álbum
      let [album, albumCreated] = await Album.findOrCreate({
        where: { name: track.albumName, id_artist: artist.id },
        defaults: { cover: portada } // Guardar la portada en la creación
      });

      // Si el álbum ya existía, actualizamos la portada
      if (!albumCreated && portada && album.cover !== portada) {
        album.cover = portada;
        await album.save();
      }

      // 4. Buscar o crear la canción
      let [song, SongCreated] = await Song.findOrCreate({
        where: { name: track.songName },
      });

      let [genreRecord, GenreCreated] = await Genre.findOrCreate({
        where: { name: track.genre }
      });

      console.log(`Género: ${genreRecord.name} ${GenreCreated ? "(Nuevo)" : "(Existente)"}`);
      if (SongCreated) {
        await song.reload();
      }

      if (!song.id) {
        console.error("🚨 Error: No se pudo obtener el ID de la canción");
        continue;
      }

      // 5. Asociar la canción con el artista en SongXArtist
      await SongXArtist.findOrCreate({ where: { song_id: song.id, artist_id: artist.id } });

      // 6. Asociar la canción con el álbum en SongXAlbum
      await SongXAlbum.findOrCreate({ where: { song_id: song.id, album_id: album.id } });

      // Buscar o crear la relación entre la canción y el género
      await SongXGenre.findOrCreate({
        where: { song_id: song.id, genre_id: genreRecord.id }
      });

      // 7. Guardar el scrobble con la fecha y la cantidad de veces que aparece
      await Scrobble.create({
        id_song: song.id,
        id_user: req.user.id,
        date: new Date(track.date * 1000),  // Convertir Unix Timestamp a Date
        count: track.count // Obtener el conteo correcto
      });

      console.log(`✅ Scrobble guardado: ${track.songName} - ${track.artistName} | Fecha: ${new Date(track.date * 1000)} | Count: ${track.count}`);
    }

    return res.status(200).json({ message: 'Scrobbles guardados correctamente' });
  } catch (error) {
    console.error("🚨 Error guardando los scrobbles:", error);
    return res.status(500).json({ error: 'Error guardando los scrobbles' });
  }
}

module.exports = { saveScrobbles };
