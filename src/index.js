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
            console.log('La aplicación está escuchando en el puerto 3000');
        });
    })
    .catch((err) => {
        console.error('Error al conectar con la base de datos:', err);
        process.exit(1);
    });
