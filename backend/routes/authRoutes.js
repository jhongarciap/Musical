const express = require('express');
const { redirectToLastFm, lastFmCallback, logout } = require('../controllers/authController'); // Ajusta la ruta si es necesario
const router = express.Router();
const User = require('../models/userModel');

// Ruta para redirigir a Last.fm
router.get('/lastfm', redirectToLastFm);

// Ruta para el callback de Last.fm
router.get('/callback', lastFmCallback);

// Ruta para obtener la información del usuario desde la sesión
router.get('/profile', async (req, res) => {
  console.log('Sesión:', req.session);
    try {
      console.log('Sesión actual:', req.session);
      if (req.session && req.session.username) {
        const user = await User.findOne({ where: { username: req.session.username } });
        console.log('Usuario encontrado en base de datos:', user);
        if (user) {
          return res.status(200).json({
            username: user.username,
            profile_image: user.profile_image,
            is_pro: user.is_pro,
          });
        }
      }
      return res.status(404).json({ message: 'Usuario no encontrado' });
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  });
  
// Ruta para cerrar sesión
router.post('/logout', logout); // Aquí defines la ruta para cerrar sesión

module.exports = router;
