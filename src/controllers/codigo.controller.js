// src/controllers/codigo.controller.js
const Codigo = require('../models/Codigo');

const buscarCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const resultado = await Codigo.findOne({ code: codigo });

    if (resultado) {
      return res.status(200).json({
        success: true,
        premio: resultado.message,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Código no encontrado',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error del servidor',
    });
  }
};

// Aquí agrupas todas las funciones en un objeto
module.exports = { buscarCodigo };
