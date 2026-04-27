import { createSlice } from '@reduxjs/toolkit'
import { categories } from '../../data/categories.js'

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: categories,
  },
  reducers: {
    addCategory: (state, action) => {
      state.items.push(action.payload)
    },

    updateCategory: (state, action) => {
      const index = state.items.findIndex(
        (category) => category.id === action.payload.id
      )

      if (index !== -1) {
        state.items[index] = action.payload
      }
    },

    deleteCategory: (state, action) => {
      state.items = state.items.filter(
        (category) => category.id !== action.payload
      )
    },
  },
})

export const {
  addCategory,
  updateCategory,
  deleteCategory,
} = categoriesSlice.actions

export default categoriesSlice.reducer

export const selectAllCategories = (state) => state.categories.items

export const selectCategoryByKey = (state, key) =>
  state.categories.items.find((category) => category.key === key)