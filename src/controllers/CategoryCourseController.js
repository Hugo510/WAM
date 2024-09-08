const Category = require('../models/category.model');
const Course = require('../models/course.model');
const debug = require('debug')('app:categoryCourse');
const createError = require('http-errors');

// Obtener todos los cursos de una categoría específica
exports.getCoursesByCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;

        // Verificar si la categoría existe
        const category = await Category.findById(categoryId);
        if (!category) {
            debug(`Categoría con ID ${categoryId} no encontrada`);
            return next(createError(404, 'Categoría no encontrada'));
        }

        // Buscar todos los cursos relacionados con la categoría
        const courses = await Course.find({ category: categoryId }).populate('category');
        res.json(courses);
    } catch (err) {
        debug('Error al obtener cursos por categoría:', err);
        next(createError(500, 'Error al obtener los cursos de la categoría'));
    }
};

// Asignar una categoría a un curso
exports.assignCategoryToCourse = async (req, res, next) => {
    try {
        const { courseId, categoryId } = req.body;

        // Verificar si el curso existe
        const course = await Course.findById(courseId);
        if (!course) {
            debug(`Curso con ID ${courseId} no encontrado`);
            return next(createError(404, 'Curso no encontrado'));
        }

        // Verificar si la categoría existe
        const category = await Category.findById(categoryId);
        if (!category) {
            debug(`Categoría con ID ${categoryId} no encontrada`);
            return next(createError(404, 'Categoría no encontrada'));
        }

        // Asignar la categoría al curso
        course.category = categoryId;
        const updatedCourse = await course.save();

        res.json({ message: 'Categoría asignada correctamente', course: updatedCourse });
    } catch (err) {
        debug('Error al asignar categoría al curso:', err);
        next(createError(500, 'Error al asignar la categoría al curso'));
    }
};

// Eliminar la categoría de un curso
exports.removeCategoryFromCourse = async (req, res, next) => {
    try {
        const { courseId } = req.body;

        // Verificar si el curso existe
        const course = await Course.findById(courseId);
        if (!course) {
            debug(`Curso con ID ${courseId} no encontrado`);
            return next(createError(404, 'Curso no encontrado'));
        }

        // Eliminar la categoría
        course.category = null;
        const updatedCourse = await course.save();

        res.json({ message: 'Categoría eliminada del curso', course: updatedCourse });
    } catch (err) {
        debug('Error al eliminar la categoría del curso:', err);
        next(createError(500, 'Error al eliminar la categoría del curso'));
    }
};

// Obtener todas las categorías con sus respectivos cursos
exports.getCategoriesWithCourses = async (req, res, next) => {
    try {
        const categories = await Category.find();

        // Crear un array con categorías y sus respectivos cursos
        const categoriesWithCourses = await Promise.all(categories.map(async (category) => {
            const courses = await Course.find({ category: category._id });
            return { category, courses };
        }));

        res.json(categoriesWithCourses);
    } catch (err) {
        debug('Error al obtener categorías con cursos:', err);
        next(createError(500, 'Error al obtener categorías con cursos'));
    }
};
