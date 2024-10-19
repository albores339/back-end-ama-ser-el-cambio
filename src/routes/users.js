const express = require('express');
const { getUsers, deleteUser, updateUserProfile, getUserProfile } = require('../controllers/userContoller');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

// Ruta para obtener la lista de usuarios
router.get('/', getUsers);

// Ruta para obtener el perfil del usuario autenticado
router.get('/me', protect, getUserProfile); // <--- Aquí agregamos la ruta GET para obtener el perfil

// Ruta para editar el perfil del usuario autenticado
router.put('/me', protect, updateUserProfile);

// Ruta para eliminar un usuario por ID
router.delete('/:id', deleteUser);

module.exports = router;
