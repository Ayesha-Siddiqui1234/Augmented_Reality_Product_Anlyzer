// src/pages/public/HomePage.jsx
import { useEffect, useRef, useState } from 'react'
import TextType from '../../components/TextType.jsx'
import PublicNavbar from '../../components/PublicNavbar.jsx'
import '../../styles/light-theme.css'
import Navbar from '../../components/Navbar.jsx'


/* ─── tiny hook: track scroll position ─── */
const useScroll = () => {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrollY
}

/* ─── hook: intersection observer for reveal animations ─── */
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─── data (inline so page is self-contained) ─── */
const PRODUCTS = [
  { id: 'p1', name: 'Modern Lounge Chair', price: 18500, originalPrice: 22000, category: 'Chairs', rating: 4.6, reviewCount: 28, isNew: true, featured: true, imageUrl: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=900&q=80', slug: 'modern-lounge-chair' },
  { id: 'p2', name: 'Scandinavian Coffee Table', price: 14500, originalPrice: 17000, category: 'Tables', rating: 4.4, reviewCount: 19, isNew: false, featured: true, imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80', slug: 'scandinavian-coffee-table' },
  { id: 'p5', name: 'Modern Two-Seater Sofa', price: 48000, originalPrice: 55000, category: 'Sofas', rating: 4.8, reviewCount: 41, isNew: true, featured: true, imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80', slug: 'modern-two-seater-sofa' },
  { id: 'p3', name: 'Compact Study Desk', price: 21000, originalPrice: 24500, category: 'Desks', rating: 4.7, reviewCount: 34, isNew: true, featured: false, imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', slug: 'compact-study-desk' },
]

const CATEGORIES = [
  { key: 'chairs', label: 'Chairs', icon: '🪑', imageUrl: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=600&q=80' },
  { key: 'tables', label: 'Tables', icon: '🪵', imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80' },
  { key: 'sofas', label: 'Sofas', icon: '🛋️', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80' },
  { key: 'lighting', label: 'Lighting', icon: '💡', imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80' },
  { key: 'desks', label: 'Desks', icon: '🖥️', imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80' },
  { key: 'storage', label: 'Storage', icon: '📦', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80' },
]

const STATS = [
  { value: '500+', label: 'Products' },
  { value: '12K+', label: 'Happy Customers' },
  { value: '6', label: 'Collections' },
  { value: '4.8★', label: 'Avg Rating' },
]

const FEATURES = [
  { icon: '🧊', title: '3D Visualization', desc: 'Spin, zoom, and inspect every product from any angle before you buy.' },
  { icon: '📱', title: 'AR Try-On', desc: 'Place furniture in your room using your phone camera — see it in real life.' },
  { icon: '🚚', title: 'Free Delivery', desc: 'Free doorstep delivery on all orders above PKR 25,000.' },
  { icon: '🔄', title: '30-Day Returns', desc: 'Not happy? Return it within 30 days — no questions asked.' },
]

/* ─── sub-components ─── */

const StarRating = ({ rating }) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="flex gap-0.5 text-purple-400 text-xs">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < full ? '★' : i === full && half ? '⯨' : '☆'}</span>
      ))}
    </span>
  )
}

const ProductCard = ({ product, delay = 0 }) => {
  const [ref, visible] = useReveal(0.1)
  const [hovered, setHovered] = useState(false)
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
      className="group relative rounded-2xl overflow-hidden border border-purple-400/15 bg-white/5 backdrop-blur-md cursor-pointer"
    >
      {/* image */}
      <div className="relative h-56 overflow-hidden bg-[#09070f]/40">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* overlay shimmer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest rounded-full bg-purple-400 text-black uppercase">New</span>
          )}
          <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest rounded-full bg-[#000]/60 text-purple-400 border border-purple-400/30 uppercase">-{discount}%</span>
        </div>
        {/* quick action */}
        <div
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.3s ease' }}
          className="absolute bottom-3 right-3"
        >
          <a
            href={`/products/${product.slug}`}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-purple-400 text-black text-xs font-bold hover:bg-purple-300 transition shadow-lg hover:shadow-purple-400/50"
          >
            Product Details →
          </a>
        </div>
      </div>

      {/* info */}
      <div className="p-4">
        <p className="text-purple-400/50 text-[10px] uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="text-purple-100 font-semibold text-sm leading-snug mb-2">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-purple-400/40 text-[10px]">({product.reviewCount})</span>
        </div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-purple-400 font-bold text-base">PKR {product.price.toLocaleString()}</span>
          <span className="text-purple-400/30 text-xs line-through">PKR {product.originalPrice.toLocaleString()}</span>
        </div>
        
        {/* View Details Button */}
        <a
          href={`/products/${product.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="block w-full py-2.5 rounded-full bg-purple-400 text-black text-xs font-bold text-center hover:bg-purple-300 transition-all shadow-lg hover:shadow-purple-400/50"
        >
          View Details →
        </a>
      </div>
    </div>
  )
}

const SectionHeading = ({ label, title, subtitle }) => {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}
      className="text-center mb-12"
    >
      <p className="text-purple-400/60 text-xs tracking-[0.4em] uppercase mb-3">{label}</p>
      <h2 className="text-3xl md:text-5xl font-extrabold text-purple-400 leading-tight mb-4">{title}</h2>
      {subtitle && <p className="text-purple-100/60 max-w-xl mx-auto text-sm md:text-base">{subtitle}</p>}
    </div>
  )
}

/* ─── MAIN PAGE ─── */
const HomePage = () => {
  const scrollY = useScroll()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onMouse = (e) => setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })
    window.addEventListener('mousemove', onMouse)
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  return (
    <main className="min-h-screen text-purple-400 overflow-x-hidden" style={{background:'#09070f'}}>

      <Navbar />

      {/* ── GLOBAL CSS INJECTED ── */}
      <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        body { font-family: 'Poppins', sans-serif; }

        .font-display { font-family: 'Syne', sans-serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-3deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(153,85,255,0.2); }
          50% { box-shadow: 0 0 80px rgba(153,85,255,0.5), 0 0 120px rgba(153,85,255,0.15); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes borderRotate {
          from { background-position: 0% 50%; }
          to { background-position: 100% 50%; }
        }

        .float-1 { animation: float 6s ease-in-out infinite; }
        .float-2 { animation: floatReverse 8s ease-in-out infinite; }
        .float-3 { animation: float 10s ease-in-out infinite 2s; }
        .spin-slow { animation: spin-slow 20s linear infinite; }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .marquee-track { animation: marquee 20s linear infinite; }

        .hero-fade-1 { animation: fadeUp 0.9s ease forwards 0.2s; opacity: 0; }
        .hero-fade-2 { animation: fadeUp 0.9s ease forwards 0.5s; opacity: 0; }
        .hero-fade-3 { animation: fadeUp 0.9s ease forwards 0.8s; opacity: 0; }
        .hero-fade-4 { animation: scaleIn 0.9s ease forwards 1.1s; opacity: 0; }

        .card-glow:hover {
          box-shadow: 0 0 40px rgba(153,85,255,0.2), 0 20px 60px rgba(0,0,0,0.5);
          transform: translateY(-6px);
          border-color: rgba(153,85,255,0.4);
        }
        .card-glow { transition: all 0.4s ease; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(153,85,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(153,85,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .noise-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .shimmer-border {
          background: linear-gradient(90deg, transparent, rgba(153,85,255,0.6), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .text-gradient {
          background: linear-gradient(135deg, #9955ff, #cc99ff, #7733dd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .category-card:hover .cat-img { transform: scale(1.1); }
        .category-card:hover .cat-overlay { opacity: 1; }
        .category-card:hover .cat-label { transform: translateY(-4px); }
        .cat-img { transition: transform 0.6s ease; }
        .cat-overlay { transition: opacity 0.4s ease; opacity: 0; }
        .cat-label { transition: transform 0.4s ease; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #9955ff; border-radius: 2px; }
      `}</style>

      {/* ════════════════════════════════════════
          SECTION 1 — HERO
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg noise-bg pt-24">

        {/* Parallax background blobs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[120px]" />
        </div>

        {/* Mouse parallax orb */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full bg-purple-400/5 blur-[80px] pointer-events-none"
          style={{
            left: `calc(50% + ${mousePos.x * 80}px)`,
            top: `calc(50% + ${mousePos.y * 80}px)`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.3s ease, top 0.3s ease',
          }}
        />

        {/* Rotating ring decoration */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none spin-slow"
          style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)` }}
        >
          <svg viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
            <circle cx="350" cy="350" r="340" stroke="#9955ff" strokeWidth="0.5" strokeDasharray="8 16" />
            <circle cx="350" cy="350" r="280" stroke="#9955ff" strokeWidth="0.5" strokeDasharray="4 20" />
          </svg>
        </div>

        {/* Floating product chips */}
        <div className="absolute top-1/3 left-8 md:left-24 float-1 hidden md:block">
          
        </div>
        <div className="absolute top-1/2 right-8 md:right-24 float-2 hidden md:block">
         
        </div>
        <div className="absolute bottom-1/3 left-12 md:left-32 float-3 hidden md:block">
        
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
         

          <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-none mb-6 hero-fade-2">
            <span className="block text-gradient">
              <TextType
                text={["Visualize in 3D", "Try Before You Buy", "Shop Smarter"]}
                typingSpeed={45}
                pauseDuration={1500}
                showCursor
                cursorCharacter="_"
                deletingSpeed={30}
              />
            </span>
          </h1>

          <p className="hero-fade-3 text-purple-100/60 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            Experience furniture like never before. Rotate, zoom, and place any product in your room using augmented reality — before you spend a single rupee.
          </p>

          <div className="hero-fade-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/products"
              className="group relative inline-flex items-center gap-2 rounded-full bg-purple-400 px-8 py-3.5 font-bold text-black text-sm hover:bg-purple-300 transition-all duration-300 pulse-glow"
            >
              Explore Products
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 px-8 py-3.5 font-semibold text-purple-300 text-sm hover:bg-purple-400/10 hover:border-purple-400/60 transition-all duration-300 backdrop-blur-sm"
            >
              How AR Works
              <span className="text-purple-400/40">↗</span>
            </a>
          </div>

          {/* hero stats row */}
          <div className="hero-fade-4 mt-16 flex flex-wrap justify-center gap-8 md:gap-16 border-t border-purple-400/10 pt-10">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-2xl md:text-3xl font-extrabold text-purple-400">{value}</p>
                <p className="text-purple-400/40 text-xs tracking-widest uppercase mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-purple-400/30 text-xs tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-purple-400/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ════════════════════════════════════════
          MARQUEE STRIP
      ════════════════════════════════════════ */}
      <div className="relative border-y border-purple-400/15 py-3 overflow-hidden bg-purple-400/5">
        <div className="marquee-track flex gap-12 whitespace-nowrap w-max">
          {[...Array(2)].map((_, i) =>
            ['3D Visualization', 'Augmented Reality', 'Modern Design', 'Free Delivery', 'Premium Furniture', 'Try Before You Buy', 'PKR 25K+ Free Shipping', 'AR Try-On Ready'].map((item, j) => (
              <span key={`${i}-${j}`} className="text-purple-400/50 text-xs tracking-[0.3em] uppercase flex items-center gap-4">
                {item}
                <span className="text-purple-400">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION 2 — FEATURED PRODUCTS
      ════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        {/* parallax background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${(scrollY - 600) * 0.15}px)` }}
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionHeading
            label="Handpicked For You"
            title="Featured Products"
            subtitle="Our most-loved pieces — all with interactive 3D previews and AR placement support."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} delay={i * 100} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 px-8 py-3 text-sm font-semibold text-purple-400 hover:bg-purple-400/10 hover:border-purple-400 transition-all duration-300"
            >
              View All Products <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 3 — 3D / AR FEATURE SPOTLIGHT
      ════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-purple-400/4" />
        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionHeading
            label="Next Level Shopping"
            title="See It. Feel It. Buy It."
            subtitle="VizCraft is built differently — we give you the tools to shop with confidence."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon, title, desc }, i) => {
              const [ref, visible] = useReveal()
              return (
                <div
                  key={title}
                  ref={ref}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(40px)',
                    transition: `all 0.7s ease ${i * 120}ms`,
                  }}
                  className="card-glow rounded-2xl border border-purple-400/15 bg-[#09070f]/60 backdrop-blur-md p-6 flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-2xl">
                    {icon}
                  </div>
                  <h3 className="font-display font-bold text-purple-300 text-lg">{title}</h3>
                  <p className="text-purple-100/50 text-sm leading-relaxed">{desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 4 — CATEGORIES GRID
      ════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Browse by Room"
            title="Shop by Category"
            subtitle="From lounge chairs to storage cabinets — find exactly what your space needs."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map(({ key, label, icon, imageUrl }, i) => {
              const [ref, visible] = useReveal(0.1)
              return (
                <a
                  key={key}
                  href={`/products?category=${key}`}
                  ref={ref}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'scale(1)' : 'scale(0.93)',
                    transition: `all 0.6s ease ${i * 80}ms`,
                  }}
                  className={`category-card relative rounded-2xl overflow-hidden border border-purple-400/15 ${i === 0 ? 'md:row-span-2' : ''} cursor-pointer group`}
                  style={{ minHeight: i === 0 ? '360px' : '170px', opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.93)', transition: `all 0.6s ease ${i * 80}ms` }}
                >
                  <img src={imageUrl} alt={label} className="cat-img absolute inset-0 w-full h-full object-cover" />
                  <div className="cat-overlay absolute inset-0 bg-purple-500/15" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="cat-label absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="text-xl">{icon}</span>
                    <span className="font-display font-bold text-purple-100 text-sm">{label}</span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-7 h-7 rounded-full bg-purple-400 flex items-center justify-center text-black text-xs font-bold">→</span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 5 — HOW IT WORKS (STEPS)
      ════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/3 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <SectionHeading
            label="Dead Simple"
            title="How It Works"
            subtitle="Three steps between you and your perfect room."
          />

          <div className="relative">
            {/* connecting line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-400/20 to-transparent" />

            {[
              { num: '01', title: 'Browse & Discover', desc: 'Explore our curated catalog of premium furniture across 6+ categories, all AR-ready.' },
              { num: '02', title: 'Visualize in 3D', desc: 'Spin, zoom, and inspect any product in full 3D. See details from every angle.' },
              { num: '03', title: 'Place in Your Room', desc: 'Use your phone camera to place the product in your actual space via augmented reality.' },
            ].map(({ num, title, desc }, i) => {
              const [ref, visible] = useReveal()
              return (
                <div
                  key={num}
                  ref={ref}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : `translateX(${i % 2 === 0 ? -40 : 40}px)`,
                    transition: `all 0.8s ease ${i * 150}ms`,
                  }}
                  className={`relative flex gap-6 mb-12 ${i % 2 === 1 ? 'md:flex-row-reverse md:text-right' : ''}`}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center font-display font-extrabold text-black text-sm z-10">
                    {num}
                  </div>
                  <div className={`flex-1 bg-[#09070f]/60 border border-purple-400/15 rounded-2xl p-6 backdrop-blur-sm card-glow ${i % 2 === 1 ? 'md:mr-0' : ''}`}>
                    <h3 className="font-display font-bold text-purple-300 text-lg mb-2">{title}</h3>
                    <p className="text-purple-100/50 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SECTION 6 — CTA BANNER
      ════════════════════════════════════════ */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Parallax bg */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${(scrollY - 2800) * 0.2}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/15 via-purple-600/8 to-transparent" />
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
        </div>

        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-purple-400/30 rounded-tl-xl" />
        <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-purple-400/30 rounded-tr-xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-purple-400/30 rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-purple-400/30 rounded-br-xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {(() => {
            const [ref, visible] = useReveal()
            return (
              <div
                ref={ref}
                style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s ease' }}
              >
                <p className="text-purple-400/60 text-xs tracking-[0.4em] uppercase mb-4 font-display">Limited Time</p>
                <h2 className="font-display text-4xl md:text-6xl font-extrabold text-purple-400 leading-tight mb-4">
                  Your Dream Room<br />Starts Here
                </h2>
                <p className="text-purple-100/60 mb-8 text-base md:text-lg">
                  Get 10% off your first order. Use code <span className="text-purple-400 font-mono font-bold tracking-widest bg-purple-400/10 px-2 py-0.5 rounded border border-purple-400/20">VIZCRAFT10</span> at checkout.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/products"
                    className="rounded-full bg-purple-400 px-10 py-4 font-bold text-black text-sm hover:bg-purple-300 transition-all duration-300 pulse-glow"
                  >
                    Start Shopping
                  </a>
                  <a
                    href="/about"
                    className="rounded-full border border-purple-400/30 px-10 py-4 font-semibold text-purple-300 text-sm hover:bg-purple-400/10 transition-all duration-300"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER STRIP
      ════════════════════════════════════════ */}
      <div className="border-t border-purple-400/10 py-8 px-6 text-center">
        <p className="font-display font-extrabold text-purple-400/20 text-2xl tracking-widest uppercase mb-3">VizCraft 3D</p>
        <p className="text-purple-400/25 text-xs tracking-widest">© 2026 VizCraft — All Rights Reserved</p>
      </div>

    </main>
  )
}

export default HomePage