// src/pages/public/ProductListPage.jsx

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectFilteredProducts, setSortBy } from '../../features/products/productSlice'
import { setSearchQuery, setSelectedCategory } from '../../features/products/productSlice'
import { toggleFavorite, selectIsFavoriteByUser } from '../../features/favorites/favoriteSlice'
import PublicNavbar from '../../components/PublicNavbar'

const StarRating = ({ rating }) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="flex gap-0.5 text-purple-400 text-xs">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < full ? '★' : i === full && half ? '⯨' : '☆'}</span>
      ))}
    </span>
  )
}

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
        <h3 className="text-purple-100 font-semibold text-sm leading-snug mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-purple-400/40 text-[10px]">({product.reviewCount})</span>
        </div>
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

const ProductListPage = () => {
  const dispatch = useDispatch()

  const products = useSelector(selectFilteredProducts)
  const categories = useSelector(s => s.categories.items)
  const searchQuery = useSelector(s => s.products.searchQuery)
  const selectedCategory = useSelector(s => s.products.selectedCategory)
  const sortBy = useSelector(s => s.products.sortBy)

  const clearAll = () => {
    dispatch(setSearchQuery(''))
    dispatch(setSelectedCategory('all'))
    dispatch(setSortBy('default'))
  }

  return (
    <>
      <PublicNavbar />
      
      <main className="min-h-screen text-purple-400" style={{background:'#09070f'}}>
        
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
          
          .light-theme .placeholder-purple-400\\/40::placeholder {
            color: #7c3aed !important;
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
          <div className="mb-12 text-center">
            <p className="text-purple-400/60 text-xs tracking-[0.4em] uppercase mb-3">Browse Collection</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400 leading-tight mb-4">
              All Products
            </h1>
            <p className="text-purple-100/60 text-base max-w-2xl mx-auto">
              {products.length} product{products.length !== 1 ? 's' : ''} available with AR preview
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-2xl mx-auto">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400/40 text-lg pointer-events-none">🔍</span>
            <input
              type="text"
              placeholder="Search products, tags, descriptions…"
              value={searchQuery}
              onChange={e => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-14 pr-12 py-4 rounded-2xl border border-purple-400/20 bg-[#09070f]/60 backdrop-blur-md text-purple-100 placeholder-purple-400/40 text-sm focus:outline-none focus:border-purple-400/60 focus:shadow-[0_0_30px_rgba(153,85,255,0.2)] transition"
            />
            {searchQuery && (
              <button
                onClick={() => dispatch(setSearchQuery(''))}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-400 transition text-sm font-bold"
              >✕</button>
            )}
          </div>

          {/* Filters + Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => dispatch(setSelectedCategory(cat.id))}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-purple-400 text-black border-purple-400 shadow-[0_0_20px_rgba(153,85,255,0.4)]'
                      : 'bg-purple-400/5 text-purple-400 border-purple-400/20 hover:border-purple-400/40 hover:bg-purple-400/10'
                  }`}
                >
                  <span>{cat.icon}</span>{cat.label}
                </button>
              ))}
            </div>
            
            <select
              value={sortBy}
              onChange={e => dispatch(setSortBy(e.target.value))}
              className="px-5 py-2.5 rounded-2xl border border-purple-400/20 bg-[#09070f]/60 backdrop-blur-md text-purple-400 text-sm focus:outline-none focus:border-purple-400/60 cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== 'all' || sortBy !== 'default') && (
            <div className="flex items-center gap-3 mb-8 flex-wrap">
              <span className="text-xs text-purple-400/60 font-medium">Active filters:</span>
              {searchQuery && (
                <span className="flex items-center gap-2 bg-purple-400/10 border border-purple-400/30 text-purple-400 text-xs px-4 py-1.5 rounded-full font-medium">
                  "{searchQuery}"
                  <button onClick={() => dispatch(setSearchQuery(''))} className="hover:text-purple-300">✕</button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="flex items-center gap-2 bg-purple-400/10 border border-purple-400/30 text-purple-400 text-xs px-4 py-1.5 rounded-full font-medium">
                  {categories.find(c => c.id === selectedCategory)?.label}
                  <button onClick={() => dispatch(setSelectedCategory('all'))} className="hover:text-purple-300">✕</button>
                </span>
              )}
              {sortBy !== 'default' && (
                <span className="flex items-center gap-2 bg-purple-400/10 border border-purple-400/30 text-purple-400 text-xs px-4 py-1.5 rounded-full font-medium">
                  Sorted
                  <button onClick={() => dispatch(setSortBy('default'))} className="hover:text-purple-300">✕</button>
                </span>
              )}
              <button onClick={clearAll} className="text-xs text-purple-400/60 hover:text-red-400 underline transition">Clear all</button>
            </div>
          )}

          {/* Products Grid or Empty State */}
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <span className="text-6xl mb-2">🛋️</span>
              <h2 className="text-2xl font-bold text-purple-400">No products found</h2>
              <p className="text-purple-100/60 text-sm max-w-xs">
                Try changing your search or removing a filter to see more products.
              </p>
              <button
                onClick={clearAll}
                className="mt-4 px-8 py-3 rounded-full bg-purple-400 text-black font-bold hover:bg-purple-300 transition-all shadow-[0_0_30px_rgba(153,85,255,0.3)]"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default ProductListPage
