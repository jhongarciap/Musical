const express = require('express');
const { redirectToLastFm, lastFmCallback, logout } = require('../controllers/authController'); // Ajusta la ruta si es necesario
const router = express.Router();

// Ruta para redirigir a Last.fm
router.get('/lastfm', redirectToLastFm);

// Ruta para el callback de Last.fm
router.get('/callback', lastFmCallback);

// Ruta para cerrar sesión
router.post('/logout', logout); // Aquí defines la ruta para cerrar sesión

module.exports = router;
