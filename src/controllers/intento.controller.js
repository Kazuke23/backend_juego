// src/controllers/intento.controller.js
const Intento = require('../models/Intento');

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

module.exports = { registrarIntento };
