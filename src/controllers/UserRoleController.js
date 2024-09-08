const User = require('../models/user.model');
const Role = require('../models/role.model');
const debug = require('debug')('app:userRoles');
const createError = require('http-errors');

// Asignar un rol a un usuario
exports.assignRoleToUser = async (req, res, next) => {
    try {
        const { userId, roleId } = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            debug(`Usuario con ID ${userId} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }

        // Verificar si el rol existe
        const role = await Role.findById(roleId);
        if (!role) {
            debug(`Rol con ID ${roleId} no encontrado`);
            return next(createError(404, 'Rol no encontrado'));
        }

        // Asignar el rol al usuario
        user.role = role._id;
        const updatedUser = await user.save();

        res.json({ message: 'Rol asignado correctamente', user: updatedUser });
    } catch (err) {
        debug('Error al asignar el rol al usuario:', err);
        next(createError(500, 'Error al asignar el rol al usuario'));
    }
};

// Obtener el rol de un usuario
exports.getUserRole = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('role');
        if (!user) {
            debug(`Usuario con ID ${req.params.id} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }

        res.json({ role: user.role });
    } catch (err) {
        debug('Error al obtener el rol del usuario:', err);
        next(createError(500, 'Error al obtener el rol del usuario'));
    }
};

// Actualizar el rol de un usuario
exports.updateUserRole = async (req, res, next) => {
    try {
        const { roleId } = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(req.params.id);
        if (!user) {
            debug(`Usuario con ID ${req.params.id} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }

        // Verificar si el rol existe
        const role = await Role.findById(roleId);
        if (!role) {
            debug(`Rol con ID ${roleId} no encontrado`);
            return next(createError(404, 'Rol no encontrado'));
        }

        // Actualizar el rol del usuario
        user.role = role._id;
        const updatedUser = await user.save();

        res.json({ message: 'Rol actualizado correctamente', user: updatedUser });
    } catch (err) {
        debug('Error al actualizar el rol del usuario:', err);
        next(createError(500, 'Error al actualizar el rol del usuario'));
    }
};

// Eliminar un rol de un usuario (asignar rol predeterminado)
exports.removeUserRole = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            debug(`Usuario con ID ${req.params.id} no encontrado`);
            return next(createError(404, 'Usuario no encontrado'));
        }

        // Asignar el rol predeterminado (user) al usuario
        const defaultRole = await Role.findOne({ name: 'user' });
        if (!defaultRole) {
            debug('Rol predeterminado "user" no encontrado');
            return next(createError(500, 'Rol predeterminado no encontrado'));
        }

        user.role = defaultRole._id;
        const updatedUser = await user.save();

        res.json({ message: 'Rol eliminado correctamente, asignado rol predeterminado', user: updatedUser });
    } catch (err) {
        debug('Error al eliminar el rol del usuario:', err);
        next(createError(500, 'Error al eliminar el rol del usuario'));
    }
};
