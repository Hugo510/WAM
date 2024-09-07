const morgan = require('morgan');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const { errors } = require('celebrate');

// Rutas
/* const vendedorRoutes = require('./routes/vendedor.route'); */

const app = express();

// Implementar Helmet con configuración personalizada
/* app.use(helmet({
    contentSecurityPolicy: false, // Deshabilita CSP si lo necesitas, de lo contrario puedes configurarlo aquí
    frameguard: { action: 'deny' }, // X-Frame-Options: DENY
    hsts: {
        maxAge: 31536000, // 1 año en segundos
        includeSubDomains: true, // Aplica HSTS a subdominios
        preload: true // Añade al preload list
    },
    xssFilter: true, // X-XSS-Protection: 1; mode=block
    noSniff: true, // X-Content-Type-Options: nosniff
})); */

// Otros middlewares
const corsOptions = {
    origin: 'https://panaderia-admin.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200
};

app.use(cors());
app.use(hpp());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

// Limitar solicitudes para prevenir ataques de fuerza bruta
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 150, // límite de 150 solicitudes por IP
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

// Rutas aquí
/* app.use('/api/vendedores', vendedorRoutes);
 */

// Manejo de errores con Celebrate
app.use(errors());

// Middleware para manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
