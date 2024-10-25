// src/routes/codigo.routes.js
const express = require('express');
const router = express.Router();
const { buscarCodigo } = require('../controllers/codigo.controller');

// Definimos la ruta con el parámetro `codigo`
router.get('/:codigo', buscarCodigo);

module.exports = router;
