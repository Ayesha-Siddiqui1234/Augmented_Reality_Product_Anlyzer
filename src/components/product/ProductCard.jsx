// src/components/product/ProductCard.jsx

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleFavorite, selectIsFavorite } from '../../features/favorites/favoriteSlice'
import { SlideButton } from '../ui/slide-button'

const StarRating = ({ rating }) => {
  const full  = Math.floor(rating)
  const empty = 5 - full
  return (
    <span className="text-amber-500 text-sm tracking-tight">
      {'★'.repeat(full)}{'☆'.repeat(empty)}
    </span>
  )
}

const ProductCard = ({ product }) => {
  const dispatch    = useDispatch()
  const navigate    = useNavigate()
  
  const isFavorited = useSelector(state => selectIsFavorite(state, product._id || product.id))

  const hasDiscount     = product.originalPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div
      onClick={() => navigate(`/products/${product.slug}`)}
      className="group bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = 'https://placehold.co/400x300?text=No+Image' }}
        />
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-blue-100 text-blue-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">New</span>
          )}
          {hasDiscount && (
            <span className="bg-red-100 text-red-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">-{discountPercent}%</span>
          )}
          {product.arSupported && (
            <span className="bg-violet-100 text-violet-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">AR</span>
          )}
        </div>
        <button
          onClick={e => { 
            e.stopPropagation(); 
            dispatch(toggleFavorite({ 
              productId: product._id || product.id,
              product: product
            })) 
          }}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          className={`
            absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center
            text-lg border backdrop-blur-sm transition-all duration-200
            ${isFavorited
              ? 'bg-orange-50 border-orange-300 text-orange-500 scale-110'
              : 'bg-white/80 dark:bg-stone-900/80 border-stone-200 dark:border-stone-600 text-stone-400 hover:text-orange-400 hover:scale-110'}
          `}
        >
          {isFavorited ? '♥' : '♡'}
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-4 flex-1">
        <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-500">
          {product.categoryLabel}
        </span>
        <h3 className="text-[15px] font-semibold text-stone-800 dark:text-stone-100 leading-snug line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[13px] text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <StarRating rating={product.rating} />
          <span className="text-[12px] text-stone-400 dark:text-stone-500">({product.reviewCount})</span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-xl font-bold text-stone-900 dark:text-white">${product.price}</span>
          {hasDiscount && (
            <span className="text-sm text-stone-400 line-through">${product.originalPrice}</span>
          )}
        </div>
        <div className="mt-3" onClick={e => e.stopPropagation()}>
          <SlideButton onClick={() => navigate(`/products/${product.slug}`)}>
            View Product
          </SlideButton>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
