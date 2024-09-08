const Achievement = require('../models/achievemnt.model');
const User = require('../models/user.model');
const Course = require('../models/course.model');
const debug = require('debug')('app:achievements');
const createError = require('http-errors');

// Otorgar un logro a un usuario por completar un curso
exports.grantAchievementForCourseCompletion = async (req, res, next) => {
    try {
        const { userId, courseId } = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            debug(`Usuario con ID ${userId} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }

        // Verificar si el curso existe
        const course = await Course.findById(courseId);
        if (!course) {
            debug(`Curso con ID ${courseId} no encontrado`);
            return next(createError(404, 'Curso no encontrado'));
        }

        // Crear un nuevo logro
        const newAchievement = new Achievement({
            userId,
            courseId,
            description: `Logro por completar el curso: ${course.title}`
        });

        const savedAchievement = await newAchievement.save();

        // Agregar el logro al usuario
        user.achievements.push(savedAchievement._id);
        await user.save();

        res.status(201).json({ message: 'Logro otorgado correctamente', achievement: savedAchievement });
    } catch (err) {
        debug('Error al otorgar el logro:', err);
        next(createError(500, 'Error al otorgar el logro'));
    }
};

// Obtener logros de un usuario
exports.getAchievementsByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Verificar si el usuario tiene logros
        const achievements = await Achievement.find({ userId }).populate('courseId');
        if (achievements.length === 0) {
            debug(`No se encontraron logros para el usuario con ID ${userId}`);
            return next(createError(404, 'No se encontraron logros para este usuario'));
        }

        res.json(achievements);
    } catch (err) {
        debug('Error al obtener logros del usuario:', err);
        next(createError(500, 'Error al obtener logros del usuario'));
    }
};

// Obtener logros por curso
exports.getAchievementsByCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        // Verificar si el curso tiene logros
        const achievements = await Achievement.find({ courseId }).populate('userId');
        if (achievements.length === 0) {
            debug(`No se encontraron logros para el curso con ID ${courseId}`);
            return next(createError(404, 'No se encontraron logros para este curso'));
        }

        res.json(achievements);
    } catch (err) {
        debug('Error al obtener logros del curso:', err);
        next(createError(500, 'Error al obtener logros del curso'));
    }
};

// Eliminar un logro de un usuario
exports.deleteAchievementFromUser = async (req, res, next) => {
    try {
        const { achievementId, userId } = req.body;

        // Verificar si el logro existe
        const achievement = await Achievement.findById(achievementId);
        if (!achievement) {
            debug(`Logro con ID ${achievementId} no encontrado`);
            return next(createError(404, 'Logro no encontrado'));
        }

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            debug(`Usuario con ID ${userId} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }

        // Eliminar el logro del usuario
        user.achievements.pull(achievementId);
        await user.save();

        // Eliminar el logro de la base de datos
        await achievement.remove();

        res.json({ message: 'Logro eliminado correctamente' });
    } catch (err) {
        debug('Error al eliminar el logro:', err);
        next(createError(500, 'Error al eliminar el logro'));
    }
};
