// src/pages/public/FavoritesPage.jsx

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectFavoriteProductsByUser } from '../../features/favorites/favoriteSlice'
import { toggleFavorite, selectIsFavoriteByUser } from '../../features/favorites/favoriteSlice'
import { selectIsAuthenticated, selectCurrentUser } from '../../features/auth/authSlice'
import Navbar from '../../components/Navbar'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userId = 'user-1'
  const isFavorited = useSelector(state => selectIsFavoriteByUser(state, userId, product.id))
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <div
      onClick={() => navigate(`/products/${product.slug}`)}
      className="group relative rounded-2xl overflow-hidden border border-purple-400/15 bg-white/5 backdrop-blur-md cursor-pointer card-glow"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-[#09070f]/40">
        <img
          src={product.imageUrl}
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
          onClick={(e) => {
            e.stopPropagation()
            dispatch(toggleFavorite({ userId, productId: product.id }))
          }}
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
        <p className="text-purple-400/50 text-[10px] uppercase tracking-widest mb-1">{product.categoryLabel}</p>
        <h3 className="text-purple-100 font-semibold text-sm leading-snug mb-3 line-clamp-1">{product.name}</h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-purple-400 font-bold text-base">PKR {product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-purple-400/30 text-xs line-through">PKR {product.originalPrice.toLocaleString()}</span>
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

const FavoritesPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [dbFavorites, setDbFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const currentUser = useSelector(selectCurrentUser)
  const userId = currentUser?._id || currentUser?.id || 'user-1'
  
  // Fetch favorites from backend database
  useEffect(() => {
    const fetchFavorites = async () => {
      // Check if user is authenticated
      if (!isAuthenticated) {
        navigate('/login')
        return
      }

      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        
        const response = await fetch('http://localhost:5000/api/favorites', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        const data = await response.json()
        
        if (data.success) {
          // Transform backend data to match frontend format
          const transformedFavorites = data.data.favorites.map(fav => {
            const product = fav.product
            return {
              id: product._id,
              _id: product._id,
              name: product.name,
              slug: product.name.toLowerCase().replace(/\s+/g, '-'),
              description: product.description,
              price: product.price,
              originalPrice: product.price,
              category: product.subcategory || product.category,
              categoryLabel: product.subcategory || product.category,
              imageUrl: product.images?.[0] || '',
              images: product.images || [],
              glbModel: product.glbModel || '',
              arSupported: !!product.glbModel,
              isNew: false,
              stock: product.stock,
              brand: product.brand,
              specifications: product.specifications
            }
          })
          setDbFavorites(transformedFavorites)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [isAuthenticated, navigate])

  const favorites = useSelector(state => selectFavoriteProductsByUser(state, userId))

  const removeAll = () => {
    favorites.forEach(p => dispatch(toggleFavorite({ userId, productId: p.id })))
  }

  // Show loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen text-purple-400 flex items-center justify-center pt-24" style={{background:'#09070f'}}>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg">Loading your favorites...</p>
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
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-full bg-purple-400 text-black font-bold hover:bg-purple-300 transition"
            >
              Try Again
            </button>
          </div>
        </main>
      </>
    )
  }

  // Use database favorites
  const displayFavorites = dbFavorites

  return (
    <>
      <Navbar />
      
<main className="min-h-screen text-purple-400 pt-24" style={{background:'#09070f'}}>        
        {/* Global Styles */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
          body { font-family: 'Poppins', sans-serif; }
          
          /* Light Theme Styles */
          .light-theme main {
            background: linear-gradient(135deg, #f5f3ff 0%, #e9d5ff 100%) !important;
          }
          
          .light-theme .text-purple-400 {
            color: #7c3aed !important;
          }
          
          .light-theme .text-purple-100 {
            color: #5b21b6 !important;
          }
          
          .light-theme .text-purple-100\\/60 {
            color: #6d28d9 !important;
          }
          
          .light-theme .text-purple-400\\/60,
          .light-theme .text-purple-400\\/50,
          .light-theme .text-purple-400\\/40 {
            color: #7c3aed !important;
          }
          
          .light-theme .bg-\\[\\#09070f\\]\\/60,
          .light-theme .bg-\\[\\#09070f\\]\\/40,
          .light-theme .bg-white\\/5 {
            background: rgba(255, 255, 255, 0.95) !important;
            border-color: rgba(139, 92, 246, 0.3) !important;
          }
          
          .light-theme .border-purple-400\\/15,
          .light-theme .border-purple-400\\/10,
          .light-theme .border-purple-400\\/20,
          .light-theme .border-purple-400\\/30 {
            border-color: rgba(139, 92, 246, 0.3) !important;
          }
          
          .grid-bg {
            background-image:
              linear-gradient(rgba(153,85,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(153,85,255,0.04) 1px, transparent 1px);
            background-size: 60px 60px;
          }
          
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

        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-purple-400/60 text-xs tracking-[0.4em] uppercase mb-3">Your Collection</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400 leading-tight flex items-center gap-4">
                My Favorites
                {displayFavorites.length > 0 && (
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-400 text-black text-lg font-bold shadow-[0_0_20px_rgba(153,85,255,0.4)]">
                    {displayFavorites.length}
                  </span>
                )}
              </h1>
              <p className="mt-3 text-purple-100/60 text-sm">Products you have saved for later</p>
            </div>
            
            {displayFavorites.length > 0 && (
              <button
                onClick={removeAll}
                className="px-6 py-3 rounded-full border border-red-400/30 bg-red-400/5 text-red-400 font-semibold text-sm hover:bg-red-400/10 transition-all"
              >
                Remove All
              </button>
            )}
          </div>

          {/* Empty State or Products Grid */}
          {displayFavorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
              <div className="w-24 h-24 rounded-full bg-purple-400/10 border-2 border-purple-400/30 flex items-center justify-center text-5xl">
                ♡
              </div>
              <div>
                <h2 className="text-2xl font-bold text-purple-400 mb-2">No favorites yet</h2>
                <p className="text-purple-100/60 text-sm max-w-md leading-relaxed">
                  Browse our products and click the heart icon on any item to save it here.
                </p>
              </div>
              <button
                onClick={() => navigate('/products')}
                className="mt-4 px-8 py-4 rounded-full bg-purple-400 text-black font-bold hover:bg-purple-300 transition-all shadow-[0_0_30px_rgba(153,85,255,0.3)]"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {displayFavorites.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* CTA */}
              <div className="text-center py-12 border-t border-purple-400/10">
                <p className="text-purple-100/60 text-sm mb-4">Want to discover more?</p>
                <button
                  onClick={() => navigate('/products')}
                  className="px-8 py-3 rounded-full border border-purple-400/30 bg-purple-400/5 text-purple-400 font-semibold hover:bg-purple-400/10 transition-all"
                >
                  Browse All Products
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default FavoritesPage
