const User = require('../models/user.model');
const Role = require('../models/role.model');
const debug = require('debug')('app:permissions');
const createError = require('http-errors');

// Middleware para verificar los permisos del usuario
exports.checkRole = (requiredPermissions) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id).populate('role');
            if (!user) {
                debug(`Usuario con ID ${req.user.id} no encontrado`);
                return next(createError(404, 'Usuario no encontrado'));
            }

            const userPermissions = user.role.permissions;

            // Verificar si el usuario tiene los permisos necesarios
            const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));

            if (!hasPermission) {
                debug(`Usuario con ID ${user._id} no tiene los permisos necesarios: ${requiredPermissions}`);
                return next(createError(403, 'No tienes permiso para realizar esta acción'));
            }

            next();
        } catch (err) {
            debug('Error al verificar los permisos del usuario:', err);
            next(createError(500, 'Error al verificar los permisos del usuario'));
        }
    };
};
