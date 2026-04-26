// src/store/selectors.js
import { createSelector } from '@reduxjs/toolkit'

export const selectFeaturedProducts = createSelector(
  state => state.products.items,
  items => items.filter(p => p.featured)
)

export const selectNewProducts = createSelector(
  state => state.products.items,
  items => items.filter(p => p.isNew)
)

export const selectProductBySlug = slug => state =>
  state.products.items.find(p => p.slug === slug)

export const selectProductById = id => state =>
  state.products.items.find(p => p.id === id)

export const selectFavoriteProducts = createSelector(
  state => state.products.items,
  state => state.favorites.ids,
  (items, ids) => items.filter(p => ids.includes(p.id))
)

export const selectIsFavorite = id => state =>
  state.favorites.ids.includes(id)

export const selectFilteredProducts = createSelector(
  state => state.products.items,
  state => state.products.searchQuery,
  state => state.products.selectedCategory,
  state => state.products.sortBy,
  (items, searchQuery, selectedCategory, sortBy) => {
    let result = [...items]

    if (selectedCategory !== 'all')
      result = result.filter(p => p.category === selectedCategory)

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      )
    }

    if (sortBy === 'price-asc')  result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating')     result.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'newest')     result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))

    return result
  }
)
