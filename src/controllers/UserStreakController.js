const User = require('../models/user.model');
const debug = require('debug')('app:userStreak');
const createError = require('http-errors');

// Obtener la racha actual de un usuario
exports.getUserStreak = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            debug(`Usuario con ID ${userId} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }

        res.json({ streak: user.streak, lastLogin: user.lastLogin });
    } catch (err) {
        debug('Error al obtener la racha del usuario:', err);
        next(createError(500, 'Error al obtener la racha del usuario'));
    }
};

// Actualizar la racha de un usuario al completar una acción diaria
exports.updateUserStreak = async (req, res, next) => {
    try {
        const { userId } = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            debug(`Usuario con ID ${userId} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }

        const currentDate = new Date();
        const lastLoginDate = new Date(user.lastLogin);

        // Calcular la diferencia en días entre la última fecha de login y hoy
        const differenceInTime = currentDate.getTime() - lastLoginDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        // Si la diferencia es exactamente 1 día o menos, incrementar la racha
        if (differenceInDays <= 1) {
            user.streak += 1;
        } else {
            // Si ha pasado más de 1 día, reiniciar la racha
            user.streak = 1;
        }

        // Actualizar la última fecha de login a hoy
        user.lastLogin = currentDate;

        const updatedUser = await user.save();
        res.json({ message: 'Racha actualizada correctamente', streak: updatedUser.streak });
    } catch (err) {
        debug('Error al actualizar la racha del usuario:', err);
        next(createError(500, 'Error al actualizar la racha del usuario'));
    }
};

// Restablecer la racha de un usuario a cero
exports.resetUserStreak = async (req, res, next) => {
    try {
        const { userId } = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            debug(`Usuario con ID ${userId} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }

        // Restablecer la racha del usuario
        user.streak = 0;
        user.lastLogin = null;  // Opcionalmente, restablecer la última fecha de login
        const updatedUser = await user.save();

        res.json({ message: 'Racha restablecida a cero', streak: updatedUser.streak });
    } catch (err) {
        debug('Error al restablecer la racha del usuario:', err);
        next(createError(500, 'Error al restablecer la racha del usuario'));
    }
};
