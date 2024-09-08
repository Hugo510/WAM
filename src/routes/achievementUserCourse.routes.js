const express = require('express');
const router = express.Router();
const achievementUserCourseController = require('../controllers/AchievementUserCourseController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas
router.post('/grant', verifyToken, achievementUserCourseController.grantAchievementForCourseCompletion);
router.get('/user/:userId', verifyToken, achievementUserCourseController.getAchievementsByUser);
router.get('/course/:courseId', verifyToken, achievementUserCourseController.getAchievementsByCourse);
router.delete('/delete', verifyToken, achievementUserCourseController.deleteAchievementFromUser);

module.exports = router;
