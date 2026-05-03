// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import KashafNavbar from './components/Navbar'
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


function App() {
  return (
    <BrowserRouter>
      {/* Kashaf's Futuristic Navbar - Member 1's work */}
      <KashafNavbar
        isLoggedIn={false}
        userName="User"
      />

     
      
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
