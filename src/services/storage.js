import * as SecureStore from 'expo-secure-store';

// Función para guardar el token en SecureStore
export const saveToken = async (token) => {
    try {
        await SecureStore.setItemAsync('token', token);
    } catch (error) {
        console.error('Error al guardar el token en SecureStore:', error);
    }
};

// Función para obtener el token almacenado en SecureStore
export const getToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');
        return token;
    } catch (error) {
        console.error('Error al obtener el token de SecureStore:', error);
        return null;
    }
};

// Función para eliminar el token (por ejemplo, en logout)
export const deleteToken = async () => {
    try {
        await SecureStore.deleteItemAsync('token');
    } catch (error) {
        console.error('Error al eliminar el token de SecureStore:', error);
    }
};
