import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { userId, product } = action.payload

      const existingItem = state.items.find(
        (item) =>
          item.userId === userId && item.productId === product.id
      )

      if (existingItem) {
        // Check if quantity is less than stock before increasing
        if (existingItem.quantity < product.stock) {
          existingItem.quantity += 1
        }
      } else {
        // Add new item only if stock is available
        if (product.stock > 0) {
          state.items.push({
            userId,
            productId: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
            stock: product.stock, // Store stock info
          })
        }
      }
    },

    removeFromCart: (state, action) => {
      const { userId, productId } = action.payload

      state.items = state.items.filter(
        (item) =>
          !(item.userId === userId && item.productId === productId)
      )
    },

    increaseQuantity: (state, action) => {
      const { userId, productId, stock } = action.payload

      const item = state.items.find(
        (item) =>
          item.userId === userId && item.productId === productId
      )

      if (item) {
        // Only increase if quantity is less than stock
        if (item.quantity < stock) {
          item.quantity += 1
        }
      }
    },

    decreaseQuantity: (state, action) => {
      const { userId, productId } = action.payload

      const item = state.items.find(
        (item) =>
          item.userId === userId && item.productId === productId
      )

      if (item && item.quantity > 1) {
        item.quantity -= 1
      } else {
        state.items = state.items.filter(
          (item) =>
            !(item.userId === userId && item.productId === productId)
        )
      }
    },

    clearCart: (state, action) => {
      const userId = action.payload

      state.items = state.items.filter(
        (item) => item.userId !== userId
      )
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer

export const selectCartItemsByUser = (state, userId) =>
  state.cart.items.filter((item) => item.userId === userId)

export const selectCartCountByUser = (state, userId) =>
  state.cart.items
    .filter((item) => item.userId === userId)
    .reduce((total, item) => total + item.quantity, 0)

export const selectCartTotalByUser = (state, userId) =>
  state.cart.items
    .filter((item) => item.userId === userId)
    .reduce((total, item) => total + item.price * item.quantity, 0)