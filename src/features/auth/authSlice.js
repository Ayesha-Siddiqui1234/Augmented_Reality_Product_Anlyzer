import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const savedUser = JSON.parse(localStorage.getItem('user'))
const savedToken = localStorage.getItem('token')

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, thunkAPI) => {
    try {
      console.log('inside sign up of authslice.js', userData)
      return await authService.signup(userData)
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Signup failed'

      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      return await authService.login(credentials)
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Login failed'

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await authService.logout()
      return true
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Logout failed'

      return thunkAPI.rejectWithValue(message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedUser || null,
    token: savedToken || null,
    isAuthenticated: !!savedToken,
    loading: false,
    error: null,
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.loading = false
        state.error = null
      })
  },
})

export const { clearAuthError } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectAuthToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error