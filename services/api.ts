/// <reference types="../vite-env.d.ts" />

const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://shop-cau-ca.onrender.com/api'
    : 'http://localhost:5000/api');

// Helper function to get auth token
const getAuthToken = (): string | null => {
  const user = localStorage.getItem('cauCaTv_user');
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.token;
  }
  return null;
};

// Helper function for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
};

export const api = {
  // Products
  getProducts: (category?: string, search?: string) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    const query = params.toString();
    return apiCall(`/products${query ? `?${query}` : ''}`);
  },

  getProductById: (id: string) => apiCall(`/products/${id}`),

  createProduct: (product: any) =>
    apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  updateProduct: (id: string, product: any) =>
    apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),

  deleteProduct: (id: string) =>
    apiCall(`/products/${id}`, {
      method: 'DELETE',
    }),

  getCategories: () => apiCall('/products/categories'),

  // Auth
  register: (userData: { name: string; email: string; password: string }) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials: { email: string; password: string }) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getMe: () => apiCall('/auth/me'),

  // Orders
  createOrder: (orderData: any) =>
    apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  getUserOrders: () => apiCall('/orders'),

  getOrderById: (id: string) => apiCall(`/orders/${id}`),

  getAllOrders: () => apiCall('/orders/admin/all'),

  updateOrderStatus: (id: string, status: string) =>
    apiCall(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};
