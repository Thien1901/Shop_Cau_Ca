
import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { useAppContext } from '../context/AppContext';
import { generateProductDescription } from '../services/geminiService';

interface AdminProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({ product, onClose }) => {
  const { addProduct, updateProduct, setLoading: setAppLoading } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    imageUrl: '',
    description: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        imageUrl: product.imageUrl,
        description: product.description,
      });
    } else {
        setFormData({ name: '', price: '', category: '', imageUrl: '', description: '' });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.name) {
        alert("Please enter a product name first.");
        return;
    }
    setIsGenerating(true);
    setAppLoading(true);
    try {
        const description = await generateProductDescription(formData.name);
        setFormData(prev => ({ ...prev, description }));
    } catch (error) {
        console.error("Failed to generate description", error);
        alert("Could not generate description. Please try again or write one manually.");
    } finally {
        setIsGenerating(false);
        setAppLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    if (product) {
      updateProduct({ ...product, ...productData });
    } else {
      addProduct(productData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
      </div>
      
      <div className="flex space-x-4">
        <div className="flex-1">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
        </div>
        <div className="flex-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
        </div>
      </div>
      
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" placeholder="e.g., https://picsum.photos/seed/new/600/400" required />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required></textarea>
        <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="mt-2 px-3 py-1 bg-secondary text-white text-xs font-semibold rounded-lg hover:bg-dark disabled:bg-gray-400 transition-colors">
            {isGenerating ? 'Generating...' : 'Generate with AI'}
        </button>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-dark">{product ? 'Update' : 'Add'} Product</button>
      </div>
    </form>
  );
};

export default AdminProductForm;
