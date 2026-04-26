// src/routes/ProtectedRoute.jsx
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, role } = useSelector(state => state.auth)
  if (!isLoggedIn || role !== 'admin') return <Navigate to="/admin/login" />
  return children
}

export default ProtectedRoute
