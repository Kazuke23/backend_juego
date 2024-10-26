const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const codigoRoutes = require('./routes/codigo.routes');
const intentoRoutes = require('./routes/intento.routes');
const ganadoresRoutes = require('./routes/ganadores.routes');

// Configurar CORS manualmente
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://front-juego.vercel.app'); // Permite solo el dominio del frontend
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors()); // Middleware CORS
app.use(express.json()); // Para poder parsear JSON

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Usar las rutas de autenticación
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/codigo', codigoRoutes);
app.use('/api/intento', intentoRoutes);
app.use('/api/ganadores', ganadoresRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error en el servidor' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
