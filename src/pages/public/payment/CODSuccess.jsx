// src/pages/public/payment/CODSuccess.jsx

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../../components/Navbar'

const CODSuccess = () => {
  const navigate = useNavigate()
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    // Get COD order data from localStorage
    const codData = localStorage.getItem('codOrderData')
    
    if (codData) {
      setOrderData(JSON.parse(codData))
    } else {
      // If no order data, redirect to home
      navigate('/')
    }
  }, [navigate])

  const handleContinueShopping = () => {
    // Clear order data
    localStorage.removeItem('codOrderData')
    navigate('/products')
  }

  if (!orderData) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#09070f] flex items-center justify-center">
          <div className="text-purple-400">Loading...</div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-[#09070f] text-purple-400 px-4 py-28 relative overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(153,85,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(153,85,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          
          {/* Success Card */}
          <div className="bg-[#120d1d]/90 backdrop-blur-xl rounded-3xl border border-purple-400/20 shadow-[0_0_80px_rgba(34,197,94,0.2)] p-8 md:p-12">
            
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                {/* Animated Rings */}
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute inset-0 bg-green-500/30 rounded-full animate-ping"></div>
                
                {/* Icon */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,0.5)] animate-bounce-slow">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-400 mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-purple-300/70 text-lg">
                Your order has been confirmed with Cash on Delivery
              </p>
            </div>

            {/* Order Details */}
            <div className="space-y-6 mb-8">
              
              {/* Payment Method */}
              <div className="flex items-center justify-center gap-3 p-4 bg-green-500/10 border border-green-400/30 rounded-xl">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-green-400 font-semibold">Payment Method: Cash on Delivery</span>
              </div>

              {/* Customer Details */}
              <div className="bg-black/40 rounded-2xl border border-purple-400/20 p-6">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Delivery Information</h3>
                <div className="space-y-3 text-purple-100/80">
                  <div className="flex justify-between">
                    <span className="text-purple-400/60">Name:</span>
                    <span className="font-semibold">{orderData.customer.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-400/60">Email:</span>
                    <span className="font-semibold">{orderData.customer.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-400/60">Phone:</span>
                    <span className="font-semibold">{orderData.customer.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-400/60">City:</span>
                    <span className="font-semibold">{orderData.customer.city}</span>
                  </div>
                  <div className="pt-3 border-t border-purple-400/20">
                    <span className="text-purple-400/60">Address:</span>
                    <p className="font-semibold mt-1">{orderData.customer.address}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-black/40 rounded-2xl border border-purple-400/20 p-6">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Order Items</h3>
                <div className="space-y-3">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-purple-100/80">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-semibold">PKR {Number((item.price || 0) * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-black/40 rounded-2xl border border-purple-400/20 p-6">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-purple-100/80">
                    <span>Subtotal</span>
                    <span>PKR {orderData.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-purple-100/80">
                    <span>Tax (18%)</span>
                    <span>PKR {orderData.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-green-400 border-t border-purple-400/20 pt-3">
                    <span>Total Amount</span>
                    <span>PKR {orderData.total.toLocaleString()}</span>
                  </div>
                  <div className="text-center pt-3 border-t border-purple-400/20">
                    <p className="text-sm text-purple-400/60">
                      Pay this amount in cash when your order is delivered
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-4 mb-8">
              <div className="flex gap-3">
                <svg className="w-6 h-6 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-purple-300">
                  <p className="font-semibold mb-1">Important Information:</p>
                  <ul className="list-disc list-inside space-y-1 text-purple-400/70">
                    <li>Your order will be delivered within 3-5 business days</li>
                    <li>Please keep the exact amount ready for payment</li>
                    <li>You can track your order status via email</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleContinueShopping}
                className="flex-1 py-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold transition-all shadow-[0_0_40px_rgba(153,85,255,0.4)] hover:shadow-[0_0_60px_rgba(153,85,255,0.6)] hover:scale-[1.02]"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-4 rounded-full border-2 border-purple-400/30 bg-purple-400/5 hover:bg-purple-400/10 text-purple-400 font-bold transition-all"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </>
  )
}

export default CODSuccess
