// src/pages/admin/AdminProducts.jsx

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchAdminProducts,
  deleteProduct,
  toggleProductStatus,
  selectAdminProducts,
  selectAdminProductsLoading,
  selectAdminProductsError,
  selectAdminProductsSuccess,
  selectAdminProductsPagination,
  clearError,
  clearSuccessMessage
} from '../../features/admin/adminProductSlice'
import { selectCurrentUser } from '../../features/auth/authSlice'

const AdminProducts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const currentUser = useSelector(selectCurrentUser)
  const products = useSelector(selectAdminProducts)
  const loading = useSelector(selectAdminProductsLoading)
  const error = useSelector(selectAdminProductsError)
  const successMessage = useSelector(selectAdminProductsSuccess)
  const pagination = useSelector(selectAdminProductsPagination)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Check if user is admin
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/admin/login')
    }
  }, [currentUser, navigate])

  // Fetch products
  useEffect(() => {
    dispatch(fetchAdminProducts({
      page: currentPage,
      limit: 10,
      search: searchTerm,
      category: selectedCategory
    }))
  }, [dispatch, currentPage, searchTerm, selectedCategory])

  // Clear messages after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearSuccessMessage())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, dispatch])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, dispatch])

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProduct(productId))
      dispatch(fetchAdminProducts({ page: currentPage, limit: 10 }))
    }
  }

  const handleToggleStatus = async (productId) => {
    await dispatch(toggleProductStatus(productId))
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-[#090812] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#090812] text-white">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(153,85,255,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(153,85,255,0.18),transparent_35%)] px-5 py-6 md:px-8 lg:px-10">
        
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
            ✅ {successMessage}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            ❌ {error}
          </div>
        )}

        {/* Header */}
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <button
              onClick={() => navigate('/admin')}
              className="mb-3 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-purple-400">Products Management</h1>
            <p className="text-gray-400 mt-2">
              Total: {pagination.totalProducts} products
            </p>
          </div>
          
          <button
            onClick={() => navigate('/admin/products/add')}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition flex items-center gap-2"
          >
            <span>+</span> Add New Product
          </button>
        </header>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 bg-white/5 border border-purple-400/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-400/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-500/20 border-b border-purple-400/20">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-400/10">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4">
                      <img
                        src={product.images?.[0] || '/placeholder.png'}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{product.name}</div>
                      <div className="text-sm text-gray-400">{product.brand}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{product.category}</td>
                    <td className="px-6 py-4 text-white font-semibold">
                      PKR {product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        product.stock > 10
                          ? 'bg-green-500/20 text-green-400'
                          : product.stock > 0
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(product._id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.isActive
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {product.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/products/${product._id}`)}
                          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition"
                          title="View Details"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                          className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-purple-400/20 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-purple-400 mb-2">No products found</h3>
            <p className="text-gray-400 mb-6">Start by adding your first product</p>
            <button
              onClick={() => navigate('/admin/products/add')}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition"
            >
              Add Product
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProducts
