const express = require('express');
const { redirectToLastFm, lastFmCallback, logout } = require('../controllers/authController');
const router = express.Router();
const Users = require('../models/userModel.js');
const authenticateJWT = require('../middleware/authenticateJWT.js');  // Middleware para verificar JWT

// Ruta para redirigir a Last.fm
router.get('/lastfm', redirectToLastFm);

// Ruta para callback
router.get('/callback', lastFmCallback);

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', authenticateJWT, async (req, res) => {
  try {
    // Busca al usuario usando el session_key que se ha almacenado
    const user = await Users.findOne({ where: { session_key: req.user.key } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({
      username: user.username,
      profile_image: user.profile_image,
      is_pro: user.is_pro,
    });
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});


// Ruta para cerrar sesión (solo redirige en JWT)
router.post('/logout', logout);

module.exports = router;
