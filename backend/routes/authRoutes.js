const express = require('express');
const { redirectToLastFm, lastFmCallback, logout } = require('../controllers/authController'); // Ajusta la ruta si es necesario
const router = express.Router();
const Users = require('../models/userModel');

// Ruta para redirigir a Last.fm
router.get('/lastfm', redirectToLastFm);

// Ruta para el callback de Last.fm
router.get('/callback', lastFmCallback);

router.get('/profile', async (req, res) => {
  try {
    // Verificamos si la sesión contiene un usuario válido
    if (req.session && req.session.username) {
      console.log('Usuario en la sesión:', req.session.username); // Verifica que exista

      // Consulta a la base de datos
      const user = await Users.findOne({ where: { username: req.session.username } });

      if (user) {
        console.log('Usuario encontrado:', user);

        // Devuelve los datos del usuario encontrados
        return res.status(200).json({
          username: user.username,
          profile_image: user.profile_image,
          is_pro: user.is_pro,
        });
      } else {
        console.log('No se encontró al usuario');
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } else {
      console.log('No hay usuario en la sesión');
      return res.status(401).json({ message: 'No hay usuario autenticado en la sesión' });
    }
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
});

// Ruta para cerrar sesión
router.post('/logout', logout); // Aquí defines la ruta para cerrar sesión

module.exports = router;
