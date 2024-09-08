const Course = require('../models/course.model');
const debug = require('debug')('app:courseContent');
const createError = require('http-errors');

// Agregar contenido a un curso
exports.addContentToCourse = async (req, res, next) => {
    try {
        const { courseId, contentType, contentData } = req.body;

        // Verificar si el curso existe
        const course = await Course.findById(courseId);
        if (!course) {
            debug(`Curso con ID ${courseId} no encontrado`);
            return next(createError(404, 'Curso no encontrado'));
        }

        // Validar tipo de contenido
        if (!['text', 'image', 'video'].includes(contentType)) {
            debug('Tipo de contenido no válido:', contentType);
            return next(createError(400, 'Tipo de contenido no válido'));
        }

        // Crear nuevo contenido
        const newContent = {
            type: contentType,
            data: contentType === 'text' ? contentData : null, // Guardar texto directamente, si es de tipo 'text'
            url: contentType !== 'text' ? contentData : null  // Guardar la URL o referencia, si es multimedia
        };

        // Agregar el contenido al curso
        course.contentAndPuzzles.push(newContent);
        const updatedCourse = await course.save();

        res.status(201).json({ message: 'Contenido agregado correctamente', course: updatedCourse });
    } catch (err) {
        debug('Error al agregar contenido al curso:', err);
        next(createError(500, 'Error al agregar contenido al curso'));
    }
};

// Actualizar contenido de un curso
exports.updateContentInCourse = async (req, res, next) => {
    try {
        const { courseId, contentId, contentType, contentData } = req.body;

        // Verificar si el curso existe
        const course = await Course.findById(courseId);
        if (!course) {
            debug(`Curso con ID ${courseId} no encontrado`);
            return next(createError(404, 'Curso no encontrado'));
        }

        // Buscar el contenido a actualizar
        const contentIndex = course.contentAndPuzzles.findIndex(item => item._id.toString() === contentId);
        if (contentIndex === -1) {
            debug(`Contenido con ID ${contentId} no encontrado`);
            return next(createError(404, 'Contenido no encontrado'));
        }

        // Validar tipo de contenido
        if (!['text', 'image', 'video'].includes(contentType)) {
            debug('Tipo de contenido no válido:', contentType);
            return next(createError(400, 'Tipo de contenido no válido'));
        }

        // Actualizar el contenido
        course.contentAndPuzzles[contentIndex] = {
            type: contentType,
            data: contentType === 'text' ? contentData : null,  // Guardar texto si es de tipo 'text'
            url: contentType !== 'text' ? contentData : null    // Guardar URL o referencia si es multimedia
        };

        const updatedCourse = await course.save();
        res.json({ message: 'Contenido actualizado correctamente', course: updatedCourse });
    } catch (err) {
        debug('Error al actualizar contenido en el curso:', err);
        next(createError(500, 'Error al actualizar contenido en el curso'));
    }
};

// Eliminar contenido de un curso
exports.deleteContentFromCourse = async (req, res, next) => {
    try {
        const { courseId, contentId } = req.body;

        // Verificar si el curso existe
        const course = await Course.findById(courseId);
        if (!course) {
            debug(`Curso con ID ${courseId} no encontrado`);
            return next(createError(404, 'Curso no encontrado'));
        }

        // Buscar el contenido a eliminar
        const contentIndex = course.contentAndPuzzles.findIndex(item => item._id.toString() === contentId);
        if (contentIndex === -1) {
            debug(`Contenido con ID ${contentId} no encontrado`);
            return next(createError(404, 'Contenido no encontrado'));
        }

        // Eliminar el contenido
        course.contentAndPuzzles.splice(contentIndex, 1);

        const updatedCourse = await course.save();
        res.json({ message: 'Contenido eliminado correctamente', course: updatedCourse });
    } catch (err) {
        debug('Error al eliminar contenido del curso:', err);
        next(createError(500, 'Error al eliminar contenido del curso'));
    }
};

// Obtener todos los contenidos de un curso
exports.getAllContentFromCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);

        if (!course) {
            debug(`Curso con ID ${req.params.courseId} no encontrado`);
            return next(createError(404, 'Curso no encontrado'));
        }

        // Filtrar solo los contenidos (excluyendo los puzzles)
        const contents = course.contentAndPuzzles.filter(item => ['text', 'image', 'video'].includes(item.type));

        res.json({ contents });
    } catch (err) {
        debug('Error al obtener contenidos del curso:', err);
        next(createError(500, 'Error al obtener contenidos del curso'));
    }
};
