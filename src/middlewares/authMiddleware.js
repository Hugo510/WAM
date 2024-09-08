const jwt = require('jsonwebtoken');
const debug = require('debug')('app:auth');
const createError = require('http-errors');

// Middleware para verificar token
exports.verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        debug('Token no proporcionado en la solicitud');
        return next(createError(401, 'No hay token, autorización denegada'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        debug('Error al verificar el token:', err);
        next(createError(400, 'Token no válido'));
    }
};
