// src/pages/auth/UserSignup.jsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup, selectAuthLoading, selectAuthError } from '../../features/auth/authSlice'


const UserSignup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector(selectAuthLoading)
  const authError = useSelector(selectAuthError)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^[0-9]{11}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 11 digits'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length === 0) {
      try {
        await dispatch(signup({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phone,
          password: formData.password,
        })).unwrap().unwrap()

        alert('Account created successfully! Please login.')
        navigate('/login')
      } catch (error) {
        setErrors({ submit: error || 'Signup failed. Please try again.' })
      }
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <>
      {/* <PublicNavbar /> */}

      <main className="min-h-screen flex items-center justify-center px-6 py-12" style={{ background: '#09070f' }}>

        {/* Global Styles */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
          body { font-family: 'Poppins', sans-serif; }
          
          .light-theme main {
            background: linear-gradient(135deg, #f5f3ff 0%, #e9d5ff 100%) !important;
          }
          
          .light-theme .text-purple-400 {
            color: #7c3aed !important;
          }
          
          .light-theme .text-purple-100 {
            color: #5b21b6 !important;
          }
          
          .light-theme .bg-\\[\\#09070f\\]\\/60 {
            background: rgba(255, 255, 255, 0.95) !important;
          }
          
          .light-theme .border-purple-400\\/20 {
            border-color: rgba(139, 92, 246, 0.3) !important;
          }
        `}</style>

        {/* Signup Form */}
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-purple-400/20 bg-[#09070f]/60 backdrop-blur-md p-8 shadow-[0_0_60px_rgba(153,85,255,0.2)]">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-[0_0_30px_rgba(153,85,255,0.4)]">
                👤
              </div>
              <h1 className="text-3xl font-extrabold text-purple-400 mb-2">Create Account</h1>
              <p className="text-purple-100/60 text-sm">Join VizCraft to start shopping</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Error Message */}
              {(errors.submit || authError) && (
                <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/30">
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <span>⚠️</span>
                    {errors.submit || authError}
                  </p>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-purple-300 text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-400/50' : 'border-purple-400/20'
                    } bg-purple-400/5 text-purple-100 placeholder-purple-400/40 text-sm focus:outline-none focus:border-purple-400/60 focus:shadow-[0_0_20px_rgba(153,85,255,0.2)] transition`}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-purple-300 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400/50' : 'border-purple-400/20'
                    } bg-purple-400/5 text-purple-100 placeholder-purple-400/40 text-sm focus:outline-none focus:border-purple-400/60 focus:shadow-[0_0_20px_rgba(153,85,255,0.2)] transition`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-purple-300 text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03001234567"
                  maxLength="11"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-400/50' : 'border-purple-400/20'
                    } bg-purple-400/5 text-purple-100 placeholder-purple-400/40 text-sm focus:outline-none focus:border-purple-400/60 focus:shadow-[0_0_20px_rgba(153,85,255,0.2)] transition`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-purple-300 text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-400/50' : 'border-purple-400/20'
                      } bg-purple-400/5 text-purple-100 placeholder-purple-400/40 text-sm focus:outline-none focus:border-purple-400/60 focus:shadow-[0_0_20px_rgba(153,85,255,0.2)] transition`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-400 transition"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-purple-300 text-sm font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-400/50' : 'border-purple-400/20'
                    } bg-purple-400/5 text-purple-100 placeholder-purple-400/40 text-sm focus:outline-none focus:border-purple-400/60 focus:shadow-[0_0_20px_rgba(153,85,255,0.2)] transition`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold text-sm hover:from-purple-400 hover:to-purple-600 transition-all shadow-[0_0_40px_rgba(153,85,255,0.4)] hover:shadow-[0_0_60px_rgba(153,85,255,0.6)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-purple-100/60 text-sm">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-purple-400 font-semibold hover:text-purple-300 transition"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default UserSignup
