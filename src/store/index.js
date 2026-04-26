// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import favoritesReducer from './favoritesSlice'
import authReducer from './authSlice'
import adminReducer from './adminSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    auth: authReducer,
    admin: adminReducer,
  },
})
