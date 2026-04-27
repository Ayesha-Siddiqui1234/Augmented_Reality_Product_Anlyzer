import { configureStore } from '@reduxjs/toolkit'

import productsReducer from '../features/products/productSlice.js'
import categoriesReducer from '../features/categories/categorySlice.js'
import favoritesReducer from '../features/favorites/favoriteSlice.js'
import cartReducer from '../features/cart/cartSlice.js'
import usersReducer from '../features/users/userSlice.js'
// import adminReducer from '../features/admin/adminSlice.js'
import authReducer from '../features/auth/authSlice.js'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    users: usersReducer,
    // admin: adminReducer,
  },
})