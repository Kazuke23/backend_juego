const Intento = require('../models/Intento');
const UserInfo = require('../models/UserInfo');

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

const obtenerGanadores = async (req, res) => {
  try {
    // Asegúrate de que la colección Intento tiene userid correctamente referenciado a UserInfo
    const intentos = await Intento.find().populate({
      path: 'userid', // Asegura que el campo 'userid' sea poblado
      select: 'nombre cedula celular' // Solo selecciona los campos necesarios
    });

    // Verifica que los intentos tienen usuarios relacionados
    const ganadores = intentos
      .filter(intento => intento.userid) // Verifica que el intento tenga un usuario relacionado
      .map(intento => ({
        fecha: intento.fechaHora,
        nombre: intento.userid.nombre,
        cedula: intento.userid.cedula,
        celular: intento.userid.celular,
        codigo: intento.codigo,
        premio: intento.premio,
      }));

    // Si no hay ganadores
    if (ganadores.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No hay ganadores disponibles',
      });
    }

    // Responde con los ganadores
    res.json(ganadores);
  } catch (error) {
    console.error('Error al obtener ganadores:', error); // Log de error
    res.status(500).json({
      success: false,
      message: 'Error al obtener ganadores',
      error: error.message,
    });
  }
};
module.exports = { registrarIntento, obtenerGanadores };