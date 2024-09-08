const Exam = require('../models/exam.model');
const debug = require('debug')('app:exams');
const createError = require('http-errors');

// Obtener todos los exámenes
exports.getAllExams = async (req, res, next) => {
    try {
        const exams = await Exam.find().populate('courseId');
        res.json(exams);
    } catch (err) {
        debug('Error al obtener todos los exámenes:', err);
        next(createError(500, 'Error al obtener los exámenes'));
    }
};

// Obtener un examen por ID
exports.getExamById = async (req, res, next) => {
    try {
        const exam = await Exam.findById(req.params.id).populate('courseId');
        if (!exam) {
            debug(`Examen con ID ${req.params.id} no encontrado`);
            return next(createError(404, 'Examen no encontrado'));
        }
        res.json(exam);
    } catch (err) {
        debug('Error al obtener el examen por ID:', err);
        next(createError(500, 'Error al obtener el examen'));
    }
};

// Crear un nuevo examen
exports.createExam = async (req, res, next) => {
    try {
        const { courseId, questions } = req.body;

        const newExam = new Exam({
            courseId,
            questions
        });

        const savedExam = await newExam.save();
        res.status(201).json(savedExam);
    } catch (err) {
        debug('Error al crear un nuevo examen:', err);
        next(createError(500, 'Error al crear el examen'));
    }
};

// Actualizar un examen
exports.updateExam = async (req, res, next) => {
    try {
        const { courseId, questions } = req.body;
        const updatedExam = await Exam.findByIdAndUpdate(req.params.id, {
            courseId,
            questions
        }, { new: true });

        if (!updatedExam) {
            debug(`Examen con ID ${req.params.id} no encontrado para actualizar`);
            return next(createError(404, 'Examen no encontrado'));
        }
        res.json(updatedExam);
    } catch (err) {
        debug('Error al actualizar el examen:', err);
        next(createError(500, 'Error al actualizar el examen'));
    }
};

// Eliminar un examen
exports.deleteExam = async (req, res, next) => {
    try {
        const deletedExam = await Exam.findByIdAndDelete(req.params.id);
        if (!deletedExam) {
            debug(`Examen con ID ${req.params.id} no encontrado para eliminar`);
            return next(createError(404, 'Examen no encontrado'));
        }
        res.json({ message: 'Examen eliminado con éxito' });
    } catch (err) {
        debug('Error al eliminar el examen:', err);
        next(createError(500, 'Error al eliminar el examen'));
    }
};
