// src/store/favoritesSlice.js
// YOUR FILE — Member 2 owns this

import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { ids: [] },
  reducers: {
    addFavorite(state, action) {
      if (!state.ids.includes(action.payload))
        state.ids.push(action.payload)
    },
    removeFavorite(state, action) {
      state.ids = state.ids.filter(id => id !== action.payload)
    },
    toggleFavorite(state, action) {
      const id = action.payload
      state.ids.includes(id)
        ? (state.ids = state.ids.filter(fid => fid !== id))
        : state.ids.push(id)
    },
  },
})

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
