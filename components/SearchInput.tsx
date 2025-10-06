import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const SearchInput: React.FC = () => {
    const { searchTerm, setSearchTerm } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term && location.pathname !== '/products') {
            navigate('/products');
        }
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); navigate('/products'); }} className="relative">
            <input
                type="search"
                placeholder="Tìm sản phẩm...?"
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-4 pr-10 py-2 border border-gray-300 text-gray-900 placeholder-gray-500 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
            />
             <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
                <SearchIcon className="h-5 w-5 text-gray-400 hover:text-primary" />
            </button>
        </form>
    );
};

export default SearchInput;