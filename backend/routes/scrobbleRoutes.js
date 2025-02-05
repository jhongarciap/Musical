const express = require('express');
const { saveScrobbles, getRecentScrobbles } = require('../controllers/scrobbleController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

// Ruta para guardar scrobbles (ya existente)
router.post('/scrobbles', authenticateJWT, saveScrobbles);

module.exports = router;
