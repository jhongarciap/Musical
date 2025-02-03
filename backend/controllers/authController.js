const axios = require('axios');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); // Importar JWT
const { saveScrobbles } = require('./scrobbleController'); // Importar controlador de scrobbles
const Users = require('../models/userModel');

// Redirigir a Last.fm
const redirectToLastFm = (req, res) => {
  const apiKey = 'c8c448175ee92bd1dac3f498aae48741';
  const authUrl = `https://www.last.fm/api/auth/?api_key=${apiKey}`;
  res.redirect(authUrl);
};

// Callback para autenticar y generar JWT
const lastFmCallback = async (req, res) => {
  const apiKey = 'c8c448175ee92bd1dac3f498aae48741';
  const apiSecret = '4320daff6a0243097f01c7c13d5fa1fa';
  const token = req.query.token;

  if (!token) {
    return res.status(400).send('Token no proporcionado');
  }

  const apiSig = crypto
    .createHash('md5')
    .update(`api_key${apiKey}methodauth.getSessiontoken${token}${apiSecret}`)
    .digest('hex');

  const getSessionUrl = `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&api_key=${apiKey}&token=${token}&api_sig=${apiSig}&format=json`;
  try {
    const response = await axios.get(getSessionUrl);
    const session = response.data.session;

    let user = await Users.findOne({ where: { username: session.name } });

    // Obtener detalles del perfil del usuario
    const profileResponse = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${session.name}&api_key=${apiKey}&format=json`
    );
    const userInfo = profileResponse.data.user;
    const profileImage = userInfo.image.find((img) => img.size === 'large')['#text']; // La imagen de perfil
    const isPro = userInfo.subscriber === '1'; // Comprobar si es usuario Pro

    if (!user) {
      user = await Users.create({
        username: session.name,
        session_key: session.key,
        profile_image: profileImage || '', // Asegúrate de que esta variable tenga la URL
        is_pro: isPro || false,
      });
    } else {
      user.session_key = session.key;
      user.profile_image = profileImage || user.profile_image; // Actualiza la imagen si hay una nueva
      await user.save();
    }

   // 1️⃣ OBTENER LA CANCIÓN MÁS RECIENTE
const scrobblesResponse = await axios.get('https://ws.audioscrobbler.com/2.0/', {
  params: {
    method: 'user.getrecenttracks',
    user: session.name,
    api_key: apiKey,
    format: 'json',
    limit: 1
  },
});

const recentTrack = scrobblesResponse.data.recenttracks.track[0];

if (!recentTrack) {
  return res.status(400).json({ error: "No hay canciones recientes" });
}

// Extraer datos de la canción más reciente
const songName = recentTrack.name;
const artistName = recentTrack.artist['#text'];
const albumName = recentTrack.album['#text'] ? recentTrack.album['#text'] : "Unknown Album";
const date = recentTrack.date ? recentTrack.date.uts : Math.floor(Date.now() / 1000);

// 2️⃣ OBTENER EL PLAYCOUNT (VECES QUE SE HA ESCUCHADO LA CANCIÓN)
const trackInfoResponse = await axios.get('https://ws.audioscrobbler.com/2.0/', {
  params: {
    method: 'track.getInfo',
    api_key: apiKey,
    artist: artistName,
    track: songName,
    user: session.name,
    format: 'json',
  },
});

const playcount = trackInfoResponse.data.track?.userplaycount; // Si no hay playcount, usa 1 por defecto

// 3️⃣ CREAR EL SCROBBLE CON EL PLAYCOUNT CORRECTO
const scrobble = {
  songName,
  artistName,
  albumName,
  date,
  count: playcount, // 🔥 AHORA `count` ES EL TOTAL DE VECES QUE SE HA ESCUCHADO LA CANCIÓN
  year: null,
  length: null
};

// 4️⃣ GUARDAR EL SCROBBLE EN LA BASE DE DATOS
await saveScrobbles({ body: { scrobbles: [scrobble] }, user }, { status: () => ({ json: () => {} }) });


    // Generar el JWT
    const jwtToken = jwt.sign(
      { username: session.name, key: session.key },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Tiempo de expiración del token
    );

    res.redirect(`https://musical-tawny.vercel.app/callback?token=${jwtToken}`);
  } catch (error) {
    console.error('Error al obtener la sesión:', error);
    res.status(500).send('Error durante la autenticación');
  }
};

// Cerrar sesión (opcional en JWT, ya que no requiere estado en el servidor)
const logout = (req, res) => {
  res.status(200).send('Cierre de sesión exitoso');
};

module.exports = { redirectToLastFm, lastFmCallback, logout };
