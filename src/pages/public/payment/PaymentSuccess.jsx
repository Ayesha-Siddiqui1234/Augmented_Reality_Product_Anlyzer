// src/pages/public/payment/PaymentSuccess.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearUserCart } from "../../../features/cart/cartSlice";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("latestOrder");

    if (storedOrder) {
      setLatestOrder(JSON.parse(storedOrder));
    }
  }, []);

  const handleContinue = async () => {
    try {
      await dispatch(clearUserCart());
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("checkoutData");
    localStorage.removeItem("latestOrder");
    localStorage.removeItem("simulationOrderId");

    navigate("/products");
  };

  return (
    <main className="min-h-screen bg-[#090812] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-[28px] border border-emerald-400/20 bg-white/[0.055] p-8 text-center shadow-[0_0_45px_rgba(16,185,129,0.16)]">
        <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
          <CheckCircle size={48} />
        </div>

        <h1 className="text-3xl font-bold text-emerald-300">
          Payment Successful
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#c9c3df]">
          Your payment has been confirmed and your order has been placed
          successfully.
        </p>

        {latestOrder && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-[#0f0d1c]/70 p-5 text-left">
            <p className="mb-3 text-sm font-bold text-[#c9b6ff]">
              Order Summary
            </p>

            <div className="space-y-2 text-sm text-[#c9c3df]">
              <p>
                <span className="text-[#aaa2cf]">Order ID:</span>{" "}
                {latestOrder.id}
              </p>

              <p>
                <span className="text-[#aaa2cf]">Payment Status:</span>{" "}
                {latestOrder.paymentStatus}
              </p>

              <p>
                <span className="text-[#aaa2cf]">Order Status:</span>{" "}
                {latestOrder.orderStatus}
              </p>

              <p>
                <span className="text-[#aaa2cf]">Transaction ID:</span>{" "}
                {latestOrder.transactionId || "N/A"}
              </p>

              <p>
                <span className="text-[#aaa2cf]">Total:</span> Rs.{" "}
                {Number(latestOrder.total || 0).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleContinue}
          className="mt-7 w-full rounded-2xl bg-emerald-500 px-5 py-4 text-sm font-bold text-white transition hover:bg-emerald-600"
        >
          Continue Shopping
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Go to Home
        </button>
      </div>
    </main>
  );
};

export default PaymentSuccessPage;