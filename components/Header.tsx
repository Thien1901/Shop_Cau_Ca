import React, { useState, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SearchInput from './SearchInput';

const Logo: React.FC = () => (
    <svg width="200" height="60" viewBox="0 0 200 60" className="text-gray-800">
    <defs>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap');
          .logo-text { font-family: 'Roboto Condensed', sans-serif; fill: currentColor; }
        `}
      </style>
    </defs>
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="logo-text" fontSize="32" fontWeight="bold">
      Câu Cá TV
    </text>
  </svg>
);


const ShoppingCartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


const NavItem: React.FC<{ to: string, children: React.ReactNode, hasDropdown?: boolean }> = ({ to, children, hasDropdown }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `px-3 py-4 text-sm font-bold uppercase transition-colors flex items-center ${isActive ? 'text-white bg-dark' : 'text-gray-200 hover:text-white hover:bg-dark'}`}
  >
    {children}
    {hasDropdown && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
  </NavLink>
);

const UserMenu: React.FC = () => {
    const { user, logout } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);

    if (!user) {
        return (
            <Link to="/login" className="flex items-center text-sm font-semibold text-gray-700 hover:text-primary transition-colors">
                <UserIcon className="w-6 h-6 mr-1"/>
                Đăng nhập
            </Link>
        )
    }

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center text-sm font-semibold text-gray-700 hover:text-primary transition-colors focus:outline-none">
                 <UserIcon className="w-6 h-6 mr-1"/>
                 Chào, {user.name}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isOpen && (
                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                    {user.role === 'admin' && (
                         <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                           Admin
                         </Link>
                    )}
                    <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                       Đăng xuất
                    </button>
                 </div>
            )}
        </div>
    )
}

const Header: React.FC = () => {
  const { cart } = useAppContext();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      {/* Top Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="flex-1 max-w-xl mx-4">
            <SearchInput />
          </div>
          <div className="flex items-center space-x-4">
            <UserMenu />
            <Link to="/cart" className="flex items-center bg-accent text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
              <ShoppingCartIcon className="mr-2" />
              <div className="text-sm font-semibold">
                Giỏ hàng ({totalItems})
              </div>
              <div className="border-l border-red-400 ml-3 pl-3 text-sm font-bold">
                {subtotal.toLocaleString('vi-VN')}vnđ
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-primary shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-12">
             <div className="flex items-baseline space-x-1">
                <NavItem to="/">Home</NavItem>
                <NavItem to="/products?category=Cần+câu">Cần Câu</NavItem>
                <NavItem to="/products?category=Máy+câu">Máy Câu</NavItem>
                <NavItem to="/products?category=Dây+câu">Dây Câu</NavItem>
                <NavItem to="/products?category=Mồi+Lure">Mồi Lure</NavItem>
                <NavItem to="/products?category=Phao">Phao</NavItem>
                <NavItem to="/products?category=Lưỡi+câu">Lưỡi Câu</NavItem>
                <NavItem to="/products?category=Phụ+kiện">Phụ Kiện</NavItem>
              </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;