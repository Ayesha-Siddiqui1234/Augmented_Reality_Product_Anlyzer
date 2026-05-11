// src/pages/public/ProductDetailPage.jsx

import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectProductBySlug, selectRelatedProducts } from '../../features/products/productSlice'
import { toggleFavorite, selectIsFavorite } from '../../features/favorites/favoriteSlice'
import { addProductToCart } from '../../features/cart/cartSlice'
import Navbar from '../../components/Navbar'
/* ─── hook: intersection observer for reveal animations ─── */
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

const ProductDetailPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const product = useSelector(state => selectProductBySlug(state, slug))
  const relatedProducts = useSelector(state => 
    product ? selectRelatedProducts(state, product._id || product.id, product.category) : []
  )
  
  const isFavorited = useSelector(state => 
    product ? selectIsFavorite(state, product._id || product.id) : false
  )

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background:'#09070f'}}>
        <div className="text-center">
          <span className="text-6xl mb-4 block">🛋️</span>
          <h1 className="text-2xl font-bold text-purple-400 mb-2">Product Not Found</h1>
          <p className="text-purple-100/60 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/products')}
            className="px-8 py-3 rounded-full bg-purple-400 text-black font-bold hover:bg-purple-300 transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  const images = product.gallery || [product.imageUrl]
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  const handleAddToCart = () => {
    // Check if quantity exceeds stock
    if (quantity > product.stock) {
      alert(`Sorry! Only ${product.stock} items available in stock.`)
      setQuantity(product.stock)
      return
    }
    
    dispatch(addProductToCart(product.id))
    // Show success message and navigate to cart
    const goToCart = window.confirm(`Added ${quantity} x ${product.name} to cart!\n\nGo to cart now?`)
    if (goToCart) {
      navigate('/cart')
    }
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({ 
      productId: product._id || product.id,
      product: product
    }))
  }

  return (
    <>
      <Navbar />
      
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
          color: #5b21b6 !important;
        }
        
        .light-theme .text-purple-100 {
          color: #3b0764 !important;
        }
        
        .light-theme .text-purple-300 {
          color: #6d28d9 !important;
        }
        
        .light-theme .text-purple-100\\/60,
        .light-theme .text-purple-100\\/50 {
          color: #5b21b6 !important;
        }
        
        .light-theme .text-purple-400\\/60,
        .light-theme .text-purple-400\\/50 {
          color: #6d28d9 !important;
        }
        
        .light-theme .text-purple-400\\/30 {
          color: #9333ea !important;
        }
        
        .light-theme .bg-\\[\\#09070f\\]\\/60,
        .light-theme .bg-\\[\\#09070f\\]\\/40,
        .light-theme .bg-\\[\\#09070f\\]\\/95 {
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden border border-purple-400/15 bg-[#09070f]/60 backdrop-blur-md aspect-square">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 text-xs font-bold tracking-widest rounded-full bg-purple-400 text-black uppercase">New</span>
                )}
                {discount > 0 && (
                  <span className="px-3 py-1 text-xs font-bold tracking-widest rounded-full bg-[#000]/60 text-purple-400 border border-purple-400/30 uppercase">-{discount}%</span>
                )}
                {product.arSupported && (
                  <span className="px-3 py-1 text-xs font-bold tracking-widest rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 uppercase">AR Ready</span>
                )}
              </div>

              {/* Favorite Button */}
              <button
                onClick={handleToggleFavorite}
                className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-2xl backdrop-blur-md border transition-all ${
                  isFavorited
                    ? 'bg-purple-400 border-purple-400 text-black scale-110'
                    : 'bg-[#000]/60 border-purple-400/30 text-purple-400 hover:scale-110'
                }`}
              >
                {isFavorited ? '♥' : '♡'}
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-purple-400 scale-105'
                        : 'border-purple-400/15 hover:border-purple-400/40'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full aspect-square object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            
            {/* Category */}
            <p className="text-purple-400/60 text-xs tracking-[0.3em] uppercase">{product.categoryLabel}</p>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400 leading-tight">{product.name}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-purple-400">PKR {product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-purple-400/30 line-through">PKR {product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-purple-100/60 text-base leading-relaxed">{product.shortDescription}</p>

            {/* Divider */}
            <div className="border-t border-purple-400/10" />

            {/* Quantity */}
            <div>
              <p className="text-sm font-semibold text-purple-300 mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-purple-400/30 bg-purple-400/5 text-purple-400 font-bold hover:bg-purple-400/10 transition"
                >
                  −
                </button>
                <span className="w-16 text-center text-lg font-bold text-purple-400">{quantity}</span>
                <button
                  onClick={() => {
                    if (quantity >= product.stock) {
                      alert(`Maximum stock limit reached! Only ${product.stock} items available.`)
                    } else {
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                  }}
                  className={`w-10 h-10 rounded-full border font-bold transition ${
                    quantity >= product.stock
                      ? 'border-red-400/30 bg-red-400/5 text-red-400 cursor-not-allowed'
                      : 'border-purple-400/30 bg-purple-400/5 text-purple-400 hover:bg-purple-400/10'
                  }`}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
                <span className={`text-sm ml-2 ${
                  quantity >= product.stock ? 'text-red-400 font-semibold' : 'text-purple-400/60'
                }`}>
                  ({product.stock} in stock)
                  {quantity >= product.stock && ' - Max reached!'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-full bg-purple-400 text-black font-bold text-sm hover:bg-purple-300 transition-all duration-300 shadow-[0_0_40px_rgba(153,85,255,0.3)]"
              >
                🛒 Add to Cart
              </button>
              {product.arSupported && (
                <button 
                  onClick={() => navigate(`/products/${slug}/3d-view`)}
                  className="flex-1 py-4 rounded-full border-2 border-purple-400 bg-purple-400/10 text-purple-400 font-bold text-sm hover:bg-purple-400 hover:text-black transition-all duration-300"
                >
                  🧊 View in 3D
                </button>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <div className="flex items-center gap-2 text-sm text-purple-100/60">
                <span className="text-purple-400">✓</span>
                Free Delivery
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-100/60">
                <span className="text-purple-400">✓</span>
                30-Day Returns
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-100/60">
                <span className="text-purple-400">✓</span>
                Secure Payment
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-100/60">
                <span className="text-purple-400">✓</span>
                Warranty Included
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-20">
          {/* Tab Headers */}
          <div className="flex gap-4 border-b border-purple-400/10 mb-8">
            {['description', 'specifications'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold text-sm capitalize transition-all ${
                  activeTab === tab
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-purple-400/60 hover:text-purple-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="rounded-2xl border border-purple-400/15 bg-[#09070f]/60 backdrop-blur-md p-8">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Product Description</h3>
                <p className="text-purple-100/60 leading-relaxed">{product.description}</p>
                {product.tags && product.tags.length > 0 && (
                  <div className="pt-4">
                    <p className="text-sm font-semibold text-purple-300 mb-3">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full border border-purple-400/20 bg-purple-400/5 text-purple-400 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-3 border-b border-purple-400/10">
                    <span className="text-purple-400/60">Brand</span>
                    <span className="text-purple-300 font-semibold">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-purple-400/10">
                    <span className="text-purple-400/60">Material</span>
                    <span className="text-purple-300 font-semibold">{product.material}</span>
                  </div>
                  {product.dimensions && (
                    <>
                      <div className="flex justify-between py-3 border-b border-purple-400/10">
                        <span className="text-purple-400/60">Width</span>
                        <span className="text-purple-300 font-semibold">{product.dimensions.width}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-purple-400/10">
                        <span className="text-purple-400/60">Height</span>
                        <span className="text-purple-300 font-semibold">{product.dimensions.height}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-purple-400/10">
                        <span className="text-purple-400/60">Depth</span>
                        <span className="text-purple-300 font-semibold">{product.dimensions.depth}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between py-3 border-b border-purple-400/10">
                    <span className="text-purple-400/60">AR Support</span>
                    <span className="text-purple-300 font-semibold">{product.arSupported ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-purple-400 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.slice(0, 4).map(relatedProduct => (
                <button
                  key={relatedProduct.id}
                  onClick={() => navigate(`/products/${relatedProduct.slug}`)}
                  className="group relative rounded-2xl overflow-hidden border border-purple-400/15 bg-white/5 backdrop-blur-md cursor-pointer card-glow text-left"
                >
                  <div className="relative h-48 overflow-hidden bg-[#09070f]/40">
                    <img
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-purple-400/50 text-[10px] uppercase tracking-widest mb-1">{relatedProduct.categoryLabel}</p>
                    <h3 className="text-purple-100 font-semibold text-sm leading-snug mb-2">{relatedProduct.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-purple-400 font-bold text-base">PKR {relatedProduct.price.toLocaleString()}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
    </>
  )
}

export default ProductDetailPage
