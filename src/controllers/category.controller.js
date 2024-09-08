const Category = require('../models/category.model');
const debug = require('debug')('app:categories');
const createError = require('http-errors');

// Obtener todas las categorías
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        debug('Error al obtener todas las categorías:', err);
        next(createError(500, 'Error al obtener todas las categorías'));
    }
};

// Obtener una categoría por ID
exports.getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            debug(`Categoría con ID ${req.params.id} no encontrada`);
            return next(createError(404, 'Categoría no encontrada'));
        }
        res.json(category);
    } catch (err) {
        debug('Error al obtener categoría por ID:', err);
        next(createError(500, 'Error al obtener la categoría'));
    }
};

// Crear una nueva categoría
exports.createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const newCategory = new Category({
            name,
            description
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        debug('Error al crear una nueva categoría:', err);
        next(createError(500, 'Error al crear la categoría'));
    }
};

// Actualizar una categoría
exports.updateCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {
            name,
            description
        }, { new: true });

        if (!updatedCategory) {
            debug(`Categoría con ID ${req.params.id} no encontrada para actualizar`);
            return next(createError(404, 'Categoría no encontrada'));
        }
        res.json(updatedCategory);
    } catch (err) {
        debug('Error al actualizar la categoría:', err);
        next(createError(500, 'Error al actualizar la categoría'));
    }
};

// Eliminar una categoría
exports.deleteCategory = async (req, res, next) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            debug(`Categoría con ID ${req.params.id} no encontrada para eliminar`);
            return next(createError(404, 'Categoría no encontrada'));
        }
        res.json({ message: 'Categoría eliminada con éxito' });
    } catch (err) {
        debug('Error al eliminar la categoría:', err);
        next(createError(500, 'Error al eliminar la categoría'));
    }
};
