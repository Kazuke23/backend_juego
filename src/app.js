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

// Configurar CORS para permitir solicitudes desde tu frontend
app.use(cors({
  origin: 'https://front-juego.vercel.app', // dominio de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // encabezados permitidos
  credentials: true, // si necesitas enviar cookies o encabezados de autenticación
}));

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
