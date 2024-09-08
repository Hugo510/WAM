const Achievement = require('../models/achievemnt.model');
const debug = require('debug')('app:achievements');
const createError = require('http-errors');

// Obtener todos los logros
exports.getAllAchievements = async (req, res, next) => {
    try {
        const achievements = await Achievement.find().populate('userId').populate('courseId');
        res.json(achievements);
    } catch (err) {
        debug('Error al obtener logros:', err);
        next(createError(500, 'Error al obtener los logros'));
    }
};

// Obtener un logro por ID
exports.getAchievementById = async (req, res, next) => {
    try {
        const achievement = await Achievement.findById(req.params.id).populate('userId').populate('courseId');
        if (!achievement) {
            debug(`Logro con ID ${req.params.id} no encontrado`);
            return next(createError(404, 'Logro no encontrado'));
        }
        res.json(achievement);
    } catch (err) {
        debug('Error al obtener logro por ID:', err);
        next(createError(500, 'Error al obtener el logro'));
    }
};

// Crear un nuevo logro
exports.createAchievement = async (req, res, next) => {
    try {
        const { userId, courseId, description } = req.body;

        const newAchievement = new Achievement({
            userId,
            courseId,
            description
        });

        const savedAchievement = await newAchievement.save();
        res.status(201).json(savedAchievement);
    } catch (err) {
        debug('Error al crear un logro:', err);
        next(createError(500, 'Error al crear el logro'));
    }
};

// Actualizar un logro
exports.updateAchievement = async (req, res, next) => {
    try {
        const { userId, courseId, description } = req.body;
        const updatedAchievement = await Achievement.findByIdAndUpdate(req.params.id, {
            userId,
            courseId,
            description
        }, { new: true });

        if (!updatedAchievement) {
            debug(`Logro con ID ${req.params.id} no encontrado para actualizar`);
            return next(createError(404, 'Logro no encontrado'));
        }
        res.json(updatedAchievement);
    } catch (err) {
        debug('Error al actualizar el logro:', err);
        next(createError(500, 'Error al actualizar el logro'));
    }
};

// Eliminar un logro
exports.deleteAchievement = async (req, res, next) => {
    try {
        const deletedAchievement = await Achievement.findByIdAndDelete(req.params.id);
        if (!deletedAchievement) {
            debug(`Logro con ID ${req.params.id} no encontrado para eliminar`);
            return next(createError(404, 'Logro no encontrado'));
        }
        res.json({ message: 'Logro eliminado con éxito' });
    } catch (err) {
        debug('Error al eliminar el logro:', err);
        next(createError(500, 'Error al eliminar el logro'));
    }
};
