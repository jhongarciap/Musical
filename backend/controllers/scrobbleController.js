const { Song, Artist, Album, Scrobble } = require('../models');

const saveScrobbles = async (req, res) => {
  try {
    const { scrobbles } = req.body; // Array de scrobbles desde Last.fm

    for (const scrobble of scrobbles) {
      const [song, createdSong] = await Song.findOrCreate({
        where: { name: scrobble.songName },
        defaults: { year: scrobble.year, length: scrobble.length },
      });

      const [artist] = await Artist.findOrCreate({ where: { name: scrobble.artistName } });
      await song.addArtist(artist);

      const [album] = await Album.findOrCreate({ where: { name: scrobble.albumName } });
      await song.addAlbum(album);

      await Scrobble.create({
        id_song: song.id,
        id_user: req.user.id,
        date: scrobble.date,
        count: scrobble.count,
      });
    }

    res.status(200).json({ message: 'Scrobbles guardados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar los scrobbles' });
  }
};

module.exports = { saveScrobbles };
