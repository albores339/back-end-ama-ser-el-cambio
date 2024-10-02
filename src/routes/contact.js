const express = require('express');
const { createMessage, getMessages, deleteMessage } = require('../controllers/contactController');
const router = express.Router();

// Ruta para crear un nuevo mensaje de contacto
router.post('/', createMessage);

// Ruta para obtener todos los mensajes de contacto
router.get('/', getMessages);

// Ruta para eliminar un mensaje por ID
router.delete('/:id', deleteMessage); // Aquí aceptamos un parámetro "id"

module.exports = router;
