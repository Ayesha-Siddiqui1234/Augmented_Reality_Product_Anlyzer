import { createSlice } from '@reduxjs/toolkit'
import { products } from '../../data/products.js'

const initialState = {
  items: products,
  searchQuery: '',
  selectedCategory: 'all',
  sortBy: 'default',
  minPrice: 0,
  maxPrice: Number.MAX_SAFE_INTEGER,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setPriceRange: (state, action) => {
      state.minPrice = action.payload.minPrice
      state.maxPrice = action.payload.maxPrice
    },
    addProduct: (state, action) => {
      state.items.push(action.payload)
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(
        (product) => product.id === action.payload.id
      )

      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(
        (product) => product.id !== action.payload
      )
    },
  },
})

export const {
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  setPriceRange,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions

export default productsSlice.reducer

export const selectAllProducts = (state) => state.products.items

export const selectFeaturedProducts = (state) =>
  state.products.items.filter((product) => product.featured)

export const selectNewProducts = (state) =>
  state.products.items.filter((product) => product.isNew)

export const selectProductById = (state, id) =>
  state.products.items.find((product) => product.id === id)

export const selectProductBySlug = (state, slug) =>
  state.products.items.find((product) => product.slug === slug)

export const selectProductsByCategory = (state, categoryKey) =>
  state.products.items.filter((product) => product.category === categoryKey)

export const selectRelatedProducts = (state, currentProductId, categoryKey) =>
  state.products.items.filter(
    (product) =>
      product.id !== currentProductId && product.category === categoryKey
  )

export const selectFilteredProducts = (state) => {
  const { items, searchQuery, selectedCategory, sortBy, minPrice, maxPrice } =
    state.products

  let result = items.filter((product) => {
    const query = searchQuery.toLowerCase()

    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.categoryLabel.toLowerCase().includes(query) ||
      product.shortDescription.toLowerCase().includes(query) ||
      product.tags.some((tag) => tag.toLowerCase().includes(query))

    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory

    const matchesPrice =
      product.price >= minPrice && product.price <= maxPrice

    return matchesQuery && matchesCategory && matchesPrice
  })

  // Apply sorting
  if (sortBy === 'price-asc') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    result = [...result].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'newest') {
    result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
  }

  return result
}