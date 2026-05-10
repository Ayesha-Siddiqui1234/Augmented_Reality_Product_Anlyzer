// // src/pages/public/CartPage.jsx

// import { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import {
//   fetchCart,
//   selectCartItems,
//   selectCartSummary,
//   selectCartLoading,
//   removeProductFromCart,
//   increaseCartQuantity,
//   decreaseCartQuantity,
//   clearUserCart,
// } from '../../features/cart/cartSlice'
// import { selectProductById } from '../../features/products/productSlice'
// import {
//   selectIsAuthenticated,
//   selectCurrentUser,
// } from '../../features/auth/authSlice'
// import Navbar from '../../components/Navbar'


// const CartItemWith3D = ({ item, onIncrease, onDecrease, onRemove }) => {
//   const navigate = useNavigate()
//   const product = useSelector(state => selectProductById(state, item.productId))

//   useEffect(() => {
//     // Load model-viewer script if not already loaded
//     if (!document.querySelector('script[src*="model-viewer"]')) {
//       const script = document.createElement('script')
//       script.type = 'module'
//       script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js'
//       document.head.appendChild(script)
//     }
//   }, [])

//   return (
//     <div className="card-glow rounded-xl md:rounded-2xl border border-purple-400/15 bg-[#09070f]/60 backdrop-blur-md p-3 md:p-6 flex flex-col sm:flex-row gap-3 md:gap-6">
//       {/* 3D Model Preview */}
//       {product?.arSupported && product?.modelUrl ? (
//         <div
//           onClick={() => navigate(`/products/${product.slug}/3d-view`)}
//           className="flex-shrink-0 w-full sm:w-32 md:w-40 h-32 md:h-40 rounded-xl overflow-hidden bg-gradient-to-br from-purple-400/10 to-purple-600/10 border border-purple-400/20 cursor-pointer group relative"
//         >
//           <model-viewer
//             src={product.modelUrl}
//             alt={item.name}
//             auto-rotate
//             camera-controls
//             disable-zoom
//             camera-orbit="45deg 75deg 1.5m"
//             style={{
//               width: '100%',
//               height: '100%',
//               background: 'transparent',
//             }}
//           />
//           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
//             <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] md:text-xs font-bold bg-purple-400/90 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
//               🧊 View in 3D
//             </span>
//           </div>
//         </div>
//       ) : (
//         <div
//           onClick={() => navigate(`/products/${item.productId}`)}
//           className="flex-shrink-0 w-full sm:w-32 md:w-40 h-32 md:h-40 rounded-xl overflow-hidden bg-purple-400/5 cursor-pointer group"
//         >
//           <img
//             src={item.imageUrl}
//             alt={item.name}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//           />
//         </div>
//       )}

//       {/* Info */}
//       <div className="flex-1 flex flex-col justify-between">
//         <div>
//           <h3
//             onClick={() => navigate(`/products/${item.productId}`)}
//             className="text-purple-100 font-bold text-base md:text-lg mb-1 md:mb-2 cursor-pointer hover:text-purple-400 transition"
//           >
//             {item.name}
//           </h3>
//           <p className="text-purple-400 font-bold text-lg md:text-xl">
//             PKR {item.price.toLocaleString()}
//           </p>
//           {product?.arSupported && (
//             <span className="inline-block mt-1.5 md:mt-2 px-2 md:px-3 py-0.5 md:py-1 text-[9px] md:text-[10px] font-bold tracking-widest rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 uppercase">
//               AR Ready
//             </span>
//           )}
//         </div>

//         {/* Quantity Controls */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4 mt-3 md:mt-4">
//           <div className="flex items-center gap-2 md:gap-3 bg-purple-400/5 border border-purple-400/20 rounded-lg md:rounded-xl px-3 md:px-4 py-1.5 md:py-2">
//             <button
//               onClick={() => onDecrease(item.productId)}
//               className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-purple-400/10 text-purple-400 font-bold hover:bg-purple-400/20 transition flex items-center justify-center text-sm md:text-base"
//             >
//               −
//             </button>
//             <span className="w-10 md:w-12 text-center text-base md:text-lg font-bold text-purple-400">
//               {item.quantity}
//             </span>
//             <button
//               onClick={() => {
//                 if (item.quantity >= item.stock) {
//                   alert(`Maximum stock limit! Only ${item.stock} items available.`)
//                 } else {
//                   onIncrease(item.productId)
//                 }
//               }}
//               className={`w-7 h-7 md:w-8 md:h-8 rounded-lg font-bold transition flex items-center justify-center text-sm md:text-base ${
//                 item.quantity >= item.stock
//                   ? 'bg-red-400/10 text-red-400 cursor-not-allowed'
//                   : 'bg-purple-400/10 text-purple-400 hover:bg-purple-400/20'
//               }`}
//               disabled={item.quantity >= item.stock}
//             >
//               +
//             </button>
//           </div>
          
//           {item.quantity >= item.stock && (
//             <span className="text-[10px] md:text-xs text-red-400 font-semibold">
//               Max stock reached!
//             </span>
//           )}

//           <button
//             onClick={() => onRemove(item.productId)}
//             className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-red-400/30 bg-red-400/5 text-red-400 text-xs md:text-sm font-semibold hover:bg-red-400/10 transition"
//           >
//             Remove
//           </button>
//         </div>
//       </div>

//       {/* Subtotal */}
//       <div className="flex-shrink-0 text-left sm:text-right mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-purple-400/10">
//         <p className="text-purple-400/60 text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2">Subtotal</p>
//         <p className="text-purple-400 font-bold text-lg md:text-2xl">
//           PKR {(item.price * item.quantity).toLocaleString()}
//         </p>
//       </div>
//     </div>
//   )
// }

// const CartPage = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
  
//   const isAuthenticated = useSelector(selectIsAuthenticated)
// const currentUser = useSelector(selectCurrentUser)
// const cartItems = useSelector(selectCartItems)
// const cartSummary = useSelector(selectCartSummary)
// const loading = useSelector(selectCartLoading)

// const cartTotal = cartSummary.subtotal || 0


// useEffect(() => {
//   if (!isAuthenticated || !currentUser) {
//     navigate('/login', { state: { from: '/cart' } })
//     return
//   }

//   dispatch(fetchCart())
// }, [dispatch, isAuthenticated, currentUser, navigate])

//  const handleRemove = (productId) => {
//   dispatch(removeProductFromCart(productId))
// }

// const handleIncrease = (productId) => {
//   dispatch(increaseCartQuantity(productId))
// }

// const handleDecrease = (productId) => {
//   dispatch(decreaseCartQuantity(productId))
// }

// const handleClearCart = () => {
//   if (window.confirm('Are you sure you want to clear your cart?')) {
//     dispatch(clearUserCart())
//   }
// }

//   const handleCheckout = () => {
//     // Check if user is authenticated
//     if (!isAuthenticated) {
//       // Redirect to login with return path
//       navigate('/login', { state: { from: '/cart' } })
//       return
//     }
    
//     // Proceed with checkout
//     navigate('/checkout')
//   }

//   return (
//     <>
//       <Navbar />
      
//       <main className="min-h-screen text-purple-400" style={{background:'#09070f'}}>
        
//         {/* Global Styles */}
//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
//           body { font-family: 'Poppins', sans-serif; }
          
//           /* Light Theme Styles */
//           .light-theme main {
//             background: linear-gradient(135deg, #f5f3ff 0%, #e9d5ff 100%) !important;
//           }
          
//           .light-theme .text-purple-400 {
//             color: #7c3aed !important;
//           }
          
//           .light-theme .text-purple-100 {
//             color: #5b21b6 !important;
//           }
          
//           .light-theme .text-purple-100\\/60 {
//             color: #6d28d9 !important;
//           }
          
//           .light-theme .text-purple-400\\/60 {
//             color: #7c3aed !important;
//           }
          
//           .light-theme .bg-\\[\\#09070f\\]\\/60,
//           .light-theme .bg-\\[\\#09070f\\]\\/40 {
//             background: rgba(255, 255, 255, 0.95) !important;
//             border-color: rgba(139, 92, 246, 0.3) !important;
//           }
          
//           .light-theme .border-purple-400\\/15,
//           .light-theme .border-purple-400\\/10,
//           .light-theme .border-purple-400\\/20 {
//             border-color: rgba(139, 92, 246, 0.3) !important;
//           }
          
//           .grid-bg {
//             background-image:
//               linear-gradient(rgba(153,85,255,0.04) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(153,85,255,0.04) 1px, transparent 1px);
//             background-size: 60px 60px;
//           }
          
//           .card-glow:hover {
//             box-shadow: 0 0 40px rgba(153,85,255,0.2), 0 20px 60px rgba(0,0,0,0.5);
//             transform: translateY(-2px);
//             border-color: rgba(153,85,255,0.4);
//           }
//           .card-glow { transition: all 0.4s ease; }
          
//           ::-webkit-scrollbar { width: 4px; }
//           ::-webkit-scrollbar-track { background: #000; }
//           ::-webkit-scrollbar-thumb { background: #9955ff; border-radius: 2px; }

//           /* Model Viewer Styles */
//           model-viewer {
//             width: 100%;
//             height: 100%;
//             --poster-color: transparent;
//           }

//           model-viewer::part(default-progress-bar) {
//             background-color: #9955ff;
//           }
//         `}</style>

//         <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
          
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-12 gap-4">
//             <div>
//               <p className="text-purple-400/60 text-[10px] md:text-xs mt-[45px] tracking-[0.3em] md:tracking-[0.4em] uppercase mb-2 md:mb-3">Your Shopping</p>
//               <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-purple-400 leading-tight flex items-center gap-3 md:gap-4">
//                 Shopping Cart
//                 {cartItems.length > 0 && (
//                   <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-400 text-black text-base md:text-lg font-bold shadow-[0_0_20px_rgba(153,85,255,0.4)]">
//                     {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
//                   </span>
//                 )}
//               </h1>
//               <p className="mt-2 md:mt-3 text-purple-100/60 text-xs md:text-sm">
//                 {cartItems.length === 0 ? 'Your cart is empty' : `${cartItems.length} product${cartItems.length !== 1 ? 's' : ''} in your cart`}
//               </p>
//             </div>
            
//             {cartItems.length > 0 && (
//               <button
//                 onClick={handleClearCart}
//                 className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 rounded-full border border-red-400/30 bg-red-400/5 text-red-400 font-semibold text-xs md:text-sm hover:bg-red-400/10 transition-all"
//               >
//                 Clear Cart
//               </button>
//             )}
//           </div>

//           {/* Empty State or Cart Content */}
//           {cartItems.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-12 md:py-24 gap-4 md:gap-6 text-center px-4">
//               <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-purple-400/10 border-2 border-purple-400/30 flex items-center justify-center text-4xl md:text-5xl">
//                 🛒
//               </div>
//               <div>
//                 <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-2">Your cart is empty</h2>
//                 <p className="text-purple-100/60 text-xs md:text-sm max-w-md leading-relaxed">
//                   Browse our products and add items to your cart to get started.
//                 </p>
//               </div>
//               <button
//                 onClick={() => navigate('/products')}
//                 className="mt-2 md:mt-4 px-6 md:px-8 py-3 md:py-4 rounded-full bg-purple-400 text-black font-bold text-sm md:text-base hover:bg-purple-300 transition-all shadow-[0_0_30px_rgba(153,85,255,0.3)]"
//               >
//                 Browse Products
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
//               {/* Cart Items */}
//               <div className="lg:col-span-2 space-y-4">
//                 {cartItems.map(item => (
//                   <CartItemWith3D
//                     key={item.productId}
//                     item={item}
//                     onIncrease={handleIncrease}
//                     onDecrease={handleDecrease}
//                     onRemove={handleRemove}
//                   />
//                 ))}
//               </div>

//               {/* Order Summary */}
//               <div className="lg:col-span-1">
//                 <div className="sticky top-20 md:top-32 card-glow rounded-xl md:rounded-2xl border border-purple-400/15 bg-[#09070f]/60 backdrop-blur-md p-4 md:p-6">
//                   <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-4 md:mb-6">Order Summary</h2>
                  
//                   <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
//                     <div className="flex justify-between text-purple-100/60 text-sm md:text-base">
//                       <span>Subtotal</span>
//                       <span className="font-semibold">PKR {cartTotal.toLocaleString()}</span>
//                     </div>
//                     <div className="flex justify-between text-purple-100/60 text-sm md:text-base">
//                       <span>Shipping</span>
//                       <span className="font-semibold text-emerald-400">Free</span>
//                     </div>
//                     <div className="flex justify-between text-purple-100/60 text-sm md:text-base">
//                       <span>Tax (18%)</span>
//                       <span className="font-semibold">PKR {Math.round(cartTotal * 0.18).toLocaleString()}</span>
//                     </div>
                    
//                     <div className="border-t border-purple-400/20 pt-3 md:pt-4">
//                       <div className="flex justify-between text-purple-400 text-lg md:text-xl font-bold">
//                         <span>Total</span>
//                         <span>PKR {Math.round(cartTotal * 1.18).toLocaleString()}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleCheckout}
//                     className="w-full py-3 md:py-4 rounded-full bg-purple-400 text-black font-bold text-xs md:text-sm hover:bg-purple-300 transition-all duration-300 shadow-[0_0_40px_rgba(153,85,255,0.3)] mb-3 md:mb-4 flex items-center justify-center gap-2"
//                   >
//                     {isAuthenticated ? (
//                       <>
//                         <span>🔒</span>
//                         <span>Proceed to Checkout</span>
//                       </>
//                     ) : (
//                       <>
//                         <span>🔐</span>
//                         <span>Login to Checkout</span>
//                       </>
//                     )}
//                   </button>

//                   <button
//                     onClick={() => navigate('/products')}
//                     className="w-full py-2.5 md:py-3 rounded-full border border-purple-400/30 bg-purple-400/5 text-purple-400 font-semibold text-xs md:text-sm hover:bg-purple-400/10 transition-all"
//                   >
//                     Continue Shopping
//                   </button>

//                   {/* Features */}
//                   <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-purple-400/10 space-y-2 md:space-y-3">
//                     <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-purple-100/60">
//                       <span className="text-purple-400 text-base md:text-lg">✓</span>
//                       Free Delivery on orders above PKR 25,000
//                     </div>
//                     <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-purple-100/60">
//                       <span className="text-purple-400 text-base md:text-lg">✓</span>
//                       30-Day Returns
//                     </div>
//                     <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-purple-100/60">
//                       <span className="text-purple-400 text-base md:text-lg">✓</span>
//                       Secure Payment
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </>
//   )
// }

// export default CartPage



// src/pages/public/CartPage.jsx

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchCart,
  selectCartItems,
  selectCartSummary,
  selectCartLoading,
  removeProductFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  clearUserCart,
} from '../../features/cart/cartSlice'
import { selectProductById } from '../../features/products/productSlice'
import {
  selectIsAuthenticated,
  selectCurrentUser,
} from '../../features/auth/authSlice'
import Navbar from '../../components/Navbar'

const CartItemWith3D = ({ item, onIncrease, onDecrease, onRemove }) => {
  const navigate = useNavigate()

  // Backend cart uses "product", old frontend used "productId"
  const productId = item.product || item.productId

  const product = useSelector((state) =>
    productId ? selectProductById(state, productId) : null
  )

  useEffect(() => {
    if (!document.querySelector('script[src*="model-viewer"]')) {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js'
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className="card-glow rounded-xl md:rounded-2xl border border-purple-400/15 bg-[#09070f]/60 backdrop-blur-md p-3 md:p-6 flex flex-col sm:flex-row gap-3 md:gap-6">
      {/* 3D Model Preview */}
      {product?.arSupported && product?.modelUrl ? (
        <div
          onClick={() => navigate(`/products/${product.slug}/3d-view`)}
          className="flex-shrink-0 w-full sm:w-32 md:w-40 h-32 md:h-40 rounded-xl overflow-hidden bg-gradient-to-br from-purple-400/10 to-purple-600/10 border border-purple-400/20 cursor-pointer group relative"
        >
          <model-viewer
            src={product.modelUrl}
            alt={item.name}
            auto-rotate
            camera-controls
            disable-zoom
            camera-orbit="45deg 75deg 1.5m"
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent',
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] md:text-xs font-bold bg-purple-400/90 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
              🧊 View in 3D
            </span>
          </div>
        </div>
      ) : (
        <div
          onClick={() => navigate(`/products/${productId}`)}
          className="flex-shrink-0 w-full sm:w-32 md:w-40 h-32 md:h-40 rounded-xl overflow-hidden bg-purple-400/5 cursor-pointer group"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={() => navigate(`/products/${productId}`)}
            className="text-purple-100 font-bold text-base md:text-lg mb-1 md:mb-2 cursor-pointer hover:text-purple-400 transition"
          >
            {item.name}
          </h3>

          <p className="text-purple-400 font-bold text-lg md:text-xl">
            PKR {Number(item.price || 0).toLocaleString()}
          </p>

          {product?.arSupported && (
            <span className="inline-block mt-1.5 md:mt-2 px-2 md:px-3 py-0.5 md:py-1 text-[9px] md:text-[10px] font-bold tracking-widest rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 uppercase">
              AR Ready
            </span>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-4 mt-3 md:mt-4">
          <div className="flex items-center gap-2 md:gap-3 bg-purple-400/5 border border-purple-400/20 rounded-lg md:rounded-xl px-3 md:px-4 py-1.5 md:py-2">
            <button
              onClick={() => onDecrease(productId)}
              className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-purple-400/10 text-purple-400 font-bold hover:bg-purple-400/20 transition flex items-center justify-center text-sm md:text-base"
            >
              −
            </button>

            <span className="w-10 md:w-12 text-center text-base md:text-lg font-bold text-purple-400">
              {item.quantity}
            </span>

            <button
              onClick={() => {
                if (item.quantity >= item.stock) {
                  alert(`Maximum stock limit! Only ${item.stock} items available.`)
                } else {
                  onIncrease(productId)
                }
              }}
              className={`w-7 h-7 md:w-8 md:h-8 rounded-lg font-bold transition flex items-center justify-center text-sm md:text-base ${
                item.quantity >= item.stock
                  ? 'bg-red-400/10 text-red-400 cursor-not-allowed'
                  : 'bg-purple-400/10 text-purple-400 hover:bg-purple-400/20'
              }`}
              disabled={item.quantity >= item.stock}
            >
              +
            </button>
          </div>

          {item.quantity >= item.stock && (
            <span className="text-[10px] md:text-xs text-red-400 font-semibold">
              Max stock reached!
            </span>
          )}

          <button
            onClick={() => onRemove(productId)}
            className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-red-400/30 bg-red-400/5 text-red-400 text-xs md:text-sm font-semibold hover:bg-red-400/10 transition"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="flex-shrink-0 text-left sm:text-right mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-purple-400/10">
        <p className="text-purple-400/60 text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2">
          Subtotal
        </p>
        <p className="text-purple-400 font-bold text-lg md:text-2xl">
          PKR {Number((item.price || 0) * item.quantity).toLocaleString()}
        </p>
      </div>
    </div>
  )
}

const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const currentUser = useSelector(selectCurrentUser)

  const cartItems = useSelector(selectCartItems)
  const cartSummary = useSelector(selectCartSummary)
  const loading = useSelector(selectCartLoading)

  const cartTotal = cartSummary?.subtotal || 0
  const cartTax = cartSummary?.tax ?? Math.round(cartTotal * 0.18)
  const cartFinalTotal = cartSummary?.total ?? cartTotal + cartTax

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      navigate('/login', { state: { from: '/cart' } })
      return
    }

    dispatch(fetchCart())
  }, [dispatch, isAuthenticated, currentUser, navigate])

  const handleRemove = (productId) => {
    dispatch(removeProductFromCart(productId))
  }

  const handleIncrease = (productId) => {
    dispatch(increaseCartQuantity(productId))
  }

  const handleDecrease = (productId) => {
    dispatch(decreaseCartQuantity(productId))
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearUserCart())
    }
  }

  const handleCheckout = () => {
    if (!isAuthenticated || !currentUser) {
      navigate('/login', { state: { from: '/cart' } })
      return
    }

    navigate('/checkout')
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen text-purple-400" style={{ background: '#09070f' }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
          body { font-family: 'Poppins', sans-serif; }

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

          .light-theme .text-purple-400\\/60 {
            color: #7c3aed !important;
          }

          .light-theme .bg-\\[\\#09070f\\]\\/60,
          .light-theme .bg-\\[\\#09070f\\]\\/40 {
            background: rgba(255, 255, 255, 0.95) !important;
            border-color: rgba(139, 92, 246, 0.3) !important;
          }

          .light-theme .border-purple-400\\/15,
          .light-theme .border-purple-400\\/10,
          .light-theme .border-purple-400\\/20 {
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
            transform: translateY(-2px);
            border-color: rgba(153,85,255,0.4);
          }

          .card-glow { transition: all 0.4s ease; }

          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #000; }
          ::-webkit-scrollbar-thumb { background: #9955ff; border-radius: 2px; }

          model-viewer {
            width: 100%;
            height: 100%;
            --poster-color: transparent;
          }

          model-viewer::part(default-progress-bar) {
            background-color: #9955ff;
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-12 gap-4">
            <div>
              <p className="text-purple-400/60 text-[10px] md:text-xs mt-[45px] tracking-[0.3em] md:tracking-[0.4em] uppercase mb-2 md:mb-3">
                Your Shopping
              </p>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-purple-400 leading-tight flex items-center gap-3 md:gap-4">
                Shopping Cart

                {cartItems.length > 0 && (
                  <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-400 text-black text-base md:text-lg font-bold shadow-[0_0_20px_rgba(153,85,255,0.4)]">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </h1>

              <p className="mt-2 md:mt-3 text-purple-100/60 text-xs md:text-sm">
                {loading
                  ? 'Loading your cart...'
                  : cartItems.length === 0
                    ? 'Your cart is empty'
                    : `${cartItems.length} product${cartItems.length !== 1 ? 's' : ''} in your cart`}
              </p>
            </div>

            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                disabled={loading}
                className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 rounded-full border border-red-400/30 bg-red-400/5 text-red-400 font-semibold text-xs md:text-sm hover:bg-red-400/10 transition-all disabled:opacity-50"
              >
                Clear Cart
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 md:py-24 gap-4 md:gap-6 text-center px-4">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-purple-400/10 border-2 border-purple-400/30 flex items-center justify-center text-4xl md:text-5xl animate-pulse">
                🛒
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-purple-400">
                Loading your cart...
              </h2>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 md:py-24 gap-4 md:gap-6 text-center px-4">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-purple-400/10 border-2 border-purple-400/30 flex items-center justify-center text-4xl md:text-5xl">
                🛒
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-purple-100/60 text-xs md:text-sm max-w-md leading-relaxed">
                  Browse our products and add items to your cart to get started.
                </p>
              </div>

              <button
                onClick={() => navigate('/products')}
                className="mt-2 md:mt-4 px-6 md:px-8 py-3 md:py-4 rounded-full bg-purple-400 text-black font-bold text-sm md:text-base hover:bg-purple-300 transition-all shadow-[0_0_30px_rgba(153,85,255,0.3)]"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  const productId = item.product || item.productId

                  return (
                    <CartItemWith3D
                      key={productId}
                      item={item}
                      onIncrease={handleIncrease}
                      onDecrease={handleDecrease}
                      onRemove={handleRemove}
                    />
                  )
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-20 md:top-32 card-glow rounded-xl md:rounded-2xl border border-purple-400/15 bg-[#09070f]/60 backdrop-blur-md p-4 md:p-6">
                  <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-4 md:mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                    <div className="flex justify-between text-purple-100/60 text-sm md:text-base">
                      <span>Subtotal</span>
                      <span className="font-semibold">
                        PKR {cartTotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between text-purple-100/60 text-sm md:text-base">
                      <span>Shipping</span>
                      <span className="font-semibold text-emerald-400">
                        Free
                      </span>
                    </div>

                    <div className="flex justify-between text-purple-100/60 text-sm md:text-base">
                      <span>Tax (18%)</span>
                      <span className="font-semibold">
                        PKR {cartTax.toLocaleString()}
                      </span>
                    </div>

                    <div className="border-t border-purple-400/20 pt-3 md:pt-4">
                      <div className="flex justify-between text-purple-400 text-lg md:text-xl font-bold">
                        <span>Total</span>
                        <span>PKR {cartFinalTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full py-3 md:py-4 rounded-full bg-purple-400 text-black font-bold text-xs md:text-sm hover:bg-purple-300 transition-all duration-300 shadow-[0_0_40px_rgba(153,85,255,0.3)] mb-3 md:mb-4 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>🔒</span>
                    <span>Proceed to Checkout</span>
                  </button>

                  <button
                    onClick={() => navigate('/products')}
                    className="w-full py-2.5 md:py-3 rounded-full border border-purple-400/30 bg-purple-400/5 text-purple-400 font-semibold text-xs md:text-sm hover:bg-purple-400/10 transition-all"
                  >
                    Continue Shopping
                  </button>

                  {/* Features */}
                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-purple-400/10 space-y-2 md:space-y-3">
                    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-purple-100/60">
                      <span className="text-purple-400 text-base md:text-lg">✓</span>
                      Free Delivery on orders above PKR 25,000
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-purple-100/60">
                      <span className="text-purple-400 text-base md:text-lg">✓</span>
                      30-Day Returns
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-purple-100/60">
                      <span className="text-purple-400 text-base md:text-lg">✓</span>
                      Secure Payment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default CartPage