import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth'

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData)

  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
  }

  return response.data
}

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials)

  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
  }

  return response.data
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

const authService = {
  signup,
  login,
  logout,
}

export default authService