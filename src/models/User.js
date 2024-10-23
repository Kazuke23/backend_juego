const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin'], // Define los valores permitidos
    default: 'user' // Establece un valor por defecto
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
