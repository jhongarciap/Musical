// routes/authRoutes.js
const express = require('express');
const { redirectToLastFm, lastFmCallback } = require('../controllers/authController');

const router = express.Router();

// Ruta para redirigir a Last.fm
router.get('/login', redirectToLastFm);

// Callback de Last.fm
router.get('/callback', lastFmCallback);

module.exports = router;
