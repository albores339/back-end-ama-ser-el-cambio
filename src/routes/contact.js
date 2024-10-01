const express = require('express');
const { createMessage, getMessages } = require('../controllers/contactController');
const router = express.Router();

// Ruta para crear un nuevo mensaje de contacto
router.post('/', createMessage);

// Ruta para obtener todos los mensajes de contacto
router.get('/', getMessages);

module.exports = router;
