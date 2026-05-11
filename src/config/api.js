// API Configuration
// This file centralizes all API URL configuration

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: `${API_BASE_URL}/api/auth`,
  ADMIN_LOGIN: `${API_BASE_URL}/api/auth/admin/login`,
  
  // User endpoints
  USERS: `${API_BASE_URL}/api/users`,
  
  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/api/products`,
  ADMIN_PRODUCTS: `${API_BASE_URL}/api/admin/products`,
  
  // Cart endpoints
  CART: `${API_BASE_URL}/api/cart`,
  
  // Favorites endpoints
  FAVORITES: `${API_BASE_URL}/api/favorites`,
  
  // Payment endpoints
  PAYMENTS: `${API_BASE_URL}/api/payments`,
  
  // Admin endpoints
  ADMIN_ORDERS: `${API_BASE_URL}/api/admin/orders`,
  ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
};

export default API_BASE_URL;
