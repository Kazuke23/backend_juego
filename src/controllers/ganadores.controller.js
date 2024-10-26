// controllers/ganadores.controller.js
const Intento = require('../models/Intento');
const UserInfo = require('../models/UserInfo');

const obtenerGanadores = async (req, res) => {
  try {
    const intentos = await Intento.find();
    const ganadores = [];

    for (const intento of intentos) {
      const userInfo = await UserInfo.findOne({ correo: intento.codigo });
      if (userInfo) {
        ganadores.push({
          fecha: intento.fechaHora,
          nombre: userInfo.nombre,
          cedula: userInfo.cedula,
          celular: userInfo.celular,
          codigo: intento.codigo,
          premio: intento.premio,
        });
      }
    }

    res.status(200).json({ success: true, ganadores });
  } catch (error) {
    console.error('Error al obtener ganadores:', error);
    res.status(500).json({ success: false, message: 'Error al obtener ganadores' });
  }
};

module.exports = { obtenerGanadores };
