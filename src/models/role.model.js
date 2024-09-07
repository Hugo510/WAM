const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },  // Nombre del rol (admin, user, etc.)
    permissions: [{ type: String }]  // Lista de permisos asociados al rol
});

module.exports = mongoose.model('Role', RoleSchema);