import React from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating?: number; // Optional prop to set the rating dynamically (default is 5)
}

const StarRating: React.FC<StarRatingProps> = ({ rating = 5 }) => {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar
          key={index}
          className={`text-[#343839] ${
            index < rating ? "text-black" : "opacity-50"
          }`}
          size={16}
        />
      ))}
    </div>
  );
};

export default StarRating;
