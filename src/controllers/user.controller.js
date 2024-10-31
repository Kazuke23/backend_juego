const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Asegúrate de instalar jsonwebtoken

// Función para iniciar sesión
const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const user = await User.findOne({ correo });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Verifica si el usuario es administrador
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Iniciar sesión con cuenta de usuario.' });
    }

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: user._id, correo: user.correo, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token: token,
      user: {
        id: user._id,
        correo: user.correo,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Función para iniciar sesión como administrador
const loginAdmin = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const user = await User.findOne({ correo });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Verifica si el usuario es un administrador
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Solo los administradores pueden acceder.' });
    }

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Generar un token JWT para el administrador (opcional)
    const token = jwt.sign(
      { id: user._id, correo: user.correo, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Inicio de sesión como administrador exitoso',
      token: token,
      user: {
        id: user._id,
        correo: user.correo,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión como administrador:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Función para restablecer la contraseña
const resetPassword = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Encripta la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    user.contraseña = await bcrypt.hash(contraseña, salt);
    await user.save();

    res.status(200).json({ message: 'Contraseña restablecida con éxito.' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Exporta las funciones correctamente
module.exports = { login, loginAdmin, resetPassword };
