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

// Toggle favorite (add or remove) with optimistic updates
export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async ({ productId, product }, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      const favoriteItem = state.favorites.items.find(
        fav => (fav.product?._id || fav.product?.id) === productId
      )
      const isFavorite = !!favoriteItem

      if (isFavorite) {
        // Optimistically remove from UI immediately
        thunkAPI.dispatch(optimisticRemoveFavorite(productId))
        
        try {
          // Then make the API call
          await thunkAPI.dispatch(removeFromFavorites(productId)).unwrap()
          return { action: 'removed', productId }
        } catch (error) {
          // Rollback on error - restore the item
          thunkAPI.dispatch(rollbackOptimisticUpdate({ 
            productId, 
            wasAdding: false, 
            previousItem: favoriteItem 
          }))
          throw error
        }
      } else {
        // Optimistically add to UI immediately
        thunkAPI.dispatch(optimisticAddFavorite({ productId, product }))
        
        try {
          // Then make the API call
          await thunkAPI.dispatch(addToFavorites(productId)).unwrap()
          return { action: 'added', productId }
        } catch (error) {
          // Rollback on error - remove the optimistic item
          thunkAPI.dispatch(rollbackOptimisticUpdate({ 
            productId, 
            wasAdding: true 
          }))
          throw error
        }
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
    // Optimistic add - immediately add to UI
    optimisticAddFavorite: (state, action) => {
      const { productId, product } = action.payload
      // Add temporary favorite item
      state.items.push({
        product: product || { _id: productId, id: productId },
        _id: `temp-${productId}`,
        isOptimistic: true
      })
    },
    // Optimistic remove - immediately remove from UI
    optimisticRemoveFavorite: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(
        fav => (fav.product?._id || fav.product?.id) !== productId
      )
    },
    // Rollback optimistic update on error
    rollbackOptimisticUpdate: (state, action) => {
      const { productId, wasAdding, previousItem } = action.payload
      if (wasAdding) {
        // Remove the optimistic item
        state.items = state.items.filter(
          fav => (fav.product?._id || fav.product?.id) !== productId
        )
      } else if (previousItem) {
        // Restore the removed item
        state.items.push(previousItem)
      }
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
        // Don't set loading to true - we're using optimistic updates
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false
        // Replace optimistic item with real data from server
        const productId = action.payload.product?._id || action.payload.product?.id
        const optimisticIndex = state.items.findIndex(
          fav => fav.isOptimistic && (fav.product?._id || fav.product?.id) === productId
        )
        if (optimisticIndex !== -1) {
          state.items[optimisticIndex] = action.payload
        } else {
          // If not found, just add it
          state.items.push(action.payload)
        }
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Remove from favorites
      .addCase(removeFromFavorites.pending, (state) => {
        // Don't set loading to true - we're using optimistic updates
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false
        // Already removed optimistically, just ensure it's gone
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

export const { clearFavoriteError, optimisticAddFavorite, optimisticRemoveFavorite, rollbackOptimisticUpdate } = favoritesSlice.actions

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