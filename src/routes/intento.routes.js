const { Router } = require('express');
const { registrarIntento, obtenerGanadores } = require('../controllers/intento.controller');
const router = Router();

// Ruta para registrar un nuevo intento
router.post('/intento', registrarIntento); // Cambia '/' por '/intento'

// Ruta para obtener los ganadores
router.get('/ganadores', obtenerGanadores);


module.exports = router;
