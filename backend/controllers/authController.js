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

    // Obtener scrobbles recientes del usuario
    const scrobblesResponse = await axios.get('https://ws.audioscrobbler.com/2.0/', {
      params: {
        method: 'user.getrecenttracks',
        user: session.name,
        api_key: apiKey,
        format: 'json',
      },
    });

    const recentTracks = scrobblesResponse.data.recenttracks.track;

    // Mapea los datos para ajustarlos al formato esperado por saveScrobbles
    const scrobbles = recentTracks.map((track) => ({
      songName: track.name,
      artistName: track.artist['#text'],
      albumName: track.album['#text'],
      date: track.date ? track.date.uts : Math.floor(Date.now() / 1000),
      count: 1, // Ajusta según tu lógica
      year: null, // Si quieres capturar el año, necesitarías extraerlo de otra fuente
      length: null, // Ajusta si tienes duración disponible
    }));

    // Simula el objeto req para llamar a saveScrobbles
    const reqForScrobbles = {
      body: { scrobbles },
      user,
    };

    // Guarda los scrobbles
    await saveScrobbles(reqForScrobbles, { status: () => ({ json: () => {} }) });

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
