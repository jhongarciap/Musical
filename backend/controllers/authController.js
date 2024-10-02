const axios = require('axios');
const User = require('../models/userModel');
const crypto = require('crypto');

// Redirige a Last.fm para autenticación
const redirectToLastFm = (req, res) => {
  const apiKey = 'c8c448175ee92bd1dac3f498aae48741';
  const authUrl = `https://www.last.fm/api/auth/?api_key=${apiKey}`;
  console.log('Redirecting to:', authUrl);
  res.redirect(authUrl);
};
const lastFmCallback = async (req, res) => {
  const apiKey = 'c8c448175ee92bd1dac3f498aae48741';
  const apiSecret = '4320daff6a0243097f01c7c13d5fa1fa'; // Reemplaza con tu clave secreta de Last.fm
  const token = req.query.token;

  if (!token) {
    return res.status(400).send('Token not found');
  }

  // Crear la firma API (api_sig)
  const apiSig = crypto
    .createHash('md5')
    .update(`api_key${apiKey}methodauth.getSessiontoken${token}${apiSecret}`)
    .digest('hex');

 // Hacer la solicitud para obtener la sesión
 const getSessionUrl = `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&api_key=${apiKey}&token=${token}&api_sig=${apiSig}&format=json`;

 try {
   const response = await axios.get(getSessionUrl);
   const session = response.data.session;

   if (!session || !session.name || !session.key) {
     return res.status(500).send('Error obteniendo la sesión');
   }

   // Hacer la solicitud para obtener la información del usuario
   const getUserInfoUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${session.name}&api_key=${apiKey}&format=json`;

   const userInfoResponse = await axios.get(getUserInfoUrl);
   const userInfo = userInfoResponse.data.user;

   // Verifica que la imagen esté disponible
   const profileImage = userInfo.image && userInfo.image.length > 0 ? userInfo.image[2]['#text'] : ''; // Toma la imagen de tamaño medio

   // Preparar los datos del usuario para el POST
   const userData = {
     username: session.name,
     session_key: session.key,
     profile_image: profileImage, // Guarda la imagen de perfil obtenida
     is_pro: userInfo.subscriber === 1, // Actualiza si el usuario es pro
   };

   // Realizar la solicitud POST para guardar el usuario en la base de datos
   const savedUser = await User.create(userData);
   
   // Guarda el nombre de usuario en la sesión de Express
   req.session.username = savedUser.username;
   req.session.key = savedUser.session_key;

   // Redirige al usuario al dashboard o a donde prefieras
   res.redirect('https://main.d3swbnx2em39af.amplifyapp.com/dashboard');
 } catch (error) {
   console.error('Error fetching session or user info:', error);
   res.status(500).send('Error during authentication');
 }
};

// Función para cerrar la sesión
const logout = (req, res) => {
  console.log('Solicitud de cierre de sesión recibida'); // Mensaje al inicio de la función

  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        console.error('Error al cerrar la sesión:', err); // Imprimir error si ocurre
        return res.status(500).send('Error al cerrar la sesión');
      } else {
        res.clearCookie('connect.sid'); // Limpia la cookie de sesión
        console.log('Sesión cerrada correctamente'); // Mensaje de éxito
        return res.status(200).send('Sesión cerrada correctamente');
      }
    });
  } else {
    console.log('No había sesión activa'); // Mensaje si no hay sesión
    res.status(200).send('No había sesión activa');
  }
};



module.exports = { redirectToLastFm, lastFmCallback, logout };
