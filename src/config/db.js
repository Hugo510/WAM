const mongoose = require('mongoose');
const debug = require('debug')('app:db');

// Función para conectar a la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        debug('Conectado a MongoDB Atlas');
    } catch (err) {
        debug('Error al conectar con la base de datos:', err);
        process.exit(1); // Cerrar el proceso si no se puede conectar a la base de datos
    }
};

module.exports = { connectDB };
