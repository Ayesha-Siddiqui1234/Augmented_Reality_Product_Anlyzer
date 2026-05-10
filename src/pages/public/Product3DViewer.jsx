// src/pages/public/Product3DViewer.jsx

import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProductBySlug } from '../../features/products/productSlice'


const Product3DViewer = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const viewerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const product = useSelector(state => selectProductBySlug(state, slug))

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

    script.onerror = () => {
      setError('Failed to load 3D viewer')
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
        <PublicNavbar />
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
      </>
    )
  }

  if (!product.arSupported || !product.modelUrl) {
    return (
      <>
        <PublicNavbar />
        <div className="min-h-screen flex items-center justify-center" style={{background:'#09070f'}}>
          <div className="text-center">
            <span className="text-6xl mb-4 block">📦</span>
            <h1 className="text-2xl font-bold text-purple-400 mb-2">3D Model Not Available</h1>
            <p className="text-purple-100/60 mb-6">This product doesn't have a 3D model yet.</p>
            <button
              onClick={() => navigate(`/products/${slug}`)}
              className="px-8 py-3 rounded-full bg-purple-400 text-black font-bold hover:bg-purple-300 transition"
            >
              Back to Product
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PublicNavbar />
      
      <main className="min-h-screen text-purple-400" style={{background:'#09070f'}}>
        
        {/* Global Styles */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
          body { font-family: 'Poppins', sans-serif; }
          
          model-viewer {
            width: 100%;
            height: 100%;
            --poster-color: transparent;
          }

          model-viewer::part(default-progress-bar) {
            background-color: #9955ff;
          }
        `}</style>

        {/* Breadcrumb */}
        <div className="border-b border-purple-400/10 py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-purple-400/60">
            <button onClick={() => navigate('/')} className="hover:text-purple-400 transition">Home</button>
            <span>/</span>
            <button onClick={() => navigate('/products')} className="hover:text-purple-400 transition">Products</button>
            <span>/</span>
            <button onClick={() => navigate(`/products/${slug}`)} className="hover:text-purple-400 transition">{product.name}</button>
            <span>/</span>
            <span className="text-purple-400">3D View</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-purple-400/60 text-xs tracking-[0.3em] uppercase mb-2">3D Interactive View</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-purple-400 leading-tight">
                {product.name}
              </h1>
            </div>
            <button
              onClick={() => navigate(`/products/${slug}`)}
              className="px-6 py-3 rounded-xl border border-purple-400/30 bg-purple-400/5 text-purple-400 font-semibold text-sm hover:bg-purple-400/10 transition-all"
            >
              ← Back to Product
            </button>
          </div>

          {/* 3D Viewer Container */}
          <div className="rounded-3xl border border-purple-400/20 bg-[#09070f]/60 backdrop-blur-md overflow-hidden shadow-[0_0_60px_rgba(153,85,255,0.2)]">
            
            {/* Viewer */}
            <div className="relative" style={{ height: 'calc(100vh - 300px)', minHeight: '500px' }}>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#09070f]/80 backdrop-blur-sm z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-purple-400 font-semibold">Loading 3D Model...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#09070f]/80 backdrop-blur-sm z-10">
                  <div className="text-center">
                    <span className="text-6xl mb-4 block">⚠️</span>
                    <p className="text-red-400 font-semibold">{error}</p>
                  </div>
                </div>
              )}

              <model-viewer
                ref={viewerRef}
                src={product.modelUrl}
                alt={product.name}
                camera-controls
                auto-rotate
                shadow-intensity="1"
                environment-image="neutral"
                exposure="1"
                shadow-softness="0.5"
                ar
                ar-modes="webxr scene-viewer quick-look"
                ar-scale="auto"
                camera-orbit="45deg 75deg 2.5m"
                min-camera-orbit="auto auto 1m"
                max-camera-orbit="auto auto 10m"
                style={{
                  background: 'linear-gradient(135deg, #09070f 0%, #1a0f2e 100%)',
                }}
              >
              </model-viewer>

              {/* Custom AR Button - Always Visible */}
              <button
                onClick={() => {
                  const viewer = viewerRef.current
                  // Check if device supports AR
                  if (viewer && viewer.canActivateAR) {
                    viewer.activateAR()
                  } else {
                    // For desktop/laptop - show virtual AR preview
                    navigate(`/products/${slug}/ar-preview`)
                  }
                }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold text-base hover:from-purple-400 hover:to-purple-600 transition-all shadow-[0_0_40px_rgba(153,85,255,0.6)] hover:shadow-[0_0_60px_rgba(153,85,255,0.8)] hover:scale-105 z-30 flex items-center gap-3"
              >
                <span className="text-2xl">📱</span>
                <span>View in Your Space (AR)</span>
              </button>
            </div>

            {/* Controls Info */}
            <div className="border-t border-purple-400/10 bg-[#09070f]/40 p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-2xl">
                    🖱️
                  </div>
                  <p className="text-purple-400 font-semibold text-sm">Drag to Rotate</p>
                  <p className="text-purple-100/40 text-xs">Click and drag to spin the model</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-2xl">
                    🔍
                  </div>
                  <p className="text-purple-400 font-semibold text-sm">Scroll to Zoom</p>
                  <p className="text-purple-100/40 text-xs">Use mouse wheel to zoom in/out</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-2xl">
                    🔄
                  </div>
                  <p className="text-purple-400 font-semibold text-sm">Auto Rotate</p>
                  <p className="text-purple-100/40 text-xs">Model rotates automatically</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-2xl">
                    📱
                  </div>
                  <p className="text-purple-400 font-semibold text-sm">AR Ready</p>
                  <p className="text-purple-100/40 text-xs">View in your actual space</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-purple-400/15 bg-[#09070f]/60 backdrop-blur-md p-6">
              <h3 className="text-purple-400 font-bold text-lg mb-4">Product Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-100/60">Price</span>
                  <span className="text-purple-400 font-bold">PKR {product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-100/60">Category</span>
                  <span className="text-purple-300">{product.categoryLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-100/60">Material</span>
                  <span className="text-purple-300">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-100/60">Brand</span>
                  <span className="text-purple-300">{product.brand}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-purple-400/15 bg-[#09070f]/60 backdrop-blur-md p-6">
              <h3 className="text-purple-400 font-bold text-lg mb-4">Dimensions</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-100/60">Width</span>
                  <span className="text-purple-300">{product.dimensions.width}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-100/60">Height</span>
                  <span className="text-purple-300">{product.dimensions.height}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-100/60">Depth</span>
                  <span className="text-purple-300">{product.dimensions.depth}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-purple-400/15 bg-[#09070f]/60 backdrop-blur-md p-6">
              <h3 className="text-purple-400 font-bold text-lg mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/products/${slug}`)}
                  className="w-full py-3 rounded-xl bg-purple-400 text-black font-bold text-sm hover:bg-purple-300 transition-all shadow-lg"
                >
                  View Full Details
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="w-full py-3 rounded-xl border border-purple-400/30 bg-purple-400/5 text-purple-400 font-semibold text-sm hover:bg-purple-400/10 transition-all"
                >
                  Browse More Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Product3DViewer
