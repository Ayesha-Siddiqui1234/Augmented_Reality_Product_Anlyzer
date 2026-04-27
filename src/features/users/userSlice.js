import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import usersService from './userService'

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await usersService.getUsers(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch users'
      )
    }
  }
)

export const updateUserRole = createAsyncThunk(
  'users/updateUserRole',
  async ({ userId, role }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await usersService.updateUserRole(userId, role, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update role'
      )
    }
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      await usersService.deleteUser(userId, token)
      return userId
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete user'
      )
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearUsersError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (user) => user.id === action.payload.id
        )

        if (index !== -1) {
          state.items[index] = action.payload
        }
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (user) => user.id !== action.payload
        )
      })
  },
})

export const { clearUsersError } = usersSlice.actions

export default usersSlice.reducer

export const selectAllUsers = (state) => state.users.items
export const selectUsersLoading = (state) => state.users.loading
export const selectUsersError = (state) => state.users.error