const { Router } = require('express');
const { register, registerAdmin } = require('../controllers/auth.controller');


const router = Router();

router.post('/register', register);

router.post('/admin/register', registerAdmin);

module.exports = router;
