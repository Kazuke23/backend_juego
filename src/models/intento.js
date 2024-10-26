// models/Intento.js
const mongoose = require('mongoose');

const intentoSchema = new mongoose.Schema({
  fechaHora: { type: Date, required: true },
  codigo: {
    type: String,
    required: true,
    match: /^\d{3}$/,
  },
  premio: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Intento', intentoSchema);
