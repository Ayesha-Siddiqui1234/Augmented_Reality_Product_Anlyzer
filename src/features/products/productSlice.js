// import { createSlice } from '@reduxjs/toolkit'
// import { products } from '../../data/products.js'

// const initialState = {
//   items: products,
//   searchQuery: '',
//   selectedCategory: 'all',
//   sortBy: 'default',
//   minPrice: 0,
//   maxPrice: Number.MAX_SAFE_INTEGER,
// }

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload
//     },
//     setSelectedCategory: (state, action) => {
//       state.selectedCategory = action.payload
//     },
//     setSortBy: (state, action) => {
//       state.sortBy = action.payload
//     },
//     setPriceRange: (state, action) => {
//       state.minPrice = action.payload.minPrice
//       state.maxPrice = action.payload.maxPrice
//     },
//     addProduct: (state, action) => {
//       state.items.push(action.payload)
//     },
//     updateProduct: (state, action) => {
//       const index = state.items.findIndex(
//         (product) => product.id === action.payload.id
//       )

//       if (index !== -1) {
//         state.items[index] = action.payload
//       }
//     },
//     deleteProduct: (state, action) => {
//       state.items = state.items.filter(
//         (product) => product.id !== action.payload
//       )
//     },
//   },
// })

// export const {
//   setSearchQuery,
//   setSelectedCategory,
//   setSortBy,
//   setPriceRange,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// } = productsSlice.actions

// export default productsSlice.reducer

// export const selectAllProducts = (state) => state.products.items

// export const selectFeaturedProducts = (state) =>
//   state.products.items.filter((product) => product.featured)

// export const selectNewProducts = (state) =>
//   state.products.items.filter((product) => product.isNew)

// export const selectProductById = (state, id) =>
//   state.products.items.find((product) => product.id === id)

// export const selectProductBySlug = (state, slug) =>
//   state.products.items.find((product) => product.slug === slug)

// export const selectProductsByCategory = (state, categoryKey) =>
//   state.products.items.filter((product) => product.category === categoryKey)

// export const selectRelatedProducts = (state, currentProductId, categoryKey) =>
//   state.products.items.filter(
//     (product) =>
//       product.id !== currentProductId && product.category === categoryKey
//   )

// export const selectFilteredProducts = (state) => {
//   const { items, searchQuery, selectedCategory, sortBy, minPrice, maxPrice } =
//     state.products

//   let result = items.filter((product) => {
//     const query = searchQuery.toLowerCase()

//     const matchesQuery =
//       !query ||
//       product.name.toLowerCase().includes(query) ||
//       product.categoryLabel.toLowerCase().includes(query) ||
//       product.shortDescription.toLowerCase().includes(query) ||
//       product.tags.some((tag) => tag.toLowerCase().includes(query))

//     const matchesCategory =
//       selectedCategory === 'all' || product.category === selectedCategory

//     const matchesPrice =
//       product.price >= minPrice && product.price <= maxPrice

//     return matchesQuery && matchesCategory && matchesPrice
//   })

//   // Apply sorting
//   if (sortBy === 'price-asc') {
//     result = [...result].sort((a, b) => a.price - b.price)
//   } else if (sortBy === 'price-desc') {
//     result = [...result].sort((a, b) => b.price - a.price)
//   } else if (sortBy === 'newest') {
//     result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
//   }

//   return result
// }




// src/features/products/productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/products'

const makeSlug = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const normalizeProduct = (product) => {
  const mongoId = product._id || product.id

  const imageUrl =
    product.imageUrl ||
    product.images?.[0] ||
    ''

  const categoryLabel =
    product.categoryLabel ||
    (product.category
      ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
      : 'Product')

  return {
    ...product,

    // Backend uses _id, old frontend used id.
    // Keeping both prevents old UI code from breaking.
    _id: mongoId,
    id: mongoId,

    slug: product.slug || makeSlug(product.name),

    imageUrl,
    images: product.images || [],
    gallery: product.gallery || product.images || (imageUrl ? [imageUrl] : []),

    category: product.category || 'uncategorized',
    categoryLabel,

    shortDescription:
      product.shortDescription ||
      product.description?.slice(0, 120) ||
      '',

    rating: product.rating || 0,
    reviewCount: product.reviewCount || product.numReviews || 0,
    numReviews: product.numReviews || product.reviewCount || 0,

    originalPrice: product.originalPrice || product.price || 0,

    featured: product.featured || false,
    isNew: product.isNew || false,

    // Your backend model currently does not have arSupported/modelUrl.
    // These are safe fallbacks for your UI.
    arSupported: product.arEnabled || product.arSupported || Boolean(product.modelUrl || product.glbModel),
    modelUrl: product.modelUrl || product.glbModel || '',
    glbModel: product.glbModel || product.modelUrl || '',

    tags: product.tags || [],
    colors: product.colors || [],

    stock: product.stock || 0,
    brand: product.brand || '',
    material: product.material || '',
    specifications: product.specifications || {},
  }
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          limit: 1000,
        },
      })

      const products =
        response.data?.data?.products ||
        response.data?.products ||
        response.data?.data ||
        []

      return products.map(normalizeProduct)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch products'
      )
    }
  }
)

const initialState = {
  items: [],
  searchQuery: '',
  selectedCategory: 'all',
  sortBy: 'default',
  minPrice: 0,
  maxPrice: Number.MAX_SAFE_INTEGER,
  loading: false,
  error: null,
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
      state.items.push(normalizeProduct(action.payload))
    },

    updateProduct: (state, action) => {
      const updatedProduct = normalizeProduct(action.payload)
      const updatedProductId = updatedProduct._id || updatedProduct.id

      const index = state.items.findIndex(
        (product) => (product._id || product.id) === updatedProductId
      )

      if (index !== -1) {
        state.items[index] = updatedProduct
      }
    },

    deleteProduct: (state, action) => {
      state.items = state.items.filter(
        (product) => (product._id || product.id) !== action.payload
      )
    },

    clearProductError: (state) => {
      state.error = null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
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
  clearProductError,
} = productsSlice.actions

export default productsSlice.reducer

export const selectAllProducts = (state) => state.products.items

export const selectProductsLoading = (state) => state.products.loading

export const selectProductsError = (state) => state.products.error

export const selectFeaturedProducts = (state) =>
  state.products.items.filter((product) => product.featured)

export const selectNewProducts = (state) =>
  state.products.items.filter((product) => product.isNew)

export const selectProductById = (state, id) =>
  state.products.items.find(
    (product) => (product._id || product.id) === id
  )

export const selectProductBySlug = (state, slug) =>
  state.products.items.find((product) => product.slug === slug)

export const selectProductsByCategory = (state, categoryKey) =>
  state.products.items.filter((product) => product.category === categoryKey)

export const selectRelatedProducts = (state, currentProductId, categoryKey) =>
  state.products.items.filter(
    (product) =>
      (product._id || product.id) !== currentProductId &&
      product.category === categoryKey
  )

export const selectFilteredProducts = (state) => {
  const {
    items,
    searchQuery,
    selectedCategory,
    sortBy,
    minPrice,
    maxPrice,
  } = state.products

  let result = items.filter((product) => {
    const query = searchQuery.toLowerCase()

    const name = product.name || ''
    const categoryLabel = product.categoryLabel || ''
    const shortDescription = product.shortDescription || ''
    const tags = product.tags || []

    const matchesQuery =
      !query ||
      name.toLowerCase().includes(query) ||
      categoryLabel.toLowerCase().includes(query) ||
      shortDescription.toLowerCase().includes(query) ||
      tags.some((tag) => tag.toLowerCase().includes(query))

    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory

    const matchesPrice =
      Number(product.price || 0) >= minPrice &&
      Number(product.price || 0) <= maxPrice

    return matchesQuery && matchesCategory && matchesPrice
  })

  if (sortBy === 'price-asc') {
    result = [...result].sort(
      (a, b) => Number(a.price || 0) - Number(b.price || 0)
    )
  } else if (sortBy === 'price-desc') {
    result = [...result].sort(
      (a, b) => Number(b.price || 0) - Number(a.price || 0)
    )
  } else if (sortBy === 'rating') {
    result = [...result].sort(
      (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
    )
  } else if (sortBy === 'newest') {
    result = [...result].sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
  }

  return result
}