const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/UserRoleController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas
router.post('/assign', verifyToken, userRoleController.assignRoleToUser);
router.get('/:id/role', verifyToken, userRoleController.getUserRole);
router.put('/:id/role', verifyToken, userRoleController.updateUserRole);
router.delete('/:id/role', verifyToken, userRoleController.removeUserRole);

module.exports = router;
