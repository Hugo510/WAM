const Course = require('../models/course.model');
const Exam = require('../models/exam.model');
const debug = require('debug')('app:courseExam');
const createError = require('http-errors');

// Agregar un examen a un curso
exports.addExamToCourse = async (req, res, next) => {
    try {
        const { courseId, questions } = req.body;

        // Verificar si el curso existe
        const course = await Course.findById(courseId);
        if (!course) {
            debug(`Curso con ID ${courseId} no encontrado`);
            return next(createError(404, 'Curso no encontrado'));
        }

        // Crear el nuevo examen
        const newExam = new Exam({
            courseId,
            questions
        });

        const savedExam = await newExam.save();

        // Asignar el examen al curso
        course.finalExam = savedExam._id;
        await course.save();

        res.status(201).json({ message: 'Examen agregado correctamente', exam: savedExam });
    } catch (err) {
        debug('Error al agregar examen al curso:', err);
        next(createError(500, 'Error al agregar el examen al curso'));
    }
};

// Actualizar el examen de un curso
exports.updateExamInCourse = async (req, res, next) => {
    try {
        const { examId, questions } = req.body;

        // Verificar si el examen existe
        const exam = await Exam.findById(examId);
        if (!exam) {
            debug(`Examen con ID ${examId} no encontrado`);
            return next(createError(404, 'Examen no encontrado'));
        }

        // Actualizar las preguntas del examen
        exam.questions = questions;

        const updatedExam = await exam.save();
        res.json({ message: 'Examen actualizado correctamente', exam: updatedExam });
    } catch (err) {
        debug('Error al actualizar examen del curso:', err);
        next(createError(500, 'Error al actualizar el examen del curso'));
    }
};

// Eliminar el examen de un curso
exports.deleteExamFromCourse = async (req, res, next) => {
    try {
        const { courseId, examId } = req.body;

        // Verificar si el curso existe
        const course = await Course.findById(courseId);
        if (!course) {
            debug(`Curso con ID ${courseId} no encontrado`);
            return next(createError(404, 'Curso no encontrado'));
        }

        // Verificar si el examen existe
        const exam = await Exam.findById(examId);
        if (!exam) {
            debug(`Examen con ID ${examId} no encontrado`);
            return next(createError(404, 'Examen no encontrado'));
        }

        // Eliminar el examen
        await exam.remove();

        // Eliminar la referencia al examen en el curso
        course.finalExam = null;
        await course.save();

        res.json({ message: 'Examen eliminado correctamente' });
    } catch (err) {
        debug('Error al eliminar examen del curso:', err);
        next(createError(500, 'Error al eliminar el examen del curso'));
    }
};

// Obtener el examen de un curso
exports.getExamByCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        // Verificar si el curso tiene un examen
        const exam = await Exam.findOne({ courseId });
        if (!exam) {
            debug(`Examen no encontrado para el curso con ID ${courseId}`);
            return next(createError(404, 'Examen no encontrado para este curso'));
        }

        res.json({ exam });
    } catch (err) {
        debug('Error al obtener examen del curso:', err);
        next(createError(500, 'Error al obtener el examen del curso'));
    }
};
