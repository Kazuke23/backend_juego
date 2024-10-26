// models/Ganador.js
const mongoose = require('mongoose');

const ganadorSchema = new mongoose.Schema({
  fechaHora: { type: Date, required: true },
  codigo: { type: String, required: true },
  premio: { type: String, required: true },
  nombre: { type: String, required: true },
  cedula: { type: String, required: true },
  celular: { type: String, required: true },
});

module.exports = mongoose.model('Ganador', ganadorSchema);
