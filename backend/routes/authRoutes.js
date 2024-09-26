const express = require('express');
const { redirectToLastFm, lastFmCallback } = require('../controllers/authController');
const router = express.Router();

// Ruta para redirigir a Last.fm
router.get('/lastfm', redirectToLastFm);
// Ruta para el callback de Last.fm
router.get('/callback', lastFmCallback);  // Asegúrate de que esta ruta esté bien definida

module.exports = router;
