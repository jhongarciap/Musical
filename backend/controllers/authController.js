// controllers/authController.js
const axios = require('axios');
const { generateSignature } = require('../utils/generateSignature');
const User = require('../models/userModel'); // Importa el modelo User

// Redirige a Last.fm para autenticación
const redirectToLastFm = (req, res) => {
  const apiKey = process.env.LASTFM_API_KEY;
  const callbackUrl = process.env.CALLBACK_URL;

  if (!apiKey || !callbackUrl) {
    return res.status(500).json({ error: 'Falta la configuración de la API o la URL de callback' });
  }

  const authUrl = `https://www.last.fm/api/auth/?api_key=${apiKey}&cb=${callbackUrl}`;
  console.log('Redirigiendo a Last.fm para autenticación:', authUrl); // Log de redirección
  res.redirect(authUrl);
};

// Callback después de autenticarse
const lastFmCallback = async (req, res) => {
  const token = req.query.token; 
  console.log('Token recibido:', token); // Asegúrate de que el token no sea null o undefined

  if (!token) {
    console.error('No se recibió el token de Last.fm');
    return res.status(400).json({ error: 'No se recibió el token de Last.fm' });
  }

  const apiKey = process.env.LASTFM_API_KEY;
  const apiSecret = process.env.LASTFM_API_SECRET;

  if (!apiKey || !apiSecret) {
    return res.status(400).json({ error: 'Faltan parámetros para la autenticación' });
  }

  const apiSig = generateSignature({
    api_key: apiKey,
    token: token,
    method: 'auth.getSession' 
  }, apiSecret);

  console.log('Parámetros enviados a Last.fm:', {
    api_key: apiKey,
    token: token,
    api_sig: apiSig
  });

  try {
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&api_key=${apiKey}&token=${token}&api_sig=${apiSig}&format=json`
    );

    console.log('Respuesta de Last.fm:', response.data); // Verifica qué se devuelve desde Last.fm

    const session = response.data.session;

    // Validación adicional de la respuesta
    if (!session || !session.name || !session.key) {
      console.error('Respuesta inválida de la API:', response.data);
      return res.status(400).json({ error: 'Sesión inválida o respuesta de API incompleta' });
    }

    // Almacena el token de sesión en la base de datos usando Sequelize
    try {
      const [user, created] = await User.upsert({
        username: session.name,
        session_key: session.key,
      });
      console.log('Usuario guardado exitosamente:', session.name); // Log exitoso
      // Redirigir a la página de éxito o dashboard
      res.redirect('http://localhost:3000/dashboard');
    } catch (err) {
      console.error('Error al guardar el usuario en la base de datos:', err);
      return res.status(500).json({ error: 'Error al guardar el usuario en la base de datos' });
    }
  } catch (error) {
    console.error('Error durante la autenticación:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error durante la autenticación' });
  }
};

module.exports = { redirectToLastFm, lastFmCallback };
