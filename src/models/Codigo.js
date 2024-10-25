// Code.js
const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model('Codigo', codeSchema);
