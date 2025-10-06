import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart } = useAppContext();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Giỏ hàng của bạn</h1>
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg mb-4">Giỏ hàng của bạn đang trống.</p>
          <Link to="/products" className="text-white bg-primary hover:bg-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            {cart.map(item => {
              const itemId = item._id || item.id || '';
              return (
              <div key={itemId} className="flex flex-col md:flex-row items-center justify-between border-b pb-4">
                <div className="flex items-center mb-4 md:mb-0">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-500">{item.price.toLocaleString('vi-VN')}vnđ</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-md">
                         <button onClick={() => updateCartQuantity(itemId, item.quantity - 1)} className="px-3 py-1 text-lg font-semibold text-gray-600 hover:bg-gray-100">-</button>
                         <input type="text" readOnly value={item.quantity} className="w-12 text-center border-l border-r" />
                         <button onClick={() => updateCartQuantity(itemId, item.quantity + 1)} className="px-3 py-1 text-lg font-semibold text-gray-600 hover:bg-gray-100">+</button>
                    </div>
                  <p className="text-lg font-semibold w-32 text-right">{(item.price * item.quantity).toLocaleString('vi-VN')}vnđ</p>
                  <button onClick={() => removeFromCart(itemId)} className="text-red-500 hover:text-red-700 text-2xl font-semibold">&times;</button>
                </div>
              </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col items-end">
            <div className="text-xl font-bold mb-4">
              <span>Tạm tính: </span>
              <span>{subtotal.toLocaleString('vi-VN')}vnđ</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">Phí vận chuyển & thuế sẽ được tính khi thanh toán.</p>
            <Link to="/checkout" className="w-full md:w-auto text-center px-8 py-3 bg-accent text-white text-lg font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors">
              Tiến hành thanh toán
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;