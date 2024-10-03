const express = require('express');
const { getDonations, createDonation, deleteDonation } = require('../controllers/donationController');
const router = express.Router();

// Rutas para obtener, crear y eliminar donaciones
router.get('/', getDonations);
router.post('/', createDonation);
router.delete('/:id', deleteDonation);  // Ruta para eliminar donación

module.exports = router;
