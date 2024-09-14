const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:users');
const createError = require('http-errors');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate('role');
        res.json(users);
    } catch (err) {
        debug('Error al obtener todos los usuarios:', err);
        next(createError(500, 'Error al obtener los usuarios'));
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('role').populate('achievements');
        if (!user) {
            debug(`Usuario con ID ${req.params.id} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }
        res.json(user);
    } catch (err) {
        debug('Error al obtener el usuario por ID:', err);
        next(createError(500, 'Error al obtener el usuario'));
    }
};

// Crear un nuevo usuario
exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password, role, profilePicture } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            profilePicture
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        debug('Error al crear un nuevo usuario:', err);
        next(createError(500, 'Error al crear el usuario'));
    }
};

// Actualizar un usuario
exports.updateUser = async (req, res, next) => {
    try {
        const { username, email, role, profilePicture } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            username,
            email,
            role,
            profilePicture
        }, { new: true });

        if (!updatedUser) {
            debug(`Usuario con ID ${req.params.id} no encontrado para actualizar`);
            return next(createError(404, 'Usuario no encontrado'));
        }
        res.json(updatedUser);
    } catch (err) {
        debug('Error al actualizar el usuario:', err);
        next(createError(500, 'Error al actualizar el usuario'));
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            debug(`Usuario con ID ${req.params.id} no encontrado para eliminar`);
            return next(createError(404, 'Usuario no encontrado'));
        }
        res.json({ message: 'Usuario eliminado con éxito' });
    } catch (err) {
        debug('Error al eliminar el usuario:', err);
        next(createError(500, 'Error al eliminar el usuario'));
    }
};

// Registro de nuevo usuario
exports.registerUser = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            debug(`Usuario con email ${email} ya existe`);
            return next(createError(400, 'El usuario ya existe'));
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role:'66e50cbdd2b02957d233e5e8',
        });

        const savedUser = await newUser.save();

        // Crear token JWT
        const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: savedUser });
    } catch (err) {
        debug('Error al registrar el usuario:', err);
        next(createError(500, 'Error al registrar el usuario'));
    }
};

// Login de usuario
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email }).populate('role');
        if (!user) {
            debug(`Usuario con email ${email} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            debug('Contraseña incorrecta para el usuario con email:', email);
            return next(createError(400, 'Contraseña incorrecta'));
        }

        // Crear token JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '3h' });

        res.json({ token, user });
    } catch (err) {
        debug('Error al iniciar sesión del usuario:', err);
        next(createError(500, 'Error al iniciar sesión'));
    }
};
