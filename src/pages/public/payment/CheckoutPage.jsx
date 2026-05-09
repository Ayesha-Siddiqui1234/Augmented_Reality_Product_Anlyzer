// src/pages/public/CheckoutPage.jsx

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  selectCartItemsByUser,
  selectCartTotalByUser,
  clearCart,
} from "../../../features/cart/cartSlice";
import PublicNavbar from "../../../components/PublicNavbar";


const CheckoutPage = () => {
  const navigate = useNavigate()
  const userId = 'user-1'

  const cartItems = useSelector(state => selectCartItemsByUser(state, userId))
  const cartTotal = useSelector(state => selectCartTotalByUser(state, userId))

  const tax = Math.round(cartTotal * 0.18)
  const grandTotal = cartTotal + tax

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleProceedToPayment = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      alert('Please fill all delivery details.')
      return
    }

    const checkoutData = {
      customer: formData,
      items: cartItems,
      subtotal: cartTotal,
      tax,
      total: grandTotal,
      paymentMethod: 'Stripe Simulation',
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem('checkoutData', JSON.stringify(checkoutData))

    navigate('/stripe-simulation')
  }

  if (cartItems.length === 0) {
    return (
      <>
        <PublicNavbar />
        <main className="min-h-screen bg-[#09070f] text-purple-400 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 rounded-full bg-purple-400 text-black font-bold"
            >
              Browse Products
            </button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <PublicNavbar />

      <main className="min-h-screen bg-[#09070f] text-purple-400 px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Delivery Form */}
            <div className="lg:col-span-2 rounded-2xl border border-purple-400/20 bg-[#120d1d] p-6">
              <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="bg-black/40 border border-purple-400/20 rounded-xl px-4 py-3 outline-none"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-black/40 border border-purple-400/20 rounded-xl px-4 py-3 outline-none"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="bg-black/40 border border-purple-400/20 rounded-xl px-4 py-3 outline-none"
                />

                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="bg-black/40 border border-purple-400/20 rounded-xl px-4 py-3 outline-none"
                />

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Complete Address"
                  rows="4"
                  className="md:col-span-2 bg-black/40 border border-purple-400/20 rounded-xl px-4 py-3 outline-none resize-none"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-2xl border border-purple-400/20 bg-[#120d1d] p-6 h-fit">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.productId} className="flex justify-between text-sm text-purple-100/70">
                    <span>{item.name} × {item.quantity}</span>
                    <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-purple-400/20 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>PKR {cartTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax 18%</span>
                  <span>PKR {tax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-xl font-bold text-purple-400 border-t border-purple-400/20 pt-4">
                  <span>Total</span>
                  <span>PKR {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full mt-6 py-4 rounded-full bg-purple-400 text-black font-bold hover:bg-purple-300 transition"
              >
                Continue to Stripe Test Payment
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default CheckoutPage