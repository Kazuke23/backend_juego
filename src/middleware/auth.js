// src/middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.headers['authorization'];

  // Verificar que el token existe
  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  // Intentar verificar y decodificar el token
  try {
    // Remover el prefijo 'Bearer ' y verificar el token
    const tokenWithoutBearer = token.includes('Bearer ') ? token.split(' ')[1] : token;
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    
    // Extraer el ID del usuario y asignarlo a req.userId
    req.userId = decoded.id;
    
    next(); // Llamar al siguiente middleware o ruta
  } catch (error) {
    console.error('Error de autenticación:', error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = verifyToken;
