// src/controllers/intento.controller.js
const Intento = require('../models/Intento');
const UserInfo = require('../models/UserInfo');

// Función para registrar un intento
const registrarIntento = async (req, res) => {
  const { codigo, premio } = req.body;
  const userId = req.userId; // Obtiene el ID del usuario desde el token

  // Verifica que los campos no estén vacíos
  if (!codigo || !premio) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos son obligatorios',
      fields: { codigo, premio }
    });
  }

  try {
    const nuevoIntento = new Intento({
      codigo,
      premio,
      userId,
      fechaHora: new Date() // Establece la fecha y hora actual automáticamente
    });

    await nuevoIntento.save();

    return res.status(201).json({
      success: true,
      message: 'Intento registrado correctamente',
      intento: nuevoIntento,
    });
  } catch (error) {
    console.error('Error al registrar el intento:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al registrar el intento',
      error: error.message
    });
  }
};

// Función para obtener la lista de ganadores
const getWinners = async (req, res) => {
  try {
    const winners = await Intento.aggregate([
      {
        $match: { premio: { $ne: "No ganaste" } } // Filtrar solo los registros de ganadores
      },
      {
        $lookup: {
          from: 'userinfos',         // Nombre de la colección userinfo en plural
          localField: 'userId',       // Campo en Intento para unir
          foreignField: 'userid',     // Campo en UserInfo para unir
          as: 'userInfo'              // Nombre del campo resultante
        }
      },
      {
        $unwind: '$userInfo'         // Descomponer el array userInfo
      },
      {
        $project: {                  // Seleccionar solo los campos necesarios
          fechaHora: 1,
          codigo: 1,
          premio: 1,
          'userInfo.nombre': 1,
          'userInfo.cedula': 1,
          'userInfo.celular': 1
        }
      }
    ]);

    res.json(winners);
  } catch (error) {
    console.error('Error al obtener la lista de ganadores:', error);
    res.status(500).json({ message: 'Error al obtener la lista de ganadores' });
  }
};

module.exports = { registrarIntento, getWinners };
