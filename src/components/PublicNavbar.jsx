// src/components/PublicNavbar.jsx

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCountByUser } from '../features/cart/cartSlice'

const PublicNavbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Get favorites and cart count
  const userId = 'user-1' // TODO: Get from auth
  const favCount = useSelector(s => s.favorites.items.filter(f => f.userId === userId).length)
  const cartCount = useSelector(state => selectCartCountByUser(state, userId))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Apply theme to document (for page content only)
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme')
    } else {
      document.documentElement.classList.remove('light-theme')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <style>{`
        /* Light theme for PAGE CONTENT ONLY */
        .light-theme main,
        .light-theme .min-h-screen {
          background: linear-gradient(135deg, #f5f3ff 0%, #e9d5ff 100%) !important;
        }

        .light-theme main .text-purple-400 {
          color: #7c3aed !important;
        }

        .light-theme main .text-purple-100 {
          color: #5b21b6 !important;
        }

        .light-theme main .bg-\\[\\#09070f\\]\\/60,
        .light-theme main .bg-\\[\\#09070f\\]\\/95,
        .light-theme main .bg-\\[\\#09070f\\]\\/40,
        .light-theme main .bg-white\\/5 {
          background: rgba(255, 255, 255, 0.95) !important;
          border-color: rgba(139, 92, 246, 0.3) !important;
        }

        .light-theme main .border-purple-400\\/15,
        .light-theme main .border-purple-400\\/10,
        .light-theme main .border-purple-400\\/20,
        .light-theme main .border-purple-400\\/30 {
          border-color: rgba(139, 92, 246, 0.25) !important;
        }

        /* Remove any borders from navbar */
        nav {
          border: none !important;
          border-bottom: none !important;
          box-shadow: none !important;
        }
        
        /* Ensure spacer has no styling */
        nav + div {
          background: transparent !important;
          border: none !important;
        }
        
        /* Mobile menu animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      {/* NAVBAR - Purplish Black Gradient */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-gradient-to-r from-[#0a0015] via-[#1a0a2e] to-[#0a0015] backdrop-blur-xl shadow-[0_4px_20px_rgba(153,85,255,0.15)]'
            : 'bg-gradient-to-r from-[#0a0015]/95 via-[#1a0a2e]/95 to-[#0a0015]/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-lg group-hover:shadow-[0_0_20px_rgba(153,85,255,0.6)] transition-all duration-300">
              V
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                VizCraft
              </div>
              <div className="text-[9px] text-purple-400/60 tracking-wider uppercase -mt-1">
                3D Furniture
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-2">
            <NavLink onClick={() => navigate('/')} isActive={isActive('/')}>
              Home
            </NavLink>

            <NavLink 
              onClick={() => navigate('/products')} 
              isActive={isActive('/products') || location.pathname.startsWith('/products/')}
            >
              Products
            </NavLink>

            <NavLink 
              onClick={() => navigate('/favorites')} 
              isActive={isActive('/favorites')}
              badge={favCount}
            >
              Favorites
            </NavLink>

            <NavLink 
              onClick={() => navigate('/cart')} 
              isActive={isActive('/cart')}
              badge={cartCount}
            >
              Cart
            </NavLink>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 w-10 h-10 rounded-lg bg-purple-900/40 border border-purple-400/20 flex items-center justify-center text-lg hover:bg-purple-800/60 hover:border-purple-400/40 hover:shadow-[0_0_15px_rgba(153,85,255,0.3)] transition-all duration-300"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Admin Link */}
            <button
              onClick={() => navigate('/admin/login')}
              className="ml-2 px-4 py-2 rounded-lg bg-purple-900/40 border border-purple-400/20 text-purple-300 text-sm font-semibold hover:bg-purple-600 hover:border-purple-400/40 hover:text-white hover:shadow-[0_0_15px_rgba(153,85,255,0.3)] transition-all duration-300"
            >
              Admin
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Cart Icon with Badge (Mobile) */}
            <button
              onClick={() => navigate('/cart')}
              className="relative w-10 h-10 rounded-lg bg-purple-900/40 border border-purple-400/20 flex items-center justify-center text-lg hover:bg-purple-800/60 transition-all"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(153,85,255,0.6)]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-lg bg-purple-900/40 border border-purple-400/20 flex items-center justify-center hover:bg-purple-800/60 transition-all"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`w-5 h-0.5 bg-purple-300 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-5 h-0.5 bg-purple-300 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-5 h-0.5 bg-purple-300 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[72px] left-0 right-0 z-40 bg-gradient-to-b from-[#0a0015] to-[#1a0a2e] border-b border-purple-400/20 shadow-[0_10px_40px_rgba(153,85,255,0.2)] animate-fadeIn">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-2">
            <MobileNavLink 
              onClick={() => {
                navigate('/')
                setMobileMenuOpen(false)
              }} 
              isActive={isActive('/')}
            >
              🏠 Home
            </MobileNavLink>

            <MobileNavLink 
              onClick={() => {
                navigate('/products')
                setMobileMenuOpen(false)
              }} 
              isActive={isActive('/products') || location.pathname.startsWith('/products/')}
            >
              🛋️ Products
            </MobileNavLink>

            <MobileNavLink 
              onClick={() => {
                navigate('/favorites')
                setMobileMenuOpen(false)
              }} 
              isActive={isActive('/favorites')}
              badge={favCount}
            >
              ❤️ Favorites
            </MobileNavLink>

            <MobileNavLink 
              onClick={() => {
                navigate('/cart')
                setMobileMenuOpen(false)
              }} 
              isActive={isActive('/cart')}
              badge={cartCount}
            >
              🛒 Cart
            </MobileNavLink>

            <div className="border-t border-purple-400/20 pt-2 mt-2">
              <MobileNavLink 
                onClick={() => {
                  navigate('/admin/login')
                  setMobileMenuOpen(false)
                }}
              >
                👨‍💼 Admin
              </MobileNavLink>

              <button
                onClick={toggleTheme}
                className="w-full px-4 py-3 rounded-lg text-purple-300 text-sm font-semibold hover:bg-purple-900/40 transition-all text-left flex items-center justify-between"
              >
                <span>{theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="h-20" style={{background: 'transparent'}} />
    </>
  )
}

// NavLink Component (Desktop)
const NavLink = ({ onClick, isActive, badge, children }) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-[0_0_20px_rgba(153,85,255,0.4)]'
        : 'text-purple-300 hover:text-white hover:bg-purple-900/40 hover:border hover:border-purple-400/20'
    }`}
  >
    {children}
    {badge > 0 && (
      <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(153,85,255,0.6)] animate-pulse">
        {badge}
      </span>
    )}
  </button>
)

// Mobile NavLink Component
const MobileNavLink = ({ onClick, isActive, badge, children }) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all text-left flex items-center justify-between ${
      isActive
        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-[0_0_20px_rgba(153,85,255,0.4)]'
        : 'text-purple-300 hover:bg-purple-900/40'
    }`}
  >
    <span>{children}</span>
    {badge > 0 && (
      <span className="min-w-[24px] h-[24px] px-2 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white text-xs font-bold flex items-center justify-center shadow-[0_0_10px_rgba(153,85,255,0.6)]">
        {badge}
      </span>
    )}
  </button>
)

export default PublicNavbar
