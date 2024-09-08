const express = require('express');
const router = express.Router();
const courseContentController = require('../controllers/ContentCourseController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas
router.post('/add', verifyToken, courseContentController.addContentToCourse);
router.put('/update', verifyToken, courseContentController.updateContentInCourse);
router.delete('/delete', verifyToken, courseContentController.deleteContentFromCourse);
router.get('/:courseId/content', verifyToken, courseContentController.getAllContentFromCourse);

module.exports = router;
