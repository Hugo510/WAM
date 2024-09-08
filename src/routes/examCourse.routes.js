const express = require('express');
const router = express.Router();
const examController = require('../controllers/ExamCourseController');

// Rutas para manejar los exámenes de un curso
router.post('/course/exam', examController.addExamToCourse);                   // Agregar un examen a un curso
router.put('/course/exam', examController.updateExamInCourse);                 // Actualizar el examen de un curso
router.delete('/course/exam', examController.deleteExamFromCourse);            // Eliminar el examen de un curso
router.get('/course/:courseId/exam', examController.getExamByCourse);          // Obtener el examen de un curso

module.exports = router;
