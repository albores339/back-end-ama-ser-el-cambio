// models/Aviso.js
const mongoose = require('mongoose');

const avisoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Aviso', avisoSchema);
