import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Câu Cá TV. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;