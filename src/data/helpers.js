// src/data/helpers.js
import { products } from './products'
import { categories } from './categories'

export const getAllProducts = () => products
export const getProductById = (id) => products.find(p => p.id === id)
export const getProductBySlug = (slug) => products.find(p => p.slug === slug)
export const getFeaturedProducts = () => products.filter(p => p.featured)
export const getNewProducts = () => products.filter(p => p.isNew)
export const getProductsByCategory = (categorySlug) => products.filter(p => p.category === categorySlug)
export const getFavoriteProducts = (favoriteIds = []) => products.filter(p => favoriteIds.includes(p.id))
export const getAllCategories = () => categories
export const getCategoryBySlug = (slug) => categories.find(c => c.slug === slug)
