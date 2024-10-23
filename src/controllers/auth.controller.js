const User = require('../models/User');
const UserInfo = require('../models/UserInfo');
const bcrypt = require('bcryptjs');

// Función para registrar un usuario
const register = async (req, res) => {
  try {
    const { name, dob, cedula, email, celular, ciudad, password } = req.body;

    // Validar todos los campos
    if (!name || !dob || !cedula || !email || !celular || !ciudad || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya está registrado.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la colección User
    const newUser = new User({
      email,
      password: hashedPassword,
      role: 'user'
    });

    const savedUser = await newUser.save();

    // Crear el documento en la colección UserInfo
    const newUserInfo = new UserInfo({
      userid: savedUser._id,
      nombre: name,
      fecha_de_nacimiento: dob,
      cedula,
      correo: email,
      celular,
      ciudad,
      contraseña: hashedPassword, // Considera no guardar la contraseña aquí
    });

    await newUserInfo.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

// Lógica para registrar un administrador
const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar que el correo no exista ya
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'El correo ya está en uso' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo administrador
    const newAdmin = new User({
      email,
      password: hashedPassword,
      role: 'admin' // Puedes agregar un campo de rol para identificar si es un administrador
    });

    // Guardar el nuevo administrador en la base de datos
    await newAdmin.save();

    res.status(201).json({ message: 'Administrador registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar el administrador:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { registerAdmin, register };
