const express = require('express');
const router = express.Router();
const categoryCourseController = require('../controllers/CategoryCourseController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas
router.get('/:categoryId/courses', verifyToken, categoryCourseController.getCoursesByCategory);
router.post('/assign', verifyToken, categoryCourseController.assignCategoryToCourse);
router.post('/remove', verifyToken, categoryCourseController.removeCategoryFromCourse);
router.get('/all-with-courses', verifyToken, categoryCourseController.getCategoriesWithCourses);

module.exports = router;
