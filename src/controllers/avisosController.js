const Aviso = require('../models/avisos'); // Asegúrate de ajustar la ruta al modelo Aviso según tu estructura

// Obtener todos los avisos
const getAvisos = async (req, res) => {
  try {
    const avisos = await Aviso.find().sort({ createdAt: -1 });
    res.json(avisos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los avisos' });
  }
};

// Crear un nuevo aviso
const createAviso = async (req, res) => {
  const { titulo, mensaje } = req.body;
  try {
    const nuevoAviso = new Aviso({ titulo, mensaje });
    await nuevoAviso.save();
    res.json(nuevoAviso);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el aviso' });
  }
};

// Editar un aviso
const updateAviso = async (req, res) => {
  const { id } = req.params;
  const { titulo, mensaje } = req.body;
  try {
    const avisoActualizado = await Aviso.findByIdAndUpdate(
      id,
      { titulo, mensaje },
      { new: true }
    );
    if (!avisoActualizado) {
      return res.status(404).json({ message: 'Aviso no encontrado' });
    }
    res.json(avisoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el aviso' });
  }
};

// Borrar un aviso
const deleteAviso = async (req, res) => {
  const { id } = req.params;
  try {
    const avisoEliminado = await Aviso.findByIdAndDelete(id);
    if (!avisoEliminado) {
      return res.status(404).json({ message: 'Aviso no encontrado' });
    }
    res.json({ message: 'Aviso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el aviso' });
  }
};

module.exports = {
  getAvisos,
  createAviso,
  updateAviso,
  deleteAviso,
};
