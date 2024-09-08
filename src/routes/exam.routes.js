const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas
router.get('/all', verifyToken, examController.getAllExams);
router.get('/:id', verifyToken, examController.getExamById);
router.post('/', verifyToken, examController.createExam);
router.put('/:id', verifyToken, examController.updateExam);
router.delete('/:id', verifyToken, examController.deleteExam);

module.exports = router;
