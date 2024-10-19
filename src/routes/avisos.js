const express = require('express');
const {
  getAvisos,
  createAviso,
  updateAviso,
  deleteAviso,
} = require('../controllers/avisosController'); // Ajusta la ruta según tu estructura
const router = express.Router();

// Ruta para obtener avisos
router.get('/', getAvisos);

// Ruta para crear un nuevo aviso
router.post('/', createAviso);

// Ruta para actualizar un aviso
router.put('/:id', updateAviso);

// Ruta para eliminar un aviso
router.delete('/:id', deleteAviso);

module.exports = router;
