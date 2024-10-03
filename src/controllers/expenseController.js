const Gasto = require('../models/expense');

// Obtener todos los gastos
exports.getGastos = async (req, res) => {
  try {
    const gastos = await Gasto.find();
    res.status(200).json(gastos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los gastos' });
  }
};

// Crear un nuevo gasto
exports.createGasto = async (req, res) => {
  const { name, amount, date } = req.body;
  try {
    const gasto = new Gasto({ name, amount, date });
    await gasto.save();
    res.status(201).json(gasto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el gasto' });
  }
};

// Eliminar un gasto por ID
exports.deleteGasto = async (req, res) => {
  try {
    const { id } = req.params;
    await Gasto.findByIdAndDelete(id);
    res.status(200).json({ message: 'Gasto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el gasto' });
  }
};
