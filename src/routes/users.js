const express = require('express');
const { getUsers, deleteUser } = require('../controllers/userContoller');
const router = express.Router();

// Ruta para obtener la lista de usuarios
router.get('/', getUsers);

// Ruta para eliminar un usuario por ID
router.delete('/:id', deleteUser);

module.exports = router;
