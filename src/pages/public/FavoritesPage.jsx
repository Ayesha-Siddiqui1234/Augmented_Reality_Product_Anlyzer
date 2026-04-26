// src/pages/public/FavoritesPage.jsx

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectFavoriteProducts } from '../../store/selectors'
import { removeFavorite } from '../../store/favoritesSlice'
import ProductCard from '../../components/product/ProductCard'

const FavoritesPage = () => {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const favorites = useSelector(selectFavoriteProducts)

  const removeAll = () => favorites.forEach(p => dispatch(removeFavorite(p.id)))

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight flex items-center gap-3">
              My Favorites
              {favorites.length > 0 && (
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-900 text-sm font-bold">
                  {favorites.length}
                </span>
              )}
            </h1>
            <p className="mt-1 text-stone-500 dark:text-stone-400 text-sm">Products you have saved for later</p>
          </div>
          {favorites.length > 0 && (
            <button
              onClick={removeAll}
              className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              Remove All
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-100 dark:border-orange-800 flex items-center justify-center text-4xl">♡</div>
            <h2 className="text-xl font-semibold text-stone-700 dark:text-stone-200">No favorites yet</h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm max-w-xs leading-relaxed">
              Browse our products and click the heart icon on any item to save it here.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="mt-2 px-8 py-3 bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-900 text-sm font-medium rounded-xl hover:bg-stone-700 dark:hover:bg-amber-300 transition-colors duration-200"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-3">Want to discover more?</p>
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-2.5 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 text-sm font-medium rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              >
                Browse All Products
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage
