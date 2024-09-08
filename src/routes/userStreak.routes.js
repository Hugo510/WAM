const express = require('express');
const router = express.Router();
const userStreakController = require('../controllers/UserStreakController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas
router.get('/:userId/streak', verifyToken, userStreakController.getUserStreak);
router.put('/update-streak', verifyToken, userStreakController.updateUserStreak);
router.put('/reset-streak', verifyToken, userStreakController.resetUserStreak);

module.exports = router;
