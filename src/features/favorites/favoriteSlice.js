import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/favorites'

// Fetch user's favorites from backend
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        return thunkAPI.rejectWithValue('Not authenticated')
      }

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data.data.favorites || []
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch favorites'
      )
    }
  }
)

// Add product to favorites
export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorites',
  async (productId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        return thunkAPI.rejectWithValue('Not authenticated')
      }

      const response = await axios.post(
        API_URL,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to add to favorites'
      )
    }
  }
)

// Remove product from favorites
export const removeFromFavorites = createAsyncThunk(
  'favorites/removeFromFavorites',
  async (productId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        return thunkAPI.rejectWithValue('Not authenticated')
      }

      await axios.delete(`${API_URL}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return productId
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to remove from favorites'
      )
    }
  }
)

// Toggle favorite (add or remove)
export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async ({ productId }, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      const isFavorite = state.favorites.items.some(
        fav => (fav.product?._id || fav.product?.id) === productId
      )

      if (isFavorite) {
        await thunkAPI.dispatch(removeFromFavorites(productId))
        return { action: 'removed', productId }
      } else {
        await thunkAPI.dispatch(addToFavorites(productId))
        return { action: 'added', productId }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearFavoriteError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Add to favorites
      .addCase(addToFavorites.pending, (state) => {
        state.loading = true
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false
        state.items.push(action.payload)
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Remove from favorites
      .addCase(removeFromFavorites.pending, (state) => {
        state.loading = true
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter(
          fav => (fav.product?._id || fav.product?.id) !== action.payload
        )
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearFavoriteError } = favoritesSlice.actions

export default favoritesSlice.reducer

// Selectors
export const selectAllFavorites = (state) => state.favorites.items

export const selectFavoritesLoading = (state) => state.favorites.loading

export const selectFavoritesError = (state) => state.favorites.error

export const selectFavoriteProducts = (state) =>
  state.favorites.items.map(fav => fav.product).filter(Boolean)

export const selectIsFavorite = (state, productId) =>
  state.favorites.items.some(
    fav => (fav.product?._id || fav.product?.id) === productId
  )

// Legacy selectors for backward compatibility
export const selectFavoritesByUser = (state) => state.favorites.items

export const selectFavoriteProductsByUser = (state) =>
  state.favorites.items.map(fav => fav.product).filter(Boolean)

export const selectIsFavoriteByUser = (state, userId, productId) =>
  state.favorites.items.some(
    fav => (fav.product?._id || fav.product?.id) === productId
  )