"use client";
import React, { useState } from "react";

const ReviewInput = () => {
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (review.trim()) {
      console.log("Review Submitted:", review);
      setReview(""); // Clear input after submission
    }
  };

  return (
    <div className="flex w-full items-end border p-2 border-gray-200 rounded-lg overflow-hidden shadow-sm mt-6">
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-2 text-sm rounded-full hover:bg-gray-800 ml-auto  transition-all"
      >
        Write Review
      </button>
    </div>
  );
};

export default ReviewInput;
