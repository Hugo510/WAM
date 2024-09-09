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

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logout, updateAchievements, updateScore, updateStreak } = userSlice.actions;
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