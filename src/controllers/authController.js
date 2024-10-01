const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

// Crear y firmar un token JWT que incluya el rol del usuario
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role, // Incluyendo el rol del usuario en el token
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// Registro de usuario
const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear el usuario
    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    // Devolver el token y la información del usuario
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user), // Generamos el token con el rol incluido
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Devolver errores de validación
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: errors });
    }
    // En caso de otros errores
    res.status(500).json({ message: 'Error del servidor, intente más tarde' });
  }
};

// Inicio de sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Buscar al usuario por su email
  const user = await User.findOne({ email });

  // Verificar que el usuario existe y la contraseña coincide
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user), // Generamos el token con el rol incluido
    });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
};

// Obtener los datos del usuario autenticado
const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json(user);
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
