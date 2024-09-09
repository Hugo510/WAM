import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,  // Asegúrate de que el reducer 'user' esté en el store
    },
});
