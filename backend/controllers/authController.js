// controllers/authController.js
const axios = require('axios');
const { generateSignature } = require('../utils/generateSignature');
const connection = require('../config/db');

// Redirige a Last.fm para autenticación
const redirectToLastFm = (req, res) => {
  const apiKey = process.env.LASTFM_API_KEY;
  const callbackUrl = process.env.CALLBACK_URL;
  const authUrl = `https://www.last.fm/api/auth/?api_key=${apiKey}&cb=${callbackUrl}`;
  res.redirect(authUrl);
};

// Callback después de autenticarse
const lastFmCallback = async (req, res) => {
  const token = req.query.token;
  const apiKey = process.env.LASTFM_API_KEY;
  const apiSecret = process.env.LASTFM_API_SECRET;

  const apiSig = generateSignature({
    api_key: apiKey,
    token,
  }, apiSecret);

  try {
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&api_key=${apiKey}&token=${token}&api_sig=${apiSig}&format=json`
    );
    
    const session = response.data.session;

    // Almacena el token de sesión en la base de datos
    const query = 'INSERT INTO users (username, session_key) VALUES (?, ?)';
    connection.query(query, [session.name, session.key], (err) => {
      if (err) {
        res.status(500).json({ error: 'Error al guardar el usuario' });
      } else {
        res.send(`Usuario autenticado. Sesión almacenada para ${session.name}`);
      }
    });
  } catch (error) {
    res.status(500).send('Error durante la autenticación');
  }
};

module.exports = { redirectToLastFm, lastFmCallback };
