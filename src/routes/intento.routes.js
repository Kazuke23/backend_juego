// src/routes/intento.routes.js
const { Router } = require('express');
const { registrarIntento } = require('../controllers/intento.controller');
const verifyToken = require('../middleware/auth');

const router = Router();

// Ruta para registrar un nuevo intento, utilizando el middleware verifyToken
router.post('/intento', verifyToken, registrarIntento);

module.exports = router;
