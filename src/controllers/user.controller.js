const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Función para iniciar sesión
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Verifica si el usuario es administrador
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para iniciar sesión como administrador.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Aquí puedes generar un token JWT si decides usarlo
    // const token = generateToken(user); // Implementa la función para generar un token

    res.status(200).json({ message: 'Inicio de sesión exitoso', user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { login };
