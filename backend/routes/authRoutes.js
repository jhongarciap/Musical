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
  try {
    // Verificar si la sesión contiene un usuario
    if (req.session && req.session.username) {
      // Buscar al usuario en la base de datos utilizando Sequelize
      const user = await User.findOne({ where: { username: req.session.username } });
      
      // Verificar si el usuario fue encontrado
      if (user) {
        console.log('Usuario encontrado en base de datos:', user);

        // Responder con la información del usuario
        return res.status(200).json({
          username: user.username,
          profile_image: user.profile_image,
          is_pro: user.is_pro,
        });
      } else {
        // Si no se encontró al usuario, devolver 404
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } else {
      // Si no hay sesión o no se ha iniciado sesión
      return res.status(401).json({ message: 'No hay sesión activa o no se ha iniciado sesión' });
    }
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener el perfil del usuario:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
});

  
// Ruta para cerrar sesión
router.post('/logout', logout); // Aquí defines la ruta para cerrar sesión

module.exports = router;
