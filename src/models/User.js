const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin'], // Define los valores permitidos
    default: 'user' // Establece un valor por defecto
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
