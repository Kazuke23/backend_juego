const { Router } = require('express');
const { registrarIntento } = require('../controllers/intento.controller');
const router = Router();

// Ruta para registrar un nuevo intento
router.post('/intento', registrarIntento); 


module.exports = router;
