// src/pages/public/CheckoutPage.jsx

// src/pages/public/payment/CheckoutPage.jsx

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Navbar from '../../../components/Navbar'

import {
  fetchCart,
  selectCartItems,
  selectCartSummary,
  selectCartLoading,
} from '../../../features/cart/cartSlice'

import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '../../../features/auth/authSlice'
const CheckoutPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isAuthenticated = useSelector(selectIsAuthenticated)
  const currentUser = useSelector(selectCurrentUser)

  const cartItems = useSelector(selectCartItems)
  const cartSummary = useSelector(selectCartSummary)
  const loading = useSelector(selectCartLoading)

  const cartTotal = cartSummary?.subtotal || 0
  const tax = cartSummary?.tax ?? Math.round(cartTotal * 0.18)
  const grandTotal = cartSummary?.total ?? cartTotal + tax

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
  })

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      navigate('/login', { state: { from: '/checkout' } })
      return
    }

    dispatch(fetchCart())
  }, [dispatch, isAuthenticated, currentUser, navigate])

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.fullName || '',
        email: prev.email || currentUser.email || '',
      }))
    }
  }, [currentUser])

  const handleChange = (e) => {
    setFormData((prev) => ({
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
      user: currentUser?._id,
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

  if (loading && cartItems.length === 0) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#09070f] text-purple-400 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4 animate-pulse">🛒</div>
            <h1 className="text-3xl font-bold mb-4">Loading checkout...</h1>
          </div>
        </main>
      </>
    )
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#09070f] text-purple-400 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-purple-100/60 mb-6">
              Add products to your cart before checkout.
            </p>
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
      <Navbar />

      <main className="min-h-screen bg-[#09070f] text-purple-400 px-4 py-28">
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
                  className="bg-black/40 border border-purple-400/20 rounded-xl px-4 py-3 outline-none text-purple-100"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-black/40 border border-purple-400/20 rounded-xl px-4 py-3 outline-none text-purple-100"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="bg-black/40 border border-purple-400/20 rounded-xl px-4 py-3 outline-none text-purple-100"
                />

                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="bg-black/40 border border-purple-400/20 rounded-xl px-4 py-3 outline-none text-purple-100"
                />

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Complete Address"
                  rows="4"
                  className="md:col-span-2 bg-black/40 border border-purple-400/20 rounded-xl px-4 py-3 outline-none resize-none text-purple-100"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-2xl border border-purple-400/20 bg-[#120d1d] p-6 h-fit">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {cartItems.map((item) => {
                  const productId = item.product || item.productId

                  return (
                    <div
                      key={productId}
                      className="flex justify-between gap-4 text-sm text-purple-100/70"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>
                        PKR {Number((item.price || 0) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  )
                })}
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