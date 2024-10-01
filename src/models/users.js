const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'], // Mensaje de error si no se ingresa nombre
    trim: true, // Elimina espacios en blanco al principio y final
    minlength: [3, 'El nombre debe tener al menos 3 caracteres'], // Validación de longitud mínima
    maxlength: [50, 'El nombre no debe exceder los 50 caracteres'], // Longitud máxima permitida
  },
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true, // No permite correos duplicados
    lowercase: true, // Guarda el correo en minúsculas
    match: [ // Expresión regular para validar formato de correo
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      'Por favor ingrese un correo válido'
    ]
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'], // Longitud mínima de contraseña
  },
  phone: {
    type: Number,
    required: [true, 'El número de teléfono es obligatorio'],
    unique: true, // No permite números de teléfono duplicados
    match: [ // Expresión regular para validar formato de teléfono (10 dígitos)
      /^[0-9]{10}$/,
      'Por favor ingrese un número de teléfono válido de 10 dígitos'
    ]
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Solo permite estos dos valores
    default: 'user', // Valor por defecto
  },
});

// Método para hashear la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Solo hashea si la contraseña ha sido modificada
  const salt = await bcrypt.genSalt(10); // Genera una "sal" para hashear la contraseña
  this.password = await bcrypt.hash(this.password, salt); // Hashea la contraseña antes de guardarla
  next(); // Continúa con el proceso de guardado
});

// Método para comparar contraseñas (útil en el login)
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compara la contraseña ingresada con la almacenada
};

module.exports = mongoose.model('User', userSchema);
