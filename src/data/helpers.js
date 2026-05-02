import { products } from './products'
import { categories } from './categories'
import { favorites } from './favorites'

export const getAllProducts = () => products

export const getFeaturedProducts = () =>
  products.filter((product) => product.featured)

export const getNewProducts = () =>
  products.filter((product) => product.isNew)

export const getProductById = (id) =>
  products.find((product) => product.id === id)

export const getProductBySlug = (slug) =>
  products.find((product) => product.slug === slug)

export const getProductsByCategory = (categoryKey) =>
  products.filter((product) => product.category === categoryKey)

export const getRelatedProducts = (currentProductId, categoryKey) =>
  products.filter(
    (product) =>
      product.id !== currentProductId && product.category === categoryKey
  )

export const getAllCategories = () => categories

export const getCategoryByKey = (key) =>
  categories.find((category) => category.key === key)

export const getFavoriteProducts = () =>
  favorites
    .map((favorite) =>
      products.find((product) => product.id === favorite.productId)
    )
    .filter(Boolean)

export const searchProducts = (query) => {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) return products

  return products.filter((product) => {
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.categoryLabel.toLowerCase().includes(normalizedQuery) ||
      product.shortDescription.toLowerCase().includes(normalizedQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
    )
  })
}

export const filterProducts = ({
  query = '',
  category = 'all',
  minPrice = 0,
  maxPrice = Number.MAX_SAFE_INTEGER,
}) => {
  return products.filter((product) => {
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))

    const matchesCategory =
      category === 'all' || product.category === category

    const matchesPrice =
      product.price >= minPrice && product.price <= maxPrice

    return matchesQuery && matchesCategory && matchesPrice
  })
}
