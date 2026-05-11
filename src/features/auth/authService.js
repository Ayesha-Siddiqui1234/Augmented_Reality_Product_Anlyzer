// // Mock Authentication Service
// // TODO: Replace with actual API calls when backend is ready

// const API_URL = 'http://localhost:5000/api/auth'

// // Simulate API delay
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// const signup = async (userData) => {
//   await delay(800) // Simulate network delay
  
//   // Mock validation
//   const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
//   const userExists = existingUsers.find(u => u.email === userData.email)
  
//   if (userExists) {
//     throw new Error('User with this email already exists')
//   }
  
//   // Create mock user
//   const newUser = {
//     id: Date.now().toString(),
//     name: userData.name,
//     email: userData.email,
//     phone: userData.phone,
//     createdAt: new Date().toISOString()
//   }
  
//   // Store user
//   existingUsers.push({ ...newUser, password: userData.password })
//   localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
  
//   // Generate mock token
//   const token = `mock_token_${newUser.id}_${Date.now()}`
  
//   // Store auth data
//   localStorage.setItem('token', token)
//   localStorage.setItem('user', JSON.stringify(newUser))
  
//   return {
//     user: newUser,
//     token,
//     message: 'Signup successful'
//   }
// }

// const login = async (credentials) => {
//   await delay(800) // Simulate network delay
  
//   // Mock validation
//   const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
//   const user = existingUsers.find(
//     u => u.email === credentials.email && u.password === credentials.password
//   )
  
//   if (!user) {
//     throw new Error('Invalid email or password')
//   }
  
//   // Create user object without password
//   const { password, ...userWithoutPassword } = user
  
//   // Generate mock token
//   const token = `mock_token_${user.id}_${Date.now()}`
  
//   // Store auth data
//   localStorage.setItem('token', token)
//   localStorage.setItem('user', JSON.stringify(userWithoutPassword))
  
//   return {
//     user: userWithoutPassword,
//     token,
//     message: 'Login successful'
//   }
// }

// const logout = () => {
//   localStorage.removeItem('token')
//   localStorage.removeItem('user')
// }

// const authService = {
//   signup,
//   login,
//   logout,
// }

// export default authService









// src/features/auth/authService.js

import axios from 'axios'
import { API_ENDPOINTS } from '../../config/api'

const API_URL = API_ENDPOINTS.AUTH

const signup = async (userData) => {
  console.log("inside auth servce.js",userData)
  console.log("insdie sign up of auth service.js")
  const response = await axios.post(`${API_URL}/signup`, userData, {
    withCredentials: true,
  })

  if (response.data.accessToken) {
    localStorage.setItem('token', response.data.accessToken)
    localStorage.setItem('user', JSON.stringify(response.data.user))
  }

  return {
    user: response.data.user,
    token: response.data.accessToken,
    message: response.data.message,
  }
}

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials, {
    withCredentials: true,
  })

  if (response.data.accessToken) {
    localStorage.setItem('token', response.data.accessToken)
    localStorage.setItem('user', JSON.stringify(response.data.user))
  }

  return {
    user: response.data.user,
    token: response.data.accessToken,
    message: response.data.message,
  }
}

const logout = async () => {
  await axios.post(`${API_URL}/logout`, {}, {
    withCredentials: true,
  })

  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

const authService = {
  signup,
  login,
  logout,
}

export default authService