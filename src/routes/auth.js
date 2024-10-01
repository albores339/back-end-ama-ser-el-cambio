const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

// Ruta de registro de usuario
router.post('/register', registerUser);

// Ruta de inicio de sesión
router.post('/login', loginUser);

// Ruta para obtener los datos del usuario autenticado
router.get('/me', protect, getMe);

module.exports = router;
