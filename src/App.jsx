// src/App.jsx

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { fetchProducts } from './features/products/productSlice'
import { fetchFavorites } from './features/favorites/favoriteSlice'
import { selectIsAuthenticated } from './features/auth/authSlice'
import CheckoutPage from './pages/public/payment/CheckoutPage'
import PaymentCancelPage from './pages/public/payment/PaymentCancel'
import PaymentSuccessPage from './pages/public/payment/PaymentSuccess'
import StripeSimulationPage from './pages/public/payment/StripeSimulation'
import KashafNavbar from './components/Navbar'
import ProductListPage from './pages/public/ProductListPage'
import ProductDetailPage from './pages/public/ProductDetailPage'
import Product3DViewer from './pages/public/Product3DViewer'
import ARPreview from './pages/public/ARPreview'
import FavoritesPage from './pages/public/FavoritesPage'
import CartPage from './pages/public/CartPage'
import HomePage from './pages/public/HomePage'
import UserSignup from './pages/auth/UserSignup'
import UserLogin from './pages/auth/UserLogin'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddProduct from './pages/admin/AddProduct'
import AdminProducts from './pages/admin/AdminProducts'
import AdminProductDetails from './pages/admin/AdminProductDetails'
// import AdminCategories from './pages/admin/AdminCategories'
// import AdminCategoryForm from "./pages/admin/AdminCategoryForm";
import AdminUsers from './pages/admin/AdminUsers'
import AdminOrders from "./pages/admin/AdminOrders";
import AboutPage from './pages/public/About'

const Placeholder = ({ title, owner }) => (
  <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center gap-3 text-center px-4 transition-colors">
    <span className="text-5xl">🚧</span>
    <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">{title}</h1>
    <p className="text-stone-500 dark:text-stone-400 text-sm">This page is being built by {owner}</p>
  </div>
)


function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  // Fetch products on app load
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Fetch favorites if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchFavorites())
    }
  }, [dispatch, isAuthenticated])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/about' element={<AboutPage/>} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/products/:slug/3d-view" element={<Product3DViewer />} />
        <Route path="/products/:slug/ar-preview" element={<ARPreview />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/products/:id" element={<AdminProductDetails />} />
        {/* <Route path="/admin/categories" element={<AdminCategories />} /> */}
        <Route path="/admin/products/edit/:id" element={<AdminProductDetails />} />
        {/* <Route path="/admin/categories/add" element={<AdminCategoryForm />} /> */}
        {/* <Route path="/admin/categories/edit/:id" element={<AdminCategoryForm />} /> */}
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/stripe-simulation" element={<StripeSimulationPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-cancel" element={<PaymentCancelPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
