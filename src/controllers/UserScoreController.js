const User = require('../models/user.model');
const debug = require('debug')('app:userScore');
const createError = require('http-errors');

// Obtener el puntaje de un usuario
exports.getUserScore = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            debug(`Usuario con ID ${userId} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }

        res.json({ score: user.score });
    } catch (err) {
        debug('Error al obtener el puntaje del usuario:', err);
        next(createError(500, 'Error al obtener el puntaje del usuario'));
    }
};

// Actualizar el puntaje de un usuario
exports.updateUserScore = async (req, res, next) => {
    try {
        const { userId, points } = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            debug(`Usuario con ID ${userId} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }

        // Actualizar el puntaje del usuario
        user.score += points;
        if (user.score < 0) user.score = 0; // Asegurarse de que el puntaje no sea negativo

        const updatedUser = await user.save();
        res.json({ message: 'Puntaje actualizado correctamente', score: updatedUser.score });
    } catch (err) {
        debug('Error al actualizar el puntaje del usuario:', err);
        next(createError(500, 'Error al actualizar el puntaje del usuario'));
    }
};

// Restablecer el puntaje de un usuario a cero
exports.resetUserScore = async (req, res, next) => {
    try {
        const { userId } = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            debug(`Usuario con ID ${userId} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }

        // Restablecer el puntaje del usuario
        user.score = 0;
        const updatedUser = await user.save();

        res.json({ message: 'Puntaje restablecido a cero', score: updatedUser.score });
    } catch (err) {
        debug('Error al restablecer el puntaje del usuario:', err);
        next(createError(500, 'Error al restablecer el puntaje del usuario'));
    }
};
