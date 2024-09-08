const morgan = require('morgan');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const { errors } = require('celebrate');

// Rutas
const achievementRoutes = require('./routes/achievement.routes');
const achievementUserCourseRoutes = require('./routes/achievementUserCourse.routes');
const categoryRoutes = require('./routes/category.routes');
const categoryCourseRoutes = require('./routes/categoryCourse.routes');
const courseRoutes = require('./routes/course.routes');
const courseContentRoutes = require('./routes/courseContent.routes');
const courseExamRoutes = require('./routes/courseExam.routes');
const examRoutes = require('./routes/exam.routes');
const examCourseRoutes = require('./routes/examCourse.routes');
const puzzleRoutes = require('./routes/puzzle.routes');
const roleRoutes = require('./routes/role.routes');
const userRoutes = require('./routes/user.routes');
const userRoleRoutes = require('./routes/userRole.routes');
const userScoreRoutes = require('./routes/userScore.routes');
const userStreakRoutes = require('./routes/userStreak.routes');

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
/* const corsOptions = {
    origin: 'https://panaderia-admin.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200
}; */

app.use(cors());
app.use(hpp());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Error del servidor';
    debug('Manejo de error:', err.stack);

    res.status(statusCode).json({
        status: statusCode,
        message: message,
    });
});

// Limitar solicitudes para prevenir ataques de fuerza bruta
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 150, // límite de 150 solicitudes por IP
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

// Rutas aquí
app.use('/api/achievements', achievementRoutes);
app.use('/api/achievementUserCourse', achievementUserCourseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/categoryCourse', categoryCourseRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/courseContent', courseContentRoutes);
app.use('/api/courseExam', courseExamRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/examCourse', examCourseRoutes);
app.use('/api/puzzles', puzzleRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/userRoles', userRoleRoutes);
app.use('/api/userScores', userScoreRoutes);
app.use('/api/userStreaks', userStreakRoutes);

// Manejo de errores con Celebrate
app.use(errors());

// Middleware para manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
