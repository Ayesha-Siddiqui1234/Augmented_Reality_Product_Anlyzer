// src/features/admin/adminProductSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/admin/products'

// Fetch all products (admin)
export const fetchAdminProducts = createAsyncThunk(
  'adminProducts/fetchAll',
  async ({ page = 1, limit = 10, search = '', category = '' }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        return thunkAPI.rejectWithValue('Not authenticated')
      }

      const response = await axios.get(API_URL, {
        params: { page, limit, search, category },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch products'
      )
    }
  }
)

// Get single product by ID
export const fetchProductById = createAsyncThunk(
  'adminProducts/fetchById',
  async (productId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch product'
      )
    }
  }
)

// Create new product
export const createProduct = createAsyncThunk(
  'adminProducts/create',
  async (productData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        return thunkAPI.rejectWithValue('Not authenticated')
      }

      const response = await axios.post(API_URL, productData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to create product'
      )
    }
  }
)

// Update product
export const updateProduct = createAsyncThunk(
  'adminProducts/update',
  async ({ productId, productData }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        return thunkAPI.rejectWithValue('Not authenticated')
      }

      const response = await axios.put(`${API_URL}/${productId}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update product'
      )
    }
  }
)

// Delete product
export const deleteProduct = createAsyncThunk(
  'adminProducts/delete',
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
        error.response?.data?.message || error.message || 'Failed to delete product'
      )
    }
  }
)

// Toggle product status
export const toggleProductStatus = createAsyncThunk(
  'adminProducts/toggleStatus',
  async (productId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        return thunkAPI.rejectWithValue('Not authenticated')
      }

      const response = await axios.patch(
        `${API_URL}/${productId}/toggle-status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to toggle product status'
      )
    }
  }
)

// Update product stock
export const updateProductStock = createAsyncThunk(
  'adminProducts/updateStock',
  async ({ productId, stock }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        return thunkAPI.rejectWithValue('Not authenticated')
      }

      const response = await axios.patch(
        `${API_URL}/${productId}/stock`,
        { stock },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update stock'
      )
    }
  }
)

const adminProductSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    products: [],
    currentProduct: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalProducts: 0,
      limit: 10
    },
    loading: false,
    error: null,
    successMessage: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.products
        state.pagination = action.payload.pagination
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products.unshift(action.payload)
        state.successMessage = 'Product created successfully'
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        const index = state.products.findIndex(p => p._id === action.payload._id)
        if (index !== -1) {
          state.products[index] = action.payload
        }
        state.currentProduct = action.payload
        state.successMessage = 'Product updated successfully'
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.products = state.products.filter(p => p._id !== action.payload)
        state.successMessage = 'Product deleted successfully'
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Toggle status
      .addCase(toggleProductStatus.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p._id === action.payload._id)
        if (index !== -1) {
          state.products[index] = action.payload
        }
        state.successMessage = `Product ${action.payload.isActive ? 'activated' : 'deactivated'}`
      })

      // Update stock
      .addCase(updateProductStock.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p._id === action.payload._id)
        if (index !== -1) {
          state.products[index] = action.payload
        }
        state.successMessage = 'Stock updated successfully'
      })
  }
})

export const { clearError, clearSuccessMessage, clearCurrentProduct } = adminProductSlice.actions

export default adminProductSlice.reducer

// Selectors
export const selectAdminProducts = (state) => state.adminProducts.products
export const selectCurrentProduct = (state) => state.adminProducts.currentProduct
export const selectAdminProductsLoading = (state) => state.adminProducts.loading
export const selectAdminProductsError = (state) => state.adminProducts.error
export const selectAdminProductsSuccess = (state) => state.adminProducts.successMessage
export const selectAdminProductsPagination = (state) => state.adminProducts.pagination
