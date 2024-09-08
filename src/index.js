// Asegúrate de que esto sea lo primero en ejecutarse para cargar las variables de entorno
require('dotenv').config();

const debug = require('debug')('app:server');
const app = require('./app');
const { connectDB } = require('./config/db');

// Iniciar la conexión a la base de datos y luego el servidor
connectDB()
    .then(() => {
        app.listen(3000, () => {
            debug('La aplicación está escuchando en el puerto 3000');
        });
    })
    .catch((err) => {
        debug('Error al conectar con la base de datos:', err);
        process.exit(1); // Cerrar el proceso si no se puede conectar a la base de datos
    });
