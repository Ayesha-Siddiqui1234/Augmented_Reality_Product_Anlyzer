// src/features/cart/cartService.js

import axios from 'axios'

const API_URL = 'http://localhost:5000/api/cart'

const getAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
})

const getCart = async (token) => {
  const response = await axios.get(API_URL, getAuthConfig(token))
  return response.data.cart
}

const addToCart = async (productId, token) => {
    console.log("inside add to cart of cartservice.js",token,productId)
  const response = await axios.post(
    `${API_URL}/add`,
    { productId },
    getAuthConfig(token)
  )

  return response.data.cart
}

const increaseQuantity = async (productId, token) => {
  const response = await axios.patch(
    `${API_URL}/increase/${productId}`,
    {},
    getAuthConfig(token)
  )

  return response.data.cart
}

const decreaseQuantity = async (productId, token) => {
  const response = await axios.patch(
    `${API_URL}/decrease/${productId}`,
    {},
    getAuthConfig(token)
  )

  return response.data.cart
}

const removeFromCart = async (productId, token) => {
  const response = await axios.delete(
    `${API_URL}/remove/${productId}`,
    getAuthConfig(token)
  )

  return response.data.cart
}

const clearCart = async (token) => {
  const response = await axios.delete(
    `${API_URL}/clear`,
    getAuthConfig(token)
  )

  return response.data.cart
}

const cartService = {
  getCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
}

export default cartService