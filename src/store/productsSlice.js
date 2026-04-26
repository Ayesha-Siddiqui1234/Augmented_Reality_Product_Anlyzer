// src/store/productsSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { products } from '../data/products'
import { categories } from '../data/categories'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: products,
    categories: categories,
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'default',
    currentProductId: null,
  },
  reducers: {
    setSearchQuery(state, action) { state.searchQuery = action.payload },
    setCategory(state, action)    { state.selectedCategory = action.payload },
    setSortBy(state, action)      { state.sortBy = action.payload },
    setCurrentProduct(state, action) { state.currentProductId = action.payload },
    addProduct(state, action)     { state.items.push(action.payload) },
    updateProduct(state, action) {
      const i = state.items.findIndex(p => p.id === action.payload.id)
      if (i !== -1) state.items[i] = action.payload
    },
    deleteProduct(state, action) {
      state.items = state.items.filter(p => p.id !== action.payload)
    },
  },
})

export const {
  setSearchQuery,
  setCategory,
  setSortBy,
  setCurrentProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions
export default productsSlice.reducer
