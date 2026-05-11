// src/pages/public/ProductListPage.jsx

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  selectFilteredProducts,
  selectProductsLoading,
  selectProductsError,
  fetchProducts,
  setSortBy,
  setSearchQuery,
  setSelectedCategory
} from '../../features/products/productSlice'
import {
  toggleFavorite,
  selectIsFavorite
} from '../../features/favorites/favoriteSlice'
import { selectIsAuthenticated } from '../../features/auth/authSlice'
import Navbar from '../../components/Navbar'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isFavorited = useSelector(state => selectIsFavorite(state, product._id || product.id))
  
  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleToggleFavorite = async (e) => {
    e.stopPropagation()
    
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    try {
      await dispatch(toggleFavorite({ 
        productId: product._id || product.id,
        product: product // Pass the full product for optimistic update
      })).unwrap()
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    }
  }

  return (
    <div
      onClick={() => navigate(`/products/${product.slug}`)}
      className="group relative rounded-2xl overflow-hidden border border-purple-400/15 bg-white/5 backdrop-blur-md cursor-pointer card-glow"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-[#09070f]/40">
        <img
          src={product.imageUrl || product.images?.[0] || ''}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest rounded-full bg-purple-400 text-black uppercase">New</span>
          )}
          {discount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest rounded-full bg-[#000]/60 text-purple-400 border border-purple-400/30 uppercase">-{discount}%</span>
          )}
          {product.arSupported && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 uppercase">AR</span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-lg backdrop-blur-md border transition-all ${
            isFavorited
              ? 'bg-purple-400 border-purple-400 text-black scale-110'
              : 'bg-[#000]/60 border-purple-400/30 text-purple-400 hover:scale-110'
          }`}
        >
          {isFavorited ? '♥' : '♡'}
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-purple-400/50 text-[10px] uppercase tracking-widest mb-1">
          {product.categoryLabel || product.category}
        </p>
        <h3 className="text-purple-100 font-semibold text-sm leading-snug mb-3 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-purple-400 font-bold text-base">
            PKR {product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-purple-400/30 text-xs line-through">
              PKR {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        {/* View Details Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/products/${product.slug}`)
          }}
          className="w-full py-2.5 rounded-full bg-purple-400 text-black text-xs font-bold hover:bg-purple-300 transition-all shadow-lg hover:shadow-purple-400/50"
        >
          View Details →
        </button>
      </div>
    </div>
  )
}

const ProductListPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const products = useSelector(selectFilteredProducts)
  const loading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)

  // Fetch products on mount if not already loaded
  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products.length, loading])

  // Show loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen text-purple-400 flex items-center justify-center pt-24" style={{background:'#09070f'}}>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-semibold mb-2">Loading products from database...</p>
            <p className="text-sm text-purple-400/60">Fetching data from MongoDB via Backend API</p>
          </div>
        </main>
      </>
    )
  }

  // Show error state
  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen text-purple-400 flex items-center justify-center pt-24" style={{background:'#09070f'}}>
          <div className="text-center">
            <p className="text-red-400 text-lg mb-4">❌ {error}</p>
            <button
              onClick={() => dispatch(fetchProducts())}
              className="px-6 py-3 rounded-full bg-purple-400 text-black font-bold hover:bg-purple-300 transition"
            >
              Try Again
            </button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen text-purple-400 pt-24 pb-12" style={{background:'#09070f'}}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
          body { font-family: 'Poppins', sans-serif; }
          
          .card-glow:hover {
            box-shadow: 0 0 40px rgba(153,85,255,0.2), 0 20px 60px rgba(0,0,0,0.5);
            transform: translateY(-6px);
            border-color: rgba(153,85,255,0.4);
          }
          .card-glow { transition: all 0.4s ease; }
          
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #000; }
          ::-webkit-scrollbar-thumb { background: #9955ff; border-radius: 2px; }
        `}</style>

        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-12">
            <p className="text-purple-400/60 text-xs tracking-[0.4em] uppercase mb-3">
              Explore Our Collection
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400 leading-tight flex items-center gap-4">
              All Products
              {products.length > 0 && (
                <span className="inline-flex items-center justify-center px-4 h-12 rounded-full bg-purple-400 text-black text-lg font-bold shadow-[0_0_20px_rgba(153,85,255,0.4)]">
                  {products.length}
                </span>
              )}
            </h1>
            <p className="mt-3 text-purple-100/60 text-sm">
              Discover amazing products with AR preview
            </p>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
              <div className="w-24 h-24 rounded-full bg-purple-400/10 border-2 border-purple-400/30 flex items-center justify-center text-5xl">
                📦
              </div>
              <div>
                <h2 className="text-2xl font-bold text-purple-400 mb-2">No products found</h2>
                <p className="text-purple-100/60 text-sm max-w-md leading-relaxed">
                  Try adjusting your filters or check back later for new products.
                </p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="mt-4 px-8 py-4 rounded-full bg-purple-400 text-black font-bold hover:bg-purple-300 transition-all shadow-[0_0_30px_rgba(153,85,255,0.3)]"
              >
                Go Home
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default ProductListPage
