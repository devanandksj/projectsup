// src/Redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAsUser(state) {
      state.isAuthenticated = true;
    },
    loginAsAdmin(state) {
      state.isAdmin = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
  },
});

export const { loginAsUser, loginAsAdmin, logout } = authSlice.actions;
export default authSlice.reducer;
