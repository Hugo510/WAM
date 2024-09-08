const Course = require('../models/course.model');
const debug = require('debug')('app:courses');
const createError = require('http-errors');

// Obtener todos los cursos
exports.getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find().populate('category').populate('finalExam').populate('contentAndPuzzles.puzzleId');
        res.json(courses);
    } catch (err) {
        debug('Error al obtener todos los cursos:', err);
        next(createError(500, 'Error al obtener los cursos'));
    }
};

// Obtener un curso por ID
exports.getCourseById = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id).populate('category').populate('finalExam').populate('contentAndPuzzles.puzzleId');
        if (!course) {
            debug(`Curso con ID ${req.params.id} no encontrado`);
            return next(createError(404, 'Curso no encontrado'));
        }
        res.json(course);
    } catch (err) {
        debug('Error al obtener el curso por ID:', err);
        next(createError(500, 'Error al obtener el curso'));
    }
};

// Crear un nuevo curso
exports.createCourse = async (req, res, next) => {
    try {
        const { title, description, category, contentAndPuzzles, finalExam } = req.body;

        const newCourse = new Course({
            title,
            description,
            category,
            contentAndPuzzles,
            finalExam
        });

        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        debug('Error al crear un nuevo curso:', err);
        next(createError(500, 'Error al crear el curso'));
    }
};

// Actualizar un curso
exports.updateCourse = async (req, res, next) => {
    try {
        const { title, description, category, contentAndPuzzles, finalExam } = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, {
            title,
            description,
            category,
            contentAndPuzzles,
            finalExam
        }, { new: true });

        if (!updatedCourse) {
            debug(`Curso con ID ${req.params.id} no encontrado para actualizar`);
            return next(createError(404, 'Curso no encontrado'));
        }
        res.json(updatedCourse);
    } catch (err) {
        debug('Error al actualizar el curso:', err);
        next(createError(500, 'Error al actualizar el curso'));
    }
};

// Eliminar un curso
exports.deleteCourse = async (req, res, next) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            debug(`Curso con ID ${req.params.id} no encontrado para eliminar`);
            return next(createError(404, 'Curso no encontrado'));
        }
        res.json({ message: 'Curso eliminado con éxito' });
    } catch (err) {
        debug('Error al eliminar el curso:', err);
        next(createError(500, 'Error al eliminar el curso'));
    }
};
