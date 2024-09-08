const Role = require('../models/role.model');
const debug = require('debug')('app:roles');
const createError = require('http-errors');

// Obtener todos los roles
exports.getAllRoles = async (req, res, next) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        debug('Error al obtener todos los roles:', err);
        next(createError(500, 'Error al obtener los roles'));
    }
};

// Obtener un rol por ID
exports.getRoleById = async (req, res, next) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            debug(`Rol con ID ${req.params.id} no encontrado`);
            return next(createError(404, 'Rol no encontrado'));
        }
        res.json(role);
    } catch (err) {
        debug('Error al obtener el rol por ID:', err);
        next(createError(500, 'Error al obtener el rol'));
    }
};

// Crear un nuevo rol
exports.createRole = async (req, res, next) => {
    try {
        const { name, permissions } = req.body;
        const newRole = new Role({ name, permissions });
        const savedRole = await newRole.save();
        res.status(201).json(savedRole);
    } catch (err) {
        debug('Error al crear un nuevo rol:', err);
        next(createError(500, 'Error al crear el rol'));
    }
};

// Actualizar un rol
exports.updateRole = async (req, res, next) => {
    try {
        const { name, permissions } = req.body;
        const updatedRole = await Role.findByIdAndUpdate(req.params.id, { name, permissions }, { new: true });
        if (!updatedRole) {
            debug(`Rol con ID ${req.params.id} no encontrado para actualizar`);
            return next(createError(404, 'Rol no encontrado'));
        }
        res.json(updatedRole);
    } catch (err) {
        debug('Error al actualizar el rol:', err);
        next(createError(500, 'Error al actualizar el rol'));
    }
};

// Eliminar un rol
exports.deleteRole = async (req, res, next) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            debug(`Rol con ID ${req.params.id} no encontrado para eliminar`);
            return next(createError(404, 'Rol no encontrado'));
        }
        res.json({ message: 'Rol eliminado con éxito' });
    } catch (err) {
        debug('Error al eliminar el rol:', err);
        next(createError(500, 'Error al eliminar el rol'));
    }
};
