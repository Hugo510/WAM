const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievement.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas
router.get('/all', verifyToken, achievementController.getAllAchievements);
router.get('/:id', verifyToken, achievementController.getAchievementById);
router.post('/', verifyToken, achievementController.createAchievement);
router.put('/:id', verifyToken, achievementController.updateAchievement);
router.delete('/:id', verifyToken, achievementController.deleteAchievement);

module.exports = router;
