const axios = require('axios');
const { generateSignature } = require('../utils/generateSignature');
const User = require('../models/userModel');

// Redirige a Last.fm para autenticación
const redirectToLastFm = (req, res) => {
  const authUrl = `https://www.last.fm/api/auth/?api_key=c8c448175ee92bd1dac3f498aae48741&cb=https://backmusical.onrender.com/api/auth/callback`;
  res.redirect(authUrl);
};

// Callback después de autenticarse
const lastFmCallback = async (req, res) => {
  const token = req.query.token;
  const apiSecret = '4320daff6a0243097f01c7c13d5fa1fa';

  const apiSig = generateSignature({
    api_key: 'c8c448175ee92bd1dac3f498aae48741',
    method: 'auth.getSession',
    token: token,
  }, apiSecret);

  try {
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=auth.getSession&api_key=c8c448175ee92bd1dac3f498aae48741&token=${token}&api_sig=${apiSig}&format=json`
    );

    const session = response.data.session;
    
    if (!session || !session.name || !session.key) {
      return res.status(400).json({ error: 'Sesión inválida' });
    }
    // Obtener detalles del perfil del usuario
    const profileResponse = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${session.name}&api_key=c8c448175ee92bd1dac3f498aae48741&format=json`
    );

    const userInfo = profileResponse.data.user;
    const profileImage = userInfo.image.find(img => img.size === 'large')['#text']; // La imagen de perfil
    const isPro = userInfo.subscriber === '1';  // Comprobar si es usuario Pro

    // Almacenar en la base de datos
    const [user, created] = await User.findOrCreate({
      where: { username: session.name },
      defaults: {
        session_key: session.key,
        profile_image: profileImage,  // Almacenar la foto de perfil
        is_pro: isPro,  // Almacenar el estado de suscripción
      }
    });

    if (!user) {
      return res.status(500).json({ error: 'No se pudo crear o encontrar el usuario' });
    }

    if (!created) {
      // Si el usuario ya existe, actualiza la imagen de perfil y el estado Pro
      user.profile_image = profileImage;
      user.is_pro = isPro;
      await user.save();  // Guardar los cambios
    }
    req.session.username = session.name;
    console.log(req.session.username)
    req.session.save((err)=> {
      if(err){
        console.error('Error guardando la sesión:', err);
      }
      res.redirect('https://main.d3swbnx2em39af.amplifyapp.com/dashboard');
    });
  } catch (error) {
    console.error('Error durante la autenticación:', error);
    res.status(500).send('Error durante la autenticación');
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
