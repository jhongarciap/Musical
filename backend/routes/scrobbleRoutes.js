const express = require('express');
const { saveScrobbles } = require('../controllers/scrobbleController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.post('/scrobbles', authenticateJWT, saveScrobbles);

module.exports = router;
