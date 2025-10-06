import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const SalesIcon = () => (
    <div className="relative w-16 h-16 mr-4">
        <svg className="w-full h-full text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-red-700 transform -rotate-15">SUPER<br/>SALES</span>
    </div>
);


const HomePage: React.FC = () => {
  const { products } = useAppContext();
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="space-y-12">
      {/* Featured Products */}
      <div>
        <div className="flex items-center justify-center mb-4">
             <SalesIcon />
             <h2 className="text-3xl font-bold text-center text-gray-800 uppercase">Top bán chạy nhất</h2>
        </div>
        <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;