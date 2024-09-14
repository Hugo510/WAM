import { createSlice } from '@reduxjs/toolkit';
import { loginApi, registerApi } from '../../services/api';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        role: '', // admin o user
        achievements: [],
        score: 0,
        streak: 0,
        profilePicture: '',
        isAuthenticated: false,
        lastLogin: null,
        isLoading: false,
        error: null,
        isFirstTimeUser: true,  // Nueva propiedad para gestionar el flujo de onboarding
    },
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.achievements = action.payload.achievements;
            state.score = action.payload.score;
            state.streak = action.payload.streak;
            state.profilePicture = action.payload.profilePicture;
            state.lastLogin = action.payload.lastLogin;
            state.isFirstTimeUser = action.payload.isFirstTimeUser; // Importante que venga del backend
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        registerStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.isFirstTimeUser = action.payload.isFirstTimeUser; // Gestionar si es un nuevo usuario
        },
        registerFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.username = '';
            state.email = '';
            state.role = '';
            state.achievements = [];
            state.score = 0;
            state.streak = 0;
            state.profilePicture = '';
            state.lastLogin = null;
            state.isFirstTimeUser = true;  // Se reinicia el estado
        },
        completeOnboarding: (state) => {
            state.isFirstTimeUser = false; // Marca que el usuario completó el onboarding
        },
        updateAchievements: (state, action) => {
            state.achievements = action.payload.achievements;
        },
        updateScore: (state, action) => {
            state.score = action.payload.score;
        },
        updateStreak: (state, action) => {
            state.streak = action.payload.streak;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logout, completeOnboarding, updateAchievements, updateScore, updateStreak } = userSlice.actions;
export default userSlice.reducer;

// Async action for login
export const loginUser = ({ email, password }) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const response = await loginApi(email, password);
        if (response.success) {
            dispatch(loginSuccess(response.data.user));
        } else {
            dispatch(loginFailure('Invalid credentials'));
        }
    } catch (error) {
        dispatch(loginFailure('Login failed, please try again.'));
    }
};

// Async action for register
export const registerUser = ({ email, password }) => async (dispatch) => {
    dispatch(registerStart());
    try {
        const response = await registerApi(email, password);
        if (response.success) {
            dispatch(registerSuccess(response.data.user));
        } else {
            dispatch(registerFailure('Registration failed, please try again.'));
        }
    } catch (error) {
        dispatch(registerFailure('Registration failed, please try again.'));
    }
};