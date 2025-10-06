import React from 'react';
import type { Product } from '../types';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productId = product._id || product.id || '';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col text-center border">
      <Link to={`/products/${productId}`} className="block">
        <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold text-gray-800 mb-2 h-12">
          <Link to={`/products/${productId}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </h3>
        <div className="my-2">
            <StarRating rating={product.rating} />
        </div>
        <p className="text-xl font-bold text-accent mb-4">
          {product.price.toLocaleString('vi-VN')}vnđ
        </p>
        <div className="mt-auto">
          <Link
            to={`/products/${productId}`}
            className="w-full block px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
