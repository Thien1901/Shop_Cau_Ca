export interface Product {
  id?: string; // For backwards compatibility
  _id?: string; // MongoDB ID
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}