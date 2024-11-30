const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require('./routes/user.routes.js');
const codigoRoutes = require('./routes/codigo.routes.js');
const intentoRoutes = require('./routes/intento.routes.js');

// Habilitar CORS para el dominio de tu frontend en Vercel
const allowedOrigins = ['https://front-juego.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json()); // Para parsear JSON

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Usar las rutas de autenticación
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/codigo', codigoRoutes);
app.use('/api/intento', intentoRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error en el servidor' });
});

// Exporta la aplicación
module.exports = app;
