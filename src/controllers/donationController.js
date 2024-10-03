const Donation = require('../models/donation');

// Obtener todas las donaciones
exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener donaciones' });
  }
};

// Crear una nueva donación
exports.createDonation = async (req, res) => {
  const { name, amount, date } = req.body;
  try {
    const donation = new Donation({ name, amount, date });
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear donación' });
  }
};

// Eliminar una donación por ID
exports.deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;
    await Donation.findByIdAndDelete(id);
    res.status(200).json({ message: 'Donación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la donación' });
  }
};
