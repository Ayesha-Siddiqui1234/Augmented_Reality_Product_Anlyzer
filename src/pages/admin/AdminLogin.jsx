// src/pages/admin/AdminLogin.jsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
    setApiError('')
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true)
      setApiError('')
      
      try {
        // Backend API call
        const response = await axios.post(
          'http://localhost:5000/api/auth/admin/login',
          {
            email: formData.email,
            password: formData.password
          },
          {
            withCredentials: true
          }
        )

        if (response.data.success) {
          // Save token and user data
          localStorage.setItem('token', response.data.accessToken)
          localStorage.setItem('user', JSON.stringify(response.data.user))
          
          // Dispatch to Redux if needed
          // dispatch(loginSuccess(response.data))
          
          // Navigate to admin dashboard
          navigate('/admin')
        }
      } catch (error) {
        console.error('Admin login error:', error)
        setApiError(
          error.response?.data?.message || 
          'Login failed. Please check your credentials.'
        )
      } finally {
        setLoading(false)
      }
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full mb-4">
              <span className="text-3xl">👨‍💼</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-purple-200">Access the admin dashboard</p>
          </div>

          {/* API Error Message */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
              ❌ {apiError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="admin@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>

          {/* Helper Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-purple-200">
              Default credentials:
            </p>
            <p className="text-xs text-purple-300 mt-1">
              Email: admin@gmail.com | Password: admin12345
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-purple-300 hover:text-white transition"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
