const Intento = require('../models/Intento');


const registrarIntento = async (req, res) => {
  const { fechaHora, codigo, premio } = req.body;

  // Verifica que los campos no estén vacíos
  if (!fechaHora || !codigo || !premio) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos son obligatorios',
      fields: { fechaHora, codigo, premio }
    });
  }

  // Verifica que fechaHora sea un formato de fecha válido
  const fecha = new Date(fechaHora);
  if (isNaN(fecha.getTime())) { // Comprueba si la fecha es válida
    return res.status(400).json({
      success: false,
      message: 'fechaHora no es una fecha válida',
      fields: { fechaHora }
    });
  }

  try {
    const nuevoIntento = new Intento({
      fechaHora: fecha, // Aquí se guarda la fecha validada
      codigo,
      premio,
    });

    await nuevoIntento.save();

    return res.status(201).json({
      success: true,
      message: 'Intento registrado correctamente',
      intento: nuevoIntento,
    });
  } catch (error) {
    console.error('Error al registrar el intento:', error); // Agrega este log para ver el error específico
    return res.status(500).json({
      success: false,
      message: 'Error al registrar el intento',
      error: error.message // Envía el mensaje de error en la respuesta para diagnóstico
    });
  }
};

module.exports = { registrarIntento };
