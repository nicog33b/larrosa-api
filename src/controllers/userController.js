const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};


exports.updatePassword = async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const passwordIsValid = await bcrypt.compare(currentPassword, user.password);
        if (!passwordIsValid) {
            return res.status(403).json({ message: "Contraseña actual incorrecta" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.registerUser = async (req, res) => {
    try {
        const { name, phone, email, password, dirEnvio } = req.body;

        // Aquí podrías incluir validación para asegurarte que los datos son correctos antes de guardarlos

        // Creando el usuario en la base de datos
        const user = new User({ name, phone, email, password, dirEnvio });
        
        // Hasheando la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save(); // Guarda el usuario en la base de datos

        // Creando el token para el usuario recién registrado
        const token = createToken(user._id);

        // Envía la respuesta incluyendo el usuario y el token
        res.status(201).json({ user: user, token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const token = createToken(user._id);

        // Aquí cambiamos la respuesta para enviar solo el ID del usuario y el token
        
        res.status(200).json({ userId: user._id, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createUser = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        const user = await User.create({ name, phone, email, password, dirEnvio });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, phone, email, password }, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
