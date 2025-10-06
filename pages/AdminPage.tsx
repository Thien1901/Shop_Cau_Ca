
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import type { Product } from '../types';
import Modal from '../components/Modal';
import AdminProductForm from '../components/AdminProductForm';
import Spinner from '../components/Spinner';

const AdminPage: React.FC = () => {
  const { allProducts, deleteProduct, loading } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };
  
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button onClick={openAddModal} className="px-4 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
          Add New Product
        </button>
      </div>

      {loading && <div className="my-4"><Spinner/></div>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Product</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Category</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {allProducts.map(product => {
              const productId = product._id || product.id || '';
              return (
              <tr key={productId} className="border-b">
                <td className="text-left py-3 px-4 flex items-center">
                  <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-md mr-4" />
                  {product.name}
                </td>
                <td className="text-left py-3 px-4">{product.category}</td>
                <td className="text-left py-3 px-4">{product.price.toLocaleString('vi-VN')}vnđ</td>
                <td className="text-left py-3 px-4">
                  <button onClick={() => openEditModal(product)} className="text-sm bg-secondary text-white py-1 px-3 rounded hover:bg-dark mr-2">Edit</button>
                  <button onClick={() => handleDelete(productId)} className="text-sm bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingProduct ? 'Edit Product' : 'Add New Product'}>
        <AdminProductForm product={editingProduct} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default AdminPage;
