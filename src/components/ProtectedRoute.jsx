// src/components/ProtectedRoute.jsx

import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '../features/auth/authSlice'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation()

  const currentUser = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const storedToken = localStorage.getItem('token')
  const storedUser = localStorage.getItem('user')

  const isAdminRoute = allowedRoles.includes('admin')

  if (!isAuthenticated || !currentUser || !storedToken || !storedUser) {
    return (
      <Navigate
        to={isAdminRoute ? '/admin/login' : '/login'}
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  const userRole = currentUser.role

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />
    }

    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute