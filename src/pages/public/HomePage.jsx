// src/pages/public/HomePage.jsx

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectFeaturedProducts } from '../../features/products/productSlice'
import { TypingAnimation } from '../../components/ui/typing-animation'
import { SlideButton } from '../../components/ui/slide-button'
import ProductCard from '../../components/product/ProductCard'

const HomePage = () => {
  const navigate = useNavigate()
  const featured = useSelector(selectFeaturedProducts)

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors">

      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-900 dark:bg-black text-white transition-colors">
        <div
          aria-hidden
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(#d6d3d1 1px, transparent 1px), linear-gradient(90deg, #d6d3d1 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32 flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold tracking-widest uppercase">
            🪑 Augmented Reality Furniture
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl">
            Furnish Your Home Like a{' '}
            <TypingAnimation
              words={['Designer', 'Visionary', 'Pro', 'Artist', 'Dream']}
              typeSpeed={100}
              deleteSpeed={55}
              pauseDelay={1600}
              loop
              className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"
            />
          </h1>
          <p className="text-stone-400 text-lg max-w-xl leading-relaxed">
            Preview any piece in your actual room with AR before you buy. No surprises — just perfect fits.
          </p>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            <button
              onClick={() => navigate('/products')}
              className="px-8 py-3 bg-amber-400 hover:bg-amber-300 text-stone-900 font-semibold rounded-xl text-sm transition-colors duration-200 shadow-lg shadow-amber-400/20"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate('/products')}
              className="px-8 py-3 border border-stone-600 hover:border-stone-400 text-stone-300 hover:text-white font-medium rounded-xl text-sm transition-colors duration-200"
            >
              Try AR View →
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-10 mt-10 pt-10 border-t border-stone-800 w-full max-w-lg">
            {[['200+','Products'],['AR','Live Preview'],['4.8★','Avg Rating'],['Free','Shipping']].map(([v,l]) => (
              <div key={l} className="flex flex-col items-center gap-0.5">
                <span className="text-2xl font-bold text-amber-400">{v}</span>
                <span className="text-stone-500 text-xs">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Featured Products
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Hand-picked for your home</p>
          </div>
          <button onClick={() => navigate('/products')} className="text-sm font-medium text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 transition">
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AR Banner */}
      <section className="mx-4 sm:mx-6 lg:mx-8 mb-16 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-800 dark:from-stone-900 dark:to-black text-white px-8 py-14 flex flex-col sm:flex-row items-center justify-between gap-8 max-w-7xl xl:mx-auto">
        <div className="flex flex-col gap-3 max-w-md">
          <span className="text-violet-400 text-xs font-bold uppercase tracking-widest">AR Technology</span>
          <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
            See it in your room before you buy
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            Use your phone camera to place any AR-supported piece directly into your living space. Real scale, real light.
          </p>
        </div>
        <div className="shrink-0 w-44">
          <SlideButton
            variant="amber"
            onClick={() => navigate('/products')}
          >
            Explore AR →
          </SlideButton>
        </div>
      </section>

    </div>
  )
}

export default HomePage
