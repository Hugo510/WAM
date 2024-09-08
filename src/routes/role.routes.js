const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas protegidas
router.get('/all', verifyToken, roleController.getAllRoles);
router.get('/:id', verifyToken, roleController.getRoleById);
router.post('/', verifyToken, roleController.createRole);
router.put('/:id', verifyToken, roleController.updateRole);
router.delete('/:id', verifyToken, roleController.deleteRole);

module.exports = router;
