// src/pages/public/payment/PaymentSuccessPage.jsx

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Navbar from '../../../components/Navbar'

import {
  clearUserCart,
} from '../../../features/cart/cartSlice'

const PaymentSuccessPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const latestOrder = JSON.parse(localStorage.getItem('latestOrder'))

  const handleContinue = async () => {
    await dispatch(clearUserCart())

    localStorage.removeItem('checkoutData')
    localStorage.removeItem('latestOrder')

    navigate('/products')
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#09070f] text-purple-400 flex items-center justify-center px-4 py-28">
        <div className="max-w-xl w-full rounded-2xl border border-emerald-400/30 bg-[#120d1d] p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center mx-auto text-4xl mb-6">
            ✓
          </div>

          <h1 className="text-3xl font-extrabold mb-3">
            Payment Successful
          </h1>

          <p className="text-purple-100/70 mb-6">
            Your Stripe test payment was completed successfully.
          </p>

          {latestOrder && (
            <div className="text-left rounded-xl bg-black/30 border border-purple-400/20 p-4 mb-6 space-y-2">
              <div className="flex justify-between gap-4">
                <span>Order ID</span>
                <span className="font-bold">{latestOrder.id}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Payment Status</span>
                <span className="text-emerald-300 font-bold">
                  {latestOrder.paymentStatus}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Total</span>
                <span className="font-bold">
                  PKR {Number(latestOrder.total || 0).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleContinue}
            className="w-full py-4 rounded-full bg-purple-400 text-black font-bold hover:bg-purple-300 transition"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    </>
  )
}

export default PaymentSuccessPage