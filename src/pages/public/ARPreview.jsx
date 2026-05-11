// src/pages/public/ARPreview.jsx
// Virtual AR Preview for Desktop/Laptop (Simulated AR Experience)

import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProductBySlug } from '../../features/products/productSlice'
import Navbar from '../../components/Navbar'
import toast, { Toaster } from 'react-hot-toast'

const ARPreview = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const viewerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [scale, setScale] = useState(1)
  const [selectedRoom, setSelectedRoom] = useState('living-room')
  const [showInstructions, setShowInstructions] = useState(false)
  
  const product = useSelector(state => selectProductBySlug(state, slug))

  const roomBackgrounds = {
    'living-room': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1920&q=80',
    'bedroom': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1920&q=80',
    'office': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    'dining': 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1920&q=80',
  }

  useEffect(() => {
    if (!product) return

    // Load model-viewer script
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js'
    document.head.appendChild(script)

    script.onload = () => {
      setLoading(false)
    }

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [product])

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center" style={{background:'#09070f'}}>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-400">Product Not Found</h1>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      
      <main className="min-h-screen text-purple-400 pt-20" style={{background:'#09070f'}}>
        
        {/* Global Styles */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
          body { font-family: 'Poppins', sans-serif; }
          
          model-viewer {
            width: 100%;
            height: 100%;
            --poster-color: transparent;
          }
          
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

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
          
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="w-full md:w-auto">
                <p className="text-purple-400/60 text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase mb-1 md:mb-2">Virtual AR Preview</p>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-purple-400 leading-tight">
                  {product.name} in Your Space
                </h1>
                <p className="text-purple-100/60 text-xs md:text-sm mt-1 md:mt-2">
                  🖥️ Desktop Preview Mode - For real AR, open on mobile device
                </p>
              </div>
              <button
                onClick={() => navigate(`/products/${slug}/3d-view`)}
                className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 rounded-xl border border-purple-400/30 bg-purple-400/5 text-purple-400 font-semibold text-xs md:text-sm hover:bg-purple-400/10 transition-all"
              >
                ← Back to 3D View
              </button>
            </div>
          </div>
          
          {/* AR Preview Container */}
          <div className="rounded-2xl md:rounded-3xl border border-purple-400/20 bg-[#09070f]/60 backdrop-blur-md overflow-hidden shadow-[0_0_60px_rgba(153,85,255,0.2)]">
            
            {/* Room Background with 3D Model Overlay */}
            <div 
              className="relative" 
              style={{ 
                height: 'calc(100vh - 250px)', 
                minHeight: '400px',
                maxHeight: '700px',
                backgroundImage: `url(${roomBackgrounds[selectedRoom]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Overlay for better model visibility */}
              <div className="absolute inset-0 bg-black/20" />

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#09070f]/80 backdrop-blur-sm z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-purple-400 font-semibold">Loading AR Preview...</p>
                  </div>
                </div>
              )}

              {/* 3D Model in Center */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  width: `${300 * scale}px`,
                  height: `${300 * scale}px`,
                  transition: 'all 0.3s ease',
                }}
              >
                <model-viewer
                  ref={viewerRef}
                  src={product.modelUrl}
                  alt={product.name}
                  camera-controls
                  auto-rotate
                  shadow-intensity="2"
                  exposure="1.2"
                  camera-orbit="45deg 75deg 2m"
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                  }}
                />
              </div>

              {/* Info Badge - Top Left */}
              <div className="absolute top-4 left-4 bg-purple-900/90 backdrop-blur-md border border-purple-400/30 rounded-xl px-4 py-3 z-20 shadow-lg">
                <p className="text-white font-bold text-sm md:text-lg">{product.name}</p>
                <p className="text-purple-300 text-xs md:text-sm">PKR {product.price.toLocaleString()}</p>
              </div>

              {/* Instructions Toggle Button - Top Right (Mobile Friendly) */}
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="w-12 h-12 md:w-auto md:h-auto md:px-4 md:py-3 rounded-xl bg-purple-900/90 backdrop-blur-md border border-purple-400/30 text-white font-semibold text-sm hover:bg-purple-800/90 transition-all shadow-lg flex items-center justify-center gap-2"
                  title="How to use"
                >
                  <span className="text-lg">💡</span>
                  <span className="hidden md:inline">Help</span>
                </button>
              </div>

              {/* Instructions Popup (Collapsible) */}
              {showInstructions && (
                <div className="absolute top-20 right-4 bg-purple-900/95 backdrop-blur-md border border-purple-400/30 rounded-2xl px-5 py-4 z-30 max-w-xs shadow-2xl animate-fadeIn">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white font-semibold text-sm">💡 How to use:</p>
                    <button
                      onClick={() => setShowInstructions(false)}
                      className="text-purple-300 hover:text-white text-lg leading-none"
                    >
                      ✕
                    </button>
                  </div>
                  <ul className="text-purple-200 text-xs space-y-2">
                    <li>• Drag to rotate the model</li>
                    <li>• Use scale slider to resize</li>
                    <li>• Change room background</li>
                    <li>• For real AR, use mobile device</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="border-t border-purple-400/10 bg-[#09070f]/40 p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                
                {/* Scale Control */}
                <div>
                  <label className="text-purple-400 font-semibold text-xs md:text-sm mb-2 md:mb-3 block">
                    📏 Scale: {Math.round(scale * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full h-2 bg-purple-400/20 rounded-lg appearance-none cursor-pointer"
                    style={{
                      accentColor: '#9955ff',
                    }}
                  />
                  <div className="flex justify-between text-purple-400/60 text-[10px] md:text-xs mt-1.5 md:mt-2">
                    <span>Small</span>
                    <span>Large</span>
                  </div>
                </div>

                {/* Room Selection */}
                <div>
                  <label className="text-purple-400 font-semibold text-xs md:text-sm mb-2 md:mb-3 block">
                    🏠 Room Background
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(roomBackgrounds).map((room) => (
                      <button
                        key={room}
                        onClick={() => setSelectedRoom(room)}
                        className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                          selectedRoom === room
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-400/10 text-purple-300 hover:bg-purple-400/20'
                        }`}
                      >
                        {room.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile AR CTA */}
              <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-xl bg-gradient-to-r from-purple-900/40 to-purple-800/40 border border-purple-400/20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-white font-bold text-xs md:text-sm mb-1">📱 Want Real AR Experience?</p>
                    <p className="text-purple-300 text-[10px] md:text-xs">Open this page on your mobile device for true augmented reality</p>
                  </div>
                  <button
                    onClick={() => {
                      const url = window.location.href.replace('/ar-preview', '/3d-view')
                      navigator.clipboard.writeText(url)
                      toast.success('Link copied! Open it on your mobile device.')
                    }}
                    className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 rounded-xl bg-purple-400 text-black font-bold text-xs md:text-sm hover:bg-purple-300 transition-all whitespace-nowrap"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Actions */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
            <button
              onClick={() => navigate(`/products/${slug}`)}
              className="py-3 md:py-4 rounded-xl bg-purple-400 text-black font-bold text-sm md:text-base hover:bg-purple-300 transition-all shadow-lg"
            >
              View Product Details
            </button>
            <button
              onClick={() => navigate(`/products/${slug}/3d-view`)}
              className="py-3 md:py-4 rounded-xl border border-purple-400/30 bg-purple-400/5 text-purple-400 font-semibold text-sm md:text-base hover:bg-purple-400/10 transition-all"
            >
              Back to 3D View
            </button>
            <button
              onClick={() => navigate('/products')}
              className="py-3 md:py-4 rounded-xl border border-purple-400/30 bg-purple-400/5 text-purple-400 font-semibold text-sm md:text-base hover:bg-purple-400/10 transition-all"
            >
              Browse More Products
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default ARPreview
