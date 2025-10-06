
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link to="/" className="inline-block bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition-colors">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
