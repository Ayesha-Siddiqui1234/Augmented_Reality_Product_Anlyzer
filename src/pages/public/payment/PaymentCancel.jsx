// src/pages/public/PaymentCancelPage.jsx

import { useNavigate, useSearchParams } from 'react-router-dom'
import PublicNavbar from "../../../components/PublicNavbar";
const PaymentCancelPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const reason = searchParams.get('reason')

  return (
    <>
      <PublicNavbar />

      <main className="min-h-screen bg-[#09070f] text-purple-400 flex items-center justify-center px-4">
        <div className="max-w-xl w-full rounded-2xl border border-red-400/30 bg-[#120d1d] p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-400/20 text-red-300 flex items-center justify-center mx-auto text-4xl mb-6">
            ✕
          </div>

          <h1 className="text-3xl font-extrabold mb-3">
            Payment Cancelled
          </h1>

          <p className="text-purple-100/70 mb-6">
            {reason === 'card_declined'
              ? 'Your test card was declined.'
              : 'You cancelled the payment. Your order was not placed.'}
          </p>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 rounded-full bg-purple-400 text-black font-bold hover:bg-purple-300 transition mb-3"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="w-full py-3 rounded-full border border-purple-400/30 text-purple-400 font-semibold hover:bg-purple-400/10 transition"
          >
            Back to Cart
          </button>
        </div>
      </main>
    </>
  )
}

export default PaymentCancelPage