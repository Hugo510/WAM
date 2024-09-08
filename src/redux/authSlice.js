import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        userRole: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.userRole = action.payload.role;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userRole = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
