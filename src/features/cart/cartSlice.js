// import { createSlice } from '@reduxjs/toolkit'

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const { userId, product } = action.payload

//       const existingItem = state.items.find(
//         (item) =>
//           item.userId === userId && item.productId === product.id
//       )

//       if (existingItem) {
//         // Check if quantity is less than stock before increasing
//         if (existingItem.quantity < product.stock) {
//           existingItem.quantity += 1
//         }
//       } else {
//         // Add new item only if stock is available
//         if (product.stock > 0) {
//           state.items.push({
//             userId,
//             productId: product.id,
//             name: product.name,
//             price: product.price,
//             imageUrl: product.imageUrl,
//             quantity: 1,
//             stock: product.stock, // Store stock info
//           })
//         }
//       }
//     },

//     removeFromCart: (state, action) => {
//       const { userId, productId } = action.payload

//       state.items = state.items.filter(
//         (item) =>
//           !(item.userId === userId && item.productId === productId)
//       )
//     },

//     increaseQuantity: (state, action) => {
//       const { userId, productId, stock } = action.payload

//       const item = state.items.find(
//         (item) =>
//           item.userId === userId && item.productId === productId
//       )

//       if (item) {
//         // Only increase if quantity is less than stock
//         if (item.quantity < stock) {
//           item.quantity += 1
//         }
//       }
//     },

//     decreaseQuantity: (state, action) => {
//       const { userId, productId } = action.payload

//       const item = state.items.find(
//         (item) =>
//           item.userId === userId && item.productId === productId
//       )

//       if (item && item.quantity > 1) {
//         item.quantity -= 1
//       } else {
//         state.items = state.items.filter(
//           (item) =>
//             !(item.userId === userId && item.productId === productId)
//         )
//       }
//     },

//     clearCart: (state, action) => {
//       const userId = action.payload

//       state.items = state.items.filter(
//         (item) => item.userId !== userId
//       )
//     },
//   },
// })

// export const {
//   addToCart,
//   removeFromCart,
//   increaseQuantity,
//   decreaseQuantity,
//   clearCart,
// } = cartSlice.actions

// export default cartSlice.reducer

// export const selectCartItemsByUser = (state, userId) =>
//   state.cart.items.filter((item) => item.userId === userId)

// export const selectCartCountByUser = (state, userId) =>
//   state.cart.items
//     .filter((item) => item.userId === userId)
//     .reduce((total, item) => total + item.quantity, 0)

// export const selectCartTotalByUser = (state, userId) =>
//   state.cart.items
//     .filter((item) => item.userId === userId)
//     .reduce((total, item) => total + item.price * item.quantity, 0)




// src/features/cart/cartSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService'

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await cartService.getCart(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch cart'
      )
    }
  }
)

export const addProductToCart = createAsyncThunk(

  'cart/addProductToCart',
  async (productId, thunkAPI) => {
    try {
      console.log("inside addrducttocart inde cart sice.js")
      const token = thunkAPI.getState().auth.token
      console.log("token inside cart slice.js",token)
      return await cartService.addToCart(productId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to add product to cart'
      )
    }
  }
)

export const increaseCartQuantity = createAsyncThunk(
  'cart/increaseCartQuantity',
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await cartService.increaseQuantity(productId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to increase quantity'
      )
    }
  }
)

export const decreaseCartQuantity = createAsyncThunk(
  'cart/decreaseCartQuantity',
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await cartService.decreaseQuantity(productId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to decrease quantity'
      )
    }
  }
)

export const removeProductFromCart = createAsyncThunk(
  'cart/removeProductFromCart',
  async (productId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await cartService.removeFromCart(productId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to remove product'
      )
    }
  }
)

export const clearUserCart = createAsyncThunk(
  'cart/clearUserCart',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token
      return await cartService.clearCart(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to clear cart'
      )
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    summary: {
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {
    resetCart: (state) => {
      state.items = []
      state.summary = {
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
      }
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    const pendingHandler = (state) => {
      state.loading = true
      state.error = null
    }

    const fulfilledHandler = (state, action) => {
      state.loading = false
      state.items = action.payload?.items || []
      state.summary = action.payload?.summary || {
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
      }
    }

    const rejectedHandler = (state, action) => {
      state.loading = false
      state.error = action.payload
    }

    builder
      .addCase(fetchCart.pending, pendingHandler)
      .addCase(fetchCart.fulfilled, fulfilledHandler)
      .addCase(fetchCart.rejected, rejectedHandler)

      .addCase(addProductToCart.pending, pendingHandler)
      .addCase(addProductToCart.fulfilled, fulfilledHandler)
      .addCase(addProductToCart.rejected, rejectedHandler)

      .addCase(increaseCartQuantity.pending, pendingHandler)
      .addCase(increaseCartQuantity.fulfilled, fulfilledHandler)
      .addCase(increaseCartQuantity.rejected, rejectedHandler)

      .addCase(decreaseCartQuantity.pending, pendingHandler)
      .addCase(decreaseCartQuantity.fulfilled, fulfilledHandler)
      .addCase(decreaseCartQuantity.rejected, rejectedHandler)

      .addCase(removeProductFromCart.pending, pendingHandler)
      .addCase(removeProductFromCart.fulfilled, fulfilledHandler)
      .addCase(removeProductFromCart.rejected, rejectedHandler)

      .addCase(clearUserCart.pending, pendingHandler)
      .addCase(clearUserCart.fulfilled, fulfilledHandler)
      .addCase(clearUserCart.rejected, rejectedHandler)
  },
})

export const { resetCart } = cartSlice.actions

export default cartSlice.reducer

export const selectCartItems = (state) => state.cart.items
export const selectCartSummary = (state) => state.cart.summary
export const selectCartLoading = (state) => state.cart.loading
export const selectCartError = (state) => state.cart.error
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)