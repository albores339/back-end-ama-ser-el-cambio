const express = require('express');
const { getGastos, createGasto, deleteGasto } = require('../controllers/expenseController');
const router = express.Router();

// Rutas para obtener, crear y eliminar gastos
router.get('/', getGastos);
router.post('/', createGasto);
router.delete('/:id', deleteGasto);  // Ruta para eliminar gasto

module.exports = router;
