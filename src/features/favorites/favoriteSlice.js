import { createSlice } from '@reduxjs/toolkit'
import { favorites } from '../../data/favorites.js'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: favorites,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const { userId, productId } = action.payload

      const existingFavorite = state.items.find(
        (favorite) =>
          favorite.userId === userId && favorite.productId === productId
      )

      if (existingFavorite) {
        state.items = state.items.filter(
          (favorite) =>
            !(
              favorite.userId === userId &&
              favorite.productId === productId
            )
        )
      } else {
        state.items.push({
          id: crypto.randomUUID(),
          userId,
          productId,
          createdAt: new Date().toISOString(),
        })
      }
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions

export default favoritesSlice.reducer

export const selectFavoritesByUser = (state, userId) =>
  state.favorites.items.filter((favorite) => favorite.userId === userId)

export const selectFavoriteProductsByUser = (state, userId) =>
  state.favorites.items
    .filter((favorite) => favorite.userId === userId)
    .map((favorite) =>
      state.products.items.find((product) => product.id === favorite.productId)
    )
    .filter(Boolean)

export const selectIsFavoriteByUser = (state, userId, productId) =>
  state.favorites.items.some(
    (favorite) =>
      favorite.userId === userId && favorite.productId === productId
  )