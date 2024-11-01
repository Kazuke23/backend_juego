// models/Intento.js
const mongoose = require('mongoose');

const intentoSchema = new mongoose.Schema({
  fechaHora: { type: Date, default: Date.now }, // Establece fechaHora con un valor predeterminado
  codigo: {
    type: String,
    required: true,
    match: /^\d{3}$/ // Valida que el código sea de tres dígitos
  },
  premio: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Enlaza con el modelo User
}, { timestamps: true });

module.exports = mongoose.model('Intento', intentoSchema);
