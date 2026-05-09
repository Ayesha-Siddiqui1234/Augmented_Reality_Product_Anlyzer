// src/pages/auth/AdminLogin.jsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
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
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (formData.email === 'admin@vizcraft.com' && formData.password === 'admin123') {
        const adminData = {
          email: formData.email,
          role: 'admin',
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        }
        
        localStorage.setItem('admin', JSON.stringify(adminData))
        localStorage.setItem('adminToken', `admin_token_${Date.now()}`)
        
        setLoading(false)
        navigate('/admin')
      } else {
        setLoading(false)
        setErrors({ password: 'Invalid credentials' })
      }
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-black">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.4; }
        }
        
        @keyframes scan-line {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        
        .pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }
        
        .scan-line {
          animation: scan-line 3s linear infinite;
        }
        
        .glow-effect {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 px-4 py-2 rounded-lg border border-purple-500/30 bg-black/50 text-purple-300 text-sm font-medium hover:bg-purple-500/10 transition backdrop-blur-sm"
      >
        ← Back
      </button>

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-b from-black via-purple-950/20 to-black backdrop-blur-xl p-8 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Authenticate</h1>
            <p className="text-purple-300/60 text-sm">Identify yourself to enter the system</p>
          </div>

          {/* Biometric Gateway Visual */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative w-32 h-32">
              {/* Outer rings */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
              <div className="absolute inset-2 rounded-full border-2 border-purple-500/30 pulse-ring" />
              <div className="absolute inset-4 rounded-full border-2 border-purple-500/40 pulse-ring" style={{animationDelay: '0.5s'}} />
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center glow-effect">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
              </div>
              
              {/* Scan line */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="scan-line absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
              </div>
            </div>
          </div>

          {/* Gateway Label */}
          <div className="text-center mb-8">
            <p className="text-purple-400/40 text-xs uppercase tracking-widest mb-1">Biometric Gateway</p>
            <h2 className="text-xl font-bold text-white">Neural ID<br/>Verification</h2>
            <p className="text-purple-300/40 text-xs mt-2">Confirm identity with protocol</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="block text-purple-300/60 text-xs uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@domain.net"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-500/50' : 'border-purple-500/30'
                } bg-black/50 text-white placeholder-purple-400/30 text-sm focus:outline-none focus:border-purple-500 transition backdrop-blur-sm`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-purple-300/60 text-xs uppercase tracking-wider mb-2">
                Passphrase
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="passphrase"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? 'border-red-500/50' : 'border-purple-500/30'
                } bg-black/50 text-white placeholder-purple-400/30 text-sm focus:outline-none focus:border-purple-500 transition backdrop-blur-sm`}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-purple-300/60 cursor-pointer">
                <input type="checkbox" className="w-3 h-3 rounded border-purple-500/30 bg-black/50" />
                <span>Remember this device</span>
              </label>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition">
                Request access clearance →
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold text-sm hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-purple-500/20">
            <p className="text-purple-300/40 text-xs text-center">
              Demo: admin@vizcraft.com / admin123
            </p>
          </div>

          {/* Auth Signal */}
          <div className="mt-4 flex items-center justify-center gap-2 text-purple-400/40 text-xs">
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-purple-500/40 rounded-full" />
              <div className="w-1 h-4 bg-purple-500/60 rounded-full" />
              <div className="w-1 h-3 bg-purple-500/40 rounded-full" />
            </div>
            <span className="uppercase tracking-wider">Auth Signal</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AdminLogin
