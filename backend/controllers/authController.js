const axios = require('axios');
const Users = require('../models/userModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');  // Importar JWT

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

    if (!user) {
      user = await Users.create({
        username: session.name,
        session_key: session.key,
        profile_image: '',
        is_pro: false,
      });
    } else {
      user.session_key = session.key;
      await user.save();
    }

    // Generar el JWT
    const jwtToken = jwt.sign(
      { username: session.name, key: session.key },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Tiempo de expiración del token
    );

  res.redirect(`https://main.d3swbnx2em39af.amplifyapp.com/callback?token=${jwtToken}`);
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
