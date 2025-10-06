import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, clearCart, user } = useAppContext();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Get storage key based on user
  const getStorageKey = () => {
    if (user && (user._id || user.id)) {
      return `cauCaTv_shippingInfo_${user._id || user.id}`;
    }
    return 'cauCaTv_shippingInfo_guest';
  };
  
  // Load saved shipping info from localStorage based on current user
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(() => {
    const key = user ? `cauCaTv_shippingInfo_${user._id || user.id}` : 'cauCaTv_shippingInfo_guest';
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {
      firstName: '',
      lastName: '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      district: '',
      ward: '',
    };
  });

  // Reload shipping info when user changes (login/logout)
  useEffect(() => {
    const key = getStorageKey();
    const saved = localStorage.getItem(key);
    if (saved) {
      setShippingInfo(JSON.parse(saved));
    } else {
      // Reset to default if no saved info for this user
      setShippingInfo({
        firstName: '',
        lastName: '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        district: '',
        ward: '',
      });
    }
  }, [user]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * 0.08; // Example tax
  const shipping = 30000; // Example shipping in VND
  const total = subtotal + taxes + shipping;
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Save to localStorage when shipping info changes (per user)
  useEffect(() => {
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(shippingInfo));
  }, [shippingInfo, user]);
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };
  
  if (orderPlaced) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto text-center">
            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800 mt-4">Đặt hàng thành công!</h1>
            <p className="text-gray-600 mt-2">Cảm ơn bạn đã mua hàng. Bạn sẽ được chuyển hướng về trang chủ ngay bây giờ.</p>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <form onSubmit={handlePlaceOrder} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Thông tin giao hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Tên</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={shippingInfo.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                      required
                    />
                </div>
                 <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Họ</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={shippingInfo.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                      required
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                      required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      pattern="[0-9]{10,11}" 
                      placeholder=" "
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                      required
                    />
                </div>
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Địa chỉ cụ thể</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                  required
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">Thành phố</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                      required
                    />
                </div>
                <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700">Quận/Huyện</label>
                    <input 
                      type="text" 
                      id="district" 
                      name="district" 
                      value={shippingInfo.district}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                      required
                    />
                </div>
                <div>
                    <label htmlFor="ward" className="block text-sm font-medium text-gray-700">Phường/Xã</label>
                    <input 
                      type="text" 
                      id="ward" 
                      name="ward" 
                      value={shippingInfo.ward}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" 
                      required
                    />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 pt-4">Thông tin thanh toán</h2>
             <button type="submit" disabled={isProcessing} className="w-full px-8 py-3 bg-accent text-white text-lg font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors">
                {isProcessing ? 'Đang xử lý...' : 'Đặt hàng'}
            </button>
        </form>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">Tóm tắt đơn hàng</h2>
            <div className="space-y-2">
                {cart.map(item => (
                    <div key={item._id || item.id} className="flex justify-between text-sm">
                        <span className="truncate pr-2">{item.name} x {item.quantity}</span>
                        <span className="font-medium whitespace-nowrap">{(item.price * item.quantity).toLocaleString('vi-VN')}vnđ</span>
                    </div>
                ))}
            </div>
            <div className="border-t mt-4 pt-4 space-y-2">
                 <div className="flex justify-between text-sm">
                    <span>Tạm tính</span>
                    <span className="font-medium">{subtotal.toLocaleString('vi-VN')}vnđ</span>
                </div>
                 <div className="flex justify-between text-sm">
                    <span>Vận chuyển</span>
                    <span className="font-medium">{shipping.toLocaleString('vi-VN')}vnđ</span>
                </div>
                 <div className="flex justify-between text-sm">
                    <span>Thuế (8%)</span>
                    <span className="font-medium">{taxes.toLocaleString('vi-VN')}vnđ</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                    <span>Tổng cộng</span>
                    <span>{total.toLocaleString('vi-VN')}vnđ</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;