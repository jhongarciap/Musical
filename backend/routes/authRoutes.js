const express = require('express');
const { redirectToLastFm, lastFmCallback, logout } = require('../controllers/authController'); // Ajusta la ruta si es necesario
const router = express.Router();
const User = require('../models/userModel');

// Ruta para redirigir a Last.fm
router.get('/lastfm', redirectToLastFm);

// Ruta para el callback de Last.fm
router.get('/callback', lastFmCallback);

// Ruta para obtener el perfil del usuario
router.get('/profile', async (req, res) => {
  try {
    console.log('Sesión actual:', req.session);  // Verifica la sesión

    // Verificar si la sesión contiene un usuario
    if (req.session && req.session.username) {
      // Buscar al usuario en la base de datos utilizando Sequelize
      const user = await User.findOne({ where: { username: req.session.username } });
      
      // Verificar si el usuario fue encontrado
      if (user) {
        console.log('Usuario encontrado en la base de datos:', user);  // Verifica los datos del usuario

        // Devolver los datos del usuario
        return res.status(200).json({
          username: user.username,
          profile_image: user.profile_image,
          is_pro: user.is_pro,
        });
      } else {
        console.warn('No se encontró el usuario en la base de datos.');
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } else {
      console.warn('No se encontró una sesión activa o el campo username está ausente en la sesión.');
      return res.status(401).json({ message: 'No hay sesión activa o no se ha iniciado sesión' });
    }
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);  // Detalle del error
    return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});

  
// Ruta para cerrar sesión
router.post('/logout', logout); // Aquí defines la ruta para cerrar sesión

module.exports = router;
