import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users'

const getAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

const getUsers = async (token) => {
  const response = await axios.get(API_URL, getAuthConfig(token))
  return response.data
}

const updateUserRole = async (userId, role, token) => {
  const response = await axios.patch(
    `${API_URL}/${userId}/role`,
    { role },
    getAuthConfig(token)
  )

  return response.data
}

const deleteUser = async (userId, token) => {
  await axios.delete(`${API_URL}/${userId}`, getAuthConfig(token))
}

const usersService = {
  getUsers,
  updateUserRole,
  deleteUser,
}

export default usersService