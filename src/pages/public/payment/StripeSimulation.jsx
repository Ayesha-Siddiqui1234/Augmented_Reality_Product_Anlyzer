// src/pages/public/StripeSimulationPage.jsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { API_ENDPOINTS } from '../../../config/api'

const PAYMENT_API_URL = API_ENDPOINTS.PAYMENTS

const StripeSimulationPage = () => {
  const navigate = useNavigate()

  const checkoutData = JSON.parse(localStorage.getItem('checkoutData'))
  const simulationOrderId = localStorage.getItem('simulationOrderId')

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
  })

  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    setCardData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handlePayment = async () => {
    if (
      !cardData.cardNumber ||
      !cardData.expiry ||
      !cardData.cvc ||
      !cardData.name
    ) {
      toast.error('Please fill all card details.')
      return
    }

    if (!simulationOrderId) {
      toast.error('No backend order found. Please checkout again.')
      navigate('/checkout')
      return
    }

    try {
      setIsProcessing(true)

      const token = localStorage.getItem('token')

      if (!token) {
        toast.error('Please login first.')
        navigate('/login')
        return
      }

      const response = await axios.patch(
        `${PAYMENT_API_URL}/simulation/confirm/${simulationOrderId}`,
        {
          cardNumber: cardData.cardNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const paidOrder = response.data.order

      localStorage.setItem(
        'latestOrder',
        JSON.stringify({
          id: paidOrder._id,
          paymentStatus: paidOrder.paymentStatus,
          orderStatus: paidOrder.orderStatus,
          transactionId: paidOrder.simulationTransactionId,
          total: paidOrder.total,
          paidAt: paidOrder.paidAt,
        })
      )

      navigate('/payment-success')
    } catch (error) {
      const cleanCardNumber = cardData.cardNumber.replace(/\s/g, '')

      if (cleanCardNumber === '4000000000009995') {
        navigate('/payment-cancel?reason=card_declined')
        return
      }

      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Payment failed.'
      )

      setIsProcessing(false)
    }
  }

  const handleCancelPayment = async () => {
    try {
      const token = localStorage.getItem('token')

      if (simulationOrderId && token) {
        await axios.patch(
          `${PAYMENT_API_URL}/simulation/cancel/${simulationOrderId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message)
    } finally {
      navigate('/payment-cancel')
    }
  }

  if (!checkoutData) {
    return (
      <main className="min-h-screen bg-[#09070f] text-purple-400 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No checkout data found</h1>

          <button
            onClick={() => navigate('/cart')}
            className="px-6 py-3 rounded-full bg-purple-400 text-black font-bold"
          >
            Back to Cart
          </button>
        </div>
      </main>
    )
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <main className="min-h-screen bg-[#f6f9fc] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#635bff] text-white px-6 py-5">
          <h1 className="text-2xl font-bold">Stripe Test Checkout</h1>
          <p className="text-sm opacity-90">
            Simulation only — no real money charged
          </p>
        </div>

        <div className="p-6">
          <div className="mb-6 rounded-xl bg-gray-50 p-4 border">
            <p className="text-gray-500 text-sm">Total Amount</p>
            <h2 className="text-3xl font-bold text-gray-900">
              PKR {Number(checkoutData.total || 0).toLocaleString()}
            </h2>
          </div>

          <div className="mb-5 rounded-xl bg-blue-50 border border-blue-200 p-4 text-sm text-blue-700">
            <p className="font-bold mb-1">Use this test card:</p>
            <p>4242 4242 4242 4242</p>
            <p>Expiry: any future date</p>
            <p>CVC: any 3 digits</p>

            <p className="font-bold mt-3 mb-1">Decline test:</p>
            <p>4000 0000 0000 9995</p>
          </div>

          <div className="space-y-4">
            <input
              name="name"
              value={cardData.name}
              onChange={handleChange}
              placeholder="Name on card"
              className="w-full border rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-[#635bff]"
            />

            <input
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleChange}
              placeholder="Card number"
              className="w-full border rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-[#635bff]"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="expiry"
                value={cardData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full border rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-[#635bff]"
              />

              <input
                name="cvc"
                value={cardData.cvc}
                onChange={handleChange}
                placeholder="CVC"
                className="w-full border rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-[#635bff]"
              />
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full mt-6 py-4 rounded-xl bg-[#635bff] text-white font-bold hover:bg-[#5146e8] transition disabled:opacity-60"
          >
            {isProcessing
              ? 'Processing payment...'
              : `Pay PKR ${Number(checkoutData.total || 0).toLocaleString()}`}
          </button>

          <button
            onClick={handleCancelPayment}
            disabled={isProcessing}
            className="w-full mt-3 py-3 rounded-xl border text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-60"
          >
            Cancel Payment
          </button>
        </div>
      </div>
    </main>
    </>
  )
}

export default StripeSimulationPage