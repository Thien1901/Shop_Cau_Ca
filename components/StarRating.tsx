import React from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const Star: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
);


const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex items-center justify-center">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return <Star key={index} filled={starValue <= rating} />;
      })}
    </div>
  );
};

export default StarRating;
