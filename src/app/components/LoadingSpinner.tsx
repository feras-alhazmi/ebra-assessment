import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center mt-48">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-white rounded-full animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
