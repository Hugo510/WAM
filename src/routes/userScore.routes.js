const express = require('express');
const router = express.Router();
const userScoreController = require('../controllers/UserScoreController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas
router.get('/:userId/score', verifyToken, userScoreController.getUserScore);
router.put('/update-score', verifyToken, userScoreController.updateUserScore);
router.put('/reset-score', verifyToken, userScoreController.resetUserScore);

module.exports = router;
