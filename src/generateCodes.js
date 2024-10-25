const mongoose = require('mongoose');
const Code = require('./models/Codigo');
require('dotenv').config();

console.log('MONGODB_URI:', process.env.MONGODB_URI); // Verifica si se carga correctamente

const generateCodes = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');

    // Códigos generados
    const codes = new Set();  // Usamos Set para evitar duplicados

    // Generar 50 códigos de 1.000.000
    while (codes.size < 50) {
      const code = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
      codes.add({ code: code, message: 'Ganaste 1.000.000' });
    }

    // Generar 150 códigos de 50.000
    while (codes.size < 200) {  // 50 + 150 = 200
      const code = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
      codes.add({ code: code, message: 'Ganaste 50.000' });
    }

    // Generar 200 códigos de 10.000
    while (codes.size < 400) {  // 50 + 150 + 200 = 400
      const code = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
      codes.add({ code: code, message: 'Ganaste 10.000' });
    }

    // Generar los códigos restantes como "No ganaste"
    for (let i = 0; i < 1000; i++) {
      const code = String(i).padStart(3, '0'); // Genera códigos del 000 al 999
      if (!Array.from(codes).find(c => c.code === code)) {
        codes.add({ code: code, message: 'No ganaste' });
      }
    }

    // Insertar los códigos en la base de datos
    await Code.insertMany(Array.from(codes));  // Convertir el Set en un array para MongoDB
    console.log('Códigos generados e insertados en la base de datos');

  } catch (error) {
    console.error('Error al generar códigos:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
};

// Ejecutar la función
generateCodes();
