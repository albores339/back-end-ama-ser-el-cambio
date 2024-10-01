const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'] 
  },
  email: { 
    type: String, 
    required: [true, 'El correo electrónico es obligatorio'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Por favor ingrese un correo válido'] 
  },
  mensaje: { 
    type: String, 
    required: [true, 'El mensaje es obligatorio'] 
  },
});

module.exports = mongoose.model('Message', messageSchema);
