// src/App.jsx

import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { HoverCard, HoverCardTrigger, HoverCardContent } from './components/ui/hover-card'
import { ThemeSwitcherToggle } from './components/ui/theme-switch-toggler'

import ProductListPage from './pages/public/ProductListPage'
import FavoritesPage   from './pages/public/FavoritesPage'
import HomePage        from './pages/public/HomePage'

const Placeholder = ({ title, owner }) => (
  <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center gap-3 text-center px-4 transition-colors">
    <span className="text-5xl">🚧</span>
    <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">{title}</h1>
    <p className="text-stone-500 dark:text-stone-400 text-sm">This page is being built by {owner}</p>
  </div>
)

const BrandHoverCard = () => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Link
        to="/"
        className="text-amber-400 font-bold text-lg mr-auto tracking-tight hover:text-amber-300 transition-colors"
      >
        FurniAR
      </Link>
    </HoverCardTrigger>

    <HoverCardContent side="bottom" align="start" sideOffset={12} className="w-72 p-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-stone-900 dark:bg-stone-700 flex items-center justify-center text-amber-400 font-bold text-lg shadow">
            F
          </div>
          <div>
            <p className="font-semibold text-stone-800 dark:text-stone-100 text-base leading-none">FurniAR</p>
            <p className="text-stone-400 text-xs mt-0.5">Furniture in Augmented Reality</p>
          </div>
        </div>
        <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
          Explore premium furniture with AR previews — see exactly how each piece looks in your space before you buy.
        </p>
        <div className="flex gap-6 text-sm border-t border-stone-100 dark:border-stone-700 pt-3">
          {[['200+','Products'],['AR','Ready'],['4.8★','Rating']].map(([v,l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="text-stone-800 dark:text-stone-100 font-semibold">{v}</span>
              <span className="text-stone-400">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
)

const Navbar = () => {
  const location = useLocation()
  // TODO: Get actual userId from auth when implemented
  const userId = 'user-1'
  const favCount = useSelector(s => s.favorites.items.filter(f => f.userId === userId).length)

  const links = [
    { to: '/',          label: 'Home' },
    { to: '/products',  label: 'Products' },
    { to: '/favorites', label: favCount > 0 ? `Favorites (${favCount})` : 'Favorites' },
    { to: '/about',     label: 'About' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-stone-900 dark:bg-black shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-14 gap-6">
        <BrandHoverCard />
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`text-sm font-medium transition-colors duration-150 ${
              location.pathname === l.to
                ? 'text-amber-400'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            {l.label}
          </Link>
        ))}
        <div className="ml-2">
          <ThemeSwitcherToggle />
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"               element={<HomePage />} />
        <Route path="/products"       element={<ProductListPage />} />
        <Route path="/products/:slug" element={<Placeholder title="Product Detail Page" owner="Member 3" />} />
        <Route path="/favorites"      element={<FavoritesPage />} />
        <Route path="/login"          element={<Placeholder title="Login Page"          owner="Member 4" />} />
        <Route path="/about"          element={<Placeholder title="About Page"          owner="Member 1" />} />
        <Route path="/admin/login"    element={<Placeholder title="Admin Login"         owner="Member 4" />} />
        <Route path="/admin"          element={<Placeholder title="Admin Dashboard"     owner="Member 4" />} />
        <Route path="/admin/products" element={<Placeholder title="Manage Products"     owner="Member 4" />} />
        <Route path="/admin/products/new"      element={<Placeholder title="Add Product"  owner="Member 4" />} />
        <Route path="/admin/products/:id/edit" element={<Placeholder title="Edit Product" owner="Member 4" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
