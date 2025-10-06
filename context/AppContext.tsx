import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { Product, CartItem, User, NewUser } from '../types';
import { api } from '../services/api';

interface AppContextType {
  products: Product[];
  allProducts: Product[];
  cart: CartItem[];
  user: User | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string | null;
  addProduct: (product: Omit<Product, 'id' | 'rating'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  register: (newUser: NewUser) => Promise<{ success: boolean; message?: string; }>;
  setLoading: (isLoading: boolean) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cauCaTv_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('cauCaTv_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      // Return only user data without password
      return parsed.user || parsed;
    }
    return null;
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch products from API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProducts();
        setAllProducts(data);
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProducts(
          selectedCategory || undefined,
          searchTerm || undefined
        );
        setProducts(data);
      } catch (err) {
        console.error('Error filtering products:', err);
        // Fallback to local filtering if API fails
        let filteredProducts = [...allProducts];
        if (selectedCategory) {
          filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
        }
        if (searchTerm.trim() !== '') {
          const lowercasedTerm = searchTerm.toLowerCase();
          // Only search in product name
          filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(lowercasedTerm)
          );
        }
        setProducts(filteredProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [searchTerm, selectedCategory, allProducts]);

  useEffect(() => {
    localStorage.setItem('cauCaTv_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('cauCaTv_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cauCaTv_user');
    }
  }, [user]);

  const addProduct = async (productData: Omit<Product, 'id' | 'rating'>) => {
    try {
      setLoading(true);
      const newProduct = await api.createProduct(productData);
      setAllProducts(prev => [newProduct, ...prev]);
    } catch (err) {
      setError((err as Error).message);
      console.error('Error adding product:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      setLoading(true);
      const updated = await api.updateProduct(updatedProduct.id || updatedProduct._id, updatedProduct);
      setAllProducts(prev => prev.map(p => (p.id || p._id) === (updated.id || updated._id) ? updated : p));
    } catch (err) {
      setError((err as Error).message);
      console.error('Error updating product:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const deleteProduct = async (productId: string) => {
    try {
      setLoading(true);
      await api.deleteProduct(productId);
      setAllProducts(prev => prev.filter(p => (p.id || p._id) !== productId));
    } catch (err) {
      setError((err as Error).message);
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const productId = product._id || product.id || '';
      const existingItem = prev.find(item => (item._id || item.id) === productId);
      if (existingItem) {
        return prev.map(item =>
          (item._id || item.id) === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item =>
      (item._id || item.id) === productId ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => (item._id || item.id) !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.login({ email, password });
      
      // Store user and token
      const userData = {
        user: response.user,
        token: response.token
      };
      localStorage.setItem('cauCaTv_user', JSON.stringify(userData));
      setUser(response.user);
      
      return true;
    } catch (err) {
      setError((err as Error).message || 'Invalid credentials');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (newUserData: NewUser): Promise<{ success: boolean; message?: string; }> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.register(newUserData);
      
      // Store user and token
      const userData = {
        user: response.user,
        token: response.token
      };
      localStorage.setItem('cauCaTv_user', JSON.stringify(userData));
      setUser(response.user);
      
      return { success: true };
    } catch (err) {
      const errorMessage = (err as Error).message || 'Registration failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    products,
    allProducts,
    cart,
    user,
    loading,
    error,
    searchTerm,
    selectedCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    login,
    logout,
    register,
    setLoading,
    setSearchTerm,
    setSelectedCategory
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};