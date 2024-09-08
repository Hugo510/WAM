const Puzzle = require('../models/puzzle.model');
const debug = require('debug')('app:puzzles');
const createError = require('http-errors');

// Obtener todos los puzzles
exports.getAllPuzzles = async (req, res, next) => {
    try {
        const puzzles = await Puzzle.find();
        res.json(puzzles);
    } catch (err) {
        debug('Error al obtener todos los puzzles:', err);
        next(createError(500, 'Error al obtener los puzzles'));
    }
};

// Obtener un puzzle por ID
exports.getPuzzleById = async (req, res, next) => {
    try {
        const puzzle = await Puzzle.findById(req.params.id);
        if (!puzzle) {
            debug(`Puzzle con ID ${req.params.id} no encontrado`);
            return next(createError(404, 'Puzzle no encontrado'));
        }
        res.json(puzzle);
    } catch (err) {
        debug('Error al obtener el puzzle por ID:', err);
        next(createError(500, 'Error al obtener el puzzle'));
    }
};

// Crear un nuevo puzzle
exports.createPuzzle = async (req, res, next) => {
    try {
        const { type, question, options, correctAnswer } = req.body;

        const newPuzzle = new Puzzle({
            type,
            question,
            options,
            correctAnswer
        });

        const savedPuzzle = await newPuzzle.save();
        res.status(201).json(savedPuzzle);
    } catch (err) {
        debug('Error al crear un nuevo puzzle:', err);
        next(createError(500, 'Error al crear el puzzle'));
    }
};

// Actualizar un puzzle
exports.updatePuzzle = async (req, res, next) => {
    try {
        const { type, question, options, correctAnswer } = req.body;
        const updatedPuzzle = await Puzzle.findByIdAndUpdate(req.params.id, {
            type,
            question,
            options,
            correctAnswer
        }, { new: true });

        if (!updatedPuzzle) {
            debug(`Puzzle con ID ${req.params.id} no encontrado para actualizar`);
            return next(createError(404, 'Puzzle no encontrado'));
        }
        res.json(updatedPuzzle);
    } catch (err) {
        debug('Error al actualizar el puzzle:', err);
        next(createError(500, 'Error al actualizar el puzzle'));
    }
};

// Eliminar un puzzle
exports.deletePuzzle = async (req, res, next) => {
    try {
        const deletedPuzzle = await Puzzle.findByIdAndDelete(req.params.id);
        if (!deletedPuzzle) {
            debug(`Puzzle con ID ${req.params.id} no encontrado para eliminar`);
            return next(createError(404, 'Puzzle no encontrado'));
        }
        res.json({ message: 'Puzzle eliminado con éxito' });
    } catch (err) {
        debug('Error al eliminar el puzzle:', err);
        next(createError(500, 'Error al eliminar el puzzle'));
    }
};
