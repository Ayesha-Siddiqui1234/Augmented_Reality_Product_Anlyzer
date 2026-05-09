import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen pt-24 md:pt-28 text-purple-400"
        style={{ background: "#09070f" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
          body { font-family: 'Poppins', sans-serif; }

          .about-card {
            transition: all 0.35s ease;
          }

          .about-card:hover {
            transform: translateY(-4px);
            border-color: rgba(153,85,255,0.45);
            box-shadow: 0 0 35px rgba(153,85,255,0.16);
          }
        `}</style>

        <section className="max-w-6xl mx-auto px-6 pb-16">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto py-12">
            <p className="text-purple-400/60 text-xs tracking-[0.4em] uppercase mb-4">
              About VizCraft
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold text-purple-400 leading-tight mb-6">
              Shop Smarter with 3D & AR
            </h1>

            <p className="text-purple-100/70 text-sm md:text-base leading-7">
              VizCraft is a modern e-commerce experience where users can explore
              products in detail, view selected items in 3D, and use AR-supported
              previews before making a purchase decision.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-8 px-8 py-3 rounded-full bg-purple-400 text-black font-bold hover:bg-purple-300 transition-all shadow-[0_0_30px_rgba(153,85,255,0.3)]"
            >
              Explore Products
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="about-card rounded-2xl border border-purple-400/15 bg-white/5 backdrop-blur-md p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-400/15 border border-purple-400/25 flex items-center justify-center text-2xl mb-5">
                🧊
              </div>
              <h2 className="text-xl font-bold text-purple-400 mb-3">
                3D Product View
              </h2>
              <p className="text-purple-100/60 text-sm leading-6">
                Customers can inspect products from different angles using interactive
                3D previews.
              </p>
            </div>

            <div className="about-card rounded-2xl border border-purple-400/15 bg-white/5 backdrop-blur-md p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-400/15 border border-purple-400/25 flex items-center justify-center text-2xl mb-5">
                📱
              </div>
              <h2 className="text-xl font-bold text-purple-400 mb-3">
                AR Preview
              </h2>
              <p className="text-purple-100/60 text-sm leading-6">
                AR-ready products allow users to visualize items in their real-world
                space on supported devices.
              </p>
            </div>

            <div className="about-card rounded-2xl border border-purple-400/15 bg-white/5 backdrop-blur-md p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-400/15 border border-purple-400/25 flex items-center justify-center text-2xl mb-5">
                🛒
              </div>
              <h2 className="text-xl font-bold text-purple-400 mb-3">
                Smooth Shopping
              </h2>
              <p className="text-purple-100/60 text-sm leading-6">
                Users can browse products, save favorites, manage cart items, and
                complete a simulated checkout flow.
              </p>
            </div>
          </div>

          {/* Small Mission Section */}
          <div className="mt-14 rounded-2xl border border-purple-400/15 bg-[#120d1d]/80 p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-purple-400 mb-4">
              Our Goal
            </h2>
            <p className="text-purple-100/65 text-sm md:text-base leading-7 max-w-3xl mx-auto">
              Our goal is to make online shopping more visual, interactive, and
              trustworthy by helping users understand products better before they buy.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;