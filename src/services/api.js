import axiosInstance from './axiosInstance';
import { saveToken } from './storage';  // Importa la instancia configurada de Axios

export const loginApi = async (email, password) => {
    try {
        const response = await axiosInstance.post('/users/login', { email, password });
        if (response.data.token) {
            await saveToken(response.data.token);  // Guardar token si es necesario
        }
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Función para registrar un usuario usando la instancia de Axios
export const registerApi = async (email, password) => {
    try {
        const response = await axiosInstance.post('/users/register', { email, password });
        console.log(response);  // Para depuración
        if (response.data.token) {
            await saveToken(response.data.token);  // Guardar token si es necesario
        }
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const getCoursesApi = async () => {
    try {
        const response = await axiosInstance.get('/courses');
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
