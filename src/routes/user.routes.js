const { Router } = require('express');
const { login } = require('../controllers/user.controller'); // Asegúrate de que la ruta sea correcta
const router = Router();

// Ruta para iniciar sesión
router.post('/login', login);

module.exports = router;
