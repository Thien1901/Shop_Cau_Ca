import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const categoryTranslations: { [key: string]: string } = {
  'Cần câu': 'Cần câu',
  'Máy câu': 'Máy câu',
  'Dây câu': 'Dây câu',
  'Mồi Lure': 'Mồi Lure',
  'Phao': 'Phao',
  'Lưỡi câu': 'Lưỡi câu',
  'Phụ kiện': 'Phụ kiện',
};


const ProductsPage: React.FC = () => {
  const { products, searchTerm, selectedCategory, setSelectedCategory } = useAppContext();
  const [searchParams] = useSearchParams();

  // Sync component state with URL search parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams, selectedCategory, setSelectedCategory]);

  const getTitle = () => {
    if (searchTerm) {
      return `Kết quả tìm kiếm cho "${searchTerm}"`;
    }
    if (selectedCategory) {
      return categoryTranslations[selectedCategory] || selectedCategory;
    }
    return 'Tất cả sản phẩm';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        {getTitle()}
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8 text-lg bg-white p-10 rounded-lg shadow">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Không tìm thấy sản phẩm</h3>
          <p>
            {searchTerm 
              ? `Chúng tôi không thể tìm thấy bất kỳ sản phẩm nào phù hợp với tìm kiếm của bạn "${searchTerm}".`
              : "Không có sản phẩm nào trong danh mục này."
            }
          </p>
          <p className="mt-4">Hãy thử điều chỉnh tìm kiếm của bạn hoặc chọn một danh mục khác.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;