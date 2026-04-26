// src/pages/public/ProductListPage.jsx

import { useSelector, useDispatch } from 'react-redux'
import { selectFilteredProducts } from '../../store/selectors'
import { setSearchQuery, setCategory, setSortBy } from '../../store/productsSlice'
import ProductCard from '../../components/product/ProductCard'

const ProductListPage = () => {
  const dispatch = useDispatch()

  const products         = useSelector(selectFilteredProducts)
  const categories       = useSelector(s => s.products.categories)
  const searchQuery      = useSelector(s => s.products.searchQuery)
  const selectedCategory = useSelector(s => s.products.selectedCategory)
  const sortBy           = useSelector(s => s.products.sortBy)

  const clearAll = () => {
    dispatch(setSearchQuery(''))
    dispatch(setCategory('all'))
    dispatch(setSortBy('default'))
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            All Products
          </h1>
          <p className="mt-1 text-stone-500 dark:text-stone-400 text-sm">
            {products.length} product{products.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-base pointer-events-none">🔍</span>
          <input
            type="text"
            placeholder="Search products, tags, descriptions…"
            value={searchQuery}
            onChange={e => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
          />
          {searchQuery && (
            <button
              onClick={() => dispatch(setSearchQuery(''))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition text-sm font-bold"
            >✕</button>
          )}
        </div>

        {/* Filters + Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => dispatch(setCategory(cat.id))}
                className={`
                  flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
                  ${selectedCategory === cat.id
                    ? 'bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-900 border-stone-900 dark:border-amber-400 shadow-md'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-900 dark:hover:text-white'}
                `}
              >
                <span>{cat.icon}</span>{cat.label}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={e => dispatch(setSortBy(e.target.value))}
            className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Best Rated</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Active filter chips */}
        {(searchQuery || selectedCategory !== 'all' || sortBy !== 'default') && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Active filters:</span>
            {searchQuery && (
              <span className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs px-3 py-1 rounded-full font-medium">
                "{searchQuery}"
                <button onClick={() => dispatch(setSearchQuery(''))} className="ml-1 hover:text-amber-900 dark:hover:text-amber-300">✕</button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs px-3 py-1 rounded-full font-medium">
                {categories.find(c => c.id === selectedCategory)?.label}
                <button onClick={() => dispatch(setCategory('all'))} className="ml-1 hover:text-amber-900 dark:hover:text-amber-300">✕</button>
              </span>
            )}
            <button onClick={clearAll} className="text-xs text-stone-400 hover:text-red-500 underline transition">Clear all</button>
          </div>
        )}

        {/* Grid or Empty */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <span className="text-5xl">🛋️</span>
            <h2 className="text-xl font-semibold text-stone-700 dark:text-stone-200">No products found</h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm max-w-xs">
              Try changing your search or removing a filter to see more products.
            </p>
            <button
              onClick={clearAll}
              className="mt-2 px-6 py-2.5 bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-900 text-sm font-medium rounded-xl hover:bg-stone-700 dark:hover:bg-amber-300 transition"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductListPage
