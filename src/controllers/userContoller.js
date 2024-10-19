const User = require('../models/users');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email role'); // Seleccionamos solo los campos necesarios
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

// Obtener el perfil del usuario autenticado
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name email phone role'); // Selecciona solo los campos necesarios

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
  }
};

//Actualizar perfil
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { name, email, phone, password } = req.body;

    // Actualizar solo los campos que se envíen en el request
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    // Manejo de la contraseña
    if (password) {
      // Encriptar la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error); // Añade un log para depurar
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
};

// Eliminar un usuario por ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  updateUserProfile,
  getUserProfile
};
