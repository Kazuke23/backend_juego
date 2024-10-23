const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nombre: { type: String, required: true },
  fecha_de_nacimiento: { type: Date, required: true },
  cedula: { type: String, required: true },
  correo: { type: String, required: true },
  celular: { type: String, required: true },
  ciudad: { type: String, required: true },
  contraseña: { type: String, required: true }, // Es recomendable no almacenar la contraseña aquí
});

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);
module.exports = UserInfo;
