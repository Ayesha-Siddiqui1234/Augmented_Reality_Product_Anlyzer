// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role: null,
    isLoggedIn: false,
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user
      state.role = action.payload.role
      state.isLoggedIn = true
    },
    logout(state) {
      state.user = null
      state.role = null
      state.isLoggedIn = false
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
