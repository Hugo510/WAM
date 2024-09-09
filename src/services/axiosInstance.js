import axios from 'axios';
import { getToken } from './storage';  // Usa localStorage o SecureStore dependiendo de la plataforma


// Crea una instancia de Axios con configuraciones comunes
const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.8:3000/api' /* process.env.URI */,  // URL base para todas las solicitudes
    timeout: 10000,  // Tiempo máximo de espera para las solicitudes
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token de autenticación en cada solicitud
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getToken();  // Obtener el token del almacenamiento local
        if (token) {
            config.headers['x-auth-token'] = token;  // Usar 'x-auth-token' según lo requerido por el backend
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de respuestas para manejar errores globalmente
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Manejo de errores global
        if (error.response && error.response.status === 401) {
            // Redirigir al login o mostrar un mensaje si el token ha expirado
            console.error('Token expirado o usuario no autenticado');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
