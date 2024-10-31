// src/routes/intento.routes.js
const { Router } = require('express');
const { registrarIntento, getWinners } = require('../controllers/intento.controller'); // Importa ambas funciones
const verifyToken = require('../middleware/auth');

const router = Router();

// Ruta para registrar un nuevo intento, utilizando el middleware verifyToken
router.post('/intento', verifyToken, registrarIntento);

// Ruta para obtener la lista de ganadores
router.get('/ganadores', verifyToken, getWinners); // Asegúrate de proteger esta ruta también

module.exports = router;
