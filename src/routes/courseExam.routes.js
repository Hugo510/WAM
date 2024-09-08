const express = require('express');
const router = express.Router();
const courseExamController = require('../controllers/ExamCourseController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas
router.post('/add', verifyToken, courseExamController.addExamToCourse);
router.put('/update', verifyToken, courseExamController.updateExamInCourse);
router.delete('/delete', verifyToken, courseExamController.deleteExamFromCourse);
router.get('/:courseId/exam', verifyToken, courseExamController.getExamByCourse);

module.exports = router;
