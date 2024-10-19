// src/routes/firebaseRoutes.js
const express = require('express');
const { saveToken } = require('../controllers/firebaseController'); // Importar la función del controlador

const router = express.Router();

// Definir la ruta para guardar el token
router.post('/save-token', saveToken);

module.exports = router; // Exportar el router
