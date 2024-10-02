const express = require('express');
const { redirectToLastFm, lastFmCallback, logout } = require('../controllers/authController'); // Ajusta la ruta si es necesario
const router = express.Router();
const User = require('../models/userModel');

// Ruta para redirigir a Last.fm
router.get('/lastfm', redirectToLastFm);

// Ruta para el callback de Last.fm
router.get('/callback', lastFmCallback);

// Ruta para obtener la información del usuario
router.get('/profile', async (req, res) => {
  try {
    // Verificar si hay sesión y si el nombre de usuario está disponible
    if (req.session && req.session.username) {
      console.log(`Buscando usuario: ${req.session.username}`); // Log para verificar el nombre de usuario en la sesión

      const user = await User.findOne({ where: { username: req.session.username } });

      // Verificar si se encontró el usuario
      if (user) {
        console.log('Usuario encontrado:', user); // Log para mostrar el usuario encontrado
        return res.status(200).json({
          username: user.username,
          profile_image: user.profile_image,
          is_pro: user.is_pro,
        });
      } else {
        console.log('Usuario no encontrado en la base de datos'); // Log si no se encuentra el usuario
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } else {
      console.log('No hay sesión o nombre de usuario no definido'); // Log si no hay sesión
      return res.status(401).json({ message: 'No autorizado' }); // Cambié el código a 401 para reflejar mejor la falta de sesión
    }
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
});

  
// Ruta para cerrar sesión
router.post('/logout', logout); // Aquí defines la ruta para cerrar sesión

module.exports = router;
