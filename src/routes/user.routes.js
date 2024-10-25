const { Router } = require('express');
const { login, loginAdmin, resetPassword } = require('../controllers/user.controller'); // Asegúrate de que la ruta sea correcta
const router = Router();

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para iniciar sesión de administradores
router.post('/admin/login', loginAdmin);

// Ruta para restablecer la contraseña
router.post('/reset-password', resetPassword);

module.exports = router;

