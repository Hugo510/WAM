const express = require('express');
const router = express.Router();
const puzzleController = require('../controllers/puzzle.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas
router.get('/all', verifyToken, puzzleController.getAllPuzzles);
router.get('/:id', verifyToken, puzzleController.getPuzzleById);
router.post('/', verifyToken, puzzleController.createPuzzle);
router.put('/:id', verifyToken, puzzleController.updatePuzzle);
router.delete('/:id', verifyToken, puzzleController.deletePuzzle);

module.exports = router;
