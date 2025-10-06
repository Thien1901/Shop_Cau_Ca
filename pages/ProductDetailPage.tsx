import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import NotFoundPage from './NotFoundPage';
import StarRating from '../components/StarRating';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { allProducts, addToCart } = useAppContext();
  // Support both id and _id (MongoDB)
  const product = allProducts.find(p => p.id === id || p._id === id);

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-md" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-2">{product.category}</p>
          <div className="mb-4">
            <StarRating rating={product.rating} />
          </div>
          <p className="text-4xl font-bold text-accent mb-6">{product.price.toLocaleString('vi-VN')}vnđ</p>
          <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="w-full md:w-auto px-8 py-3 bg-accent text-white text-lg font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors"
          >
            Thêm vào giỏ hàng
          </button>
          <Link to="/products" className="block mt-6 text-primary hover:underline">
            &larr; Quay lại trang sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
};<div className="fixed bottom-5 right-5 z-50">
  <button className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500">

  </button>
</div>

export default ProductDetailPage;
