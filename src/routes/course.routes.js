const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas
router.get('/all', verifyToken, courseController.getAllCourses);
router.get('/:id', verifyToken, courseController.getCourseById);
router.post('/', verifyToken, courseController.createCourse);
router.put('/:id', verifyToken, courseController.updateCourse);
router.delete('/:id', verifyToken, courseController.deleteCourse);

module.exports = router;
