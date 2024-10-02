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

    // Obtener detalles del perfil del usuario
    const profileResponse = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${session.name}&api_key=${apiKey}&format=json`
    );

    const userInfo = profileResponse.data.user;
    const profileImage = userInfo.image.find(img => img.size === 'large')['#text']; // La imagen de perfil
    const isPro = userInfo.subscriber === '1';  // Comprobar si es usuario Pro

    // Busca al usuario por session_key
    let user = await Users.findOne({ where: { session_key: session.key } });

    // Si el usuario existe, elimina el registro basado en username
    if (user) {
        await Users.destroy({ where: { username: user.username } });
    }

    // Crear un nuevo usuario con la información actual
    user = await Users.create({
        username: session.name, // Usa el username de la sesión
        session_key: session.key,
        profile_image: profileImage || '',
        is_pro: isPro || false,
    });

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
