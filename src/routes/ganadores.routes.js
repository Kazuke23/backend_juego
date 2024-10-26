// routes/ganadores.routes.js
const { Router } = require('express');
const { obtenerGanadores } = require('../controllers/ganadores.controller');
const router = Router();

router.get('/ganadores', obtenerGanadores); // Ruta para obtener ganadores

module.exports = router;
