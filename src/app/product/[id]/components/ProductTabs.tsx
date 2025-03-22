"use client";
import React, { useState } from "react";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaChevronDown,
} from "react-icons/fa";
import ReviewInput from "./ReviewInput";
import StarRating from "@/app/components/StarRating";
import ReviewCard from "./ReviewCard";

const tabs = ["Additional Info", "Questions", "Reviews"];

const ProductTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Reviews");

  return (
    <div className="  my-8 mx-24 ">
      {/* Tab Navigation */}
      <div className="flex space-x-8 border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-3 px-4 text-sm font-medium ${
              activeTab === tab ? "border-b-1 border-black" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "Additional Info" && (
          <p className="text-gray-600">Additional product details go here.</p>
        )}
        {activeTab === "Questions" && (
          <p className="text-gray-600">
            Frequently asked questions about the product.
          </p>
        )}
        {activeTab === "Reviews" && <CustomerReviews />}
      </div>
    </div>
  );
};

const CustomerReviews: React.FC = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Customer Reviews</h2>

      {/* Star Rating */}
      <div className="flex items-center space-x-2 mt-2">
        <StarRating rating={5} />
        <span className="text-gray-600 text-sm">11 Reviews</span>
      </div>

      {/* Product Name */}
      <p className="mt-4 font-semibold ml-16">Tray Table</p>

      <ReviewInput />

      <div className="flex justify-between items-center mt-6 mb-4">
        {/* Review count */}
        <h3 className="text-2xl font-semibold">11 Reviews</h3>

        {/* Sort dropdown */}
        <div className="relative w-52">
          <select
            value={"Newest"}
            onChange={(e) => {}}
            className="text-base font-semibold border border-[#E5E8EC] rounded-xl px-4 py-2  appearance-none outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer w-full bg-white"
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Highest Rated</option>
            <option>Lowest Rated</option>
          </select>

          {/* Custom dropdown icon */}
          <FaChevronDown
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            size={16}
          />
        </div>
      </div>
      {/* Review List (Example) */}
      <div className="mt-4 space-y-4">
        <ReviewCard
          name="John Doe"
          rating={5}
          comment="I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident."
          avatar="/user.png"
          timeAgo="12h ago"
        />
        <ReviewCard
          name="Jane Smith"
          rating={4}
          comment="I bought it 3 weeks ago and now come back just to say “Awesome Product”. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et quas molestias excepturi sint non provident."
          avatar="/user.png"
          timeAgo="12h ago"
        />
      </div>
    </div>
  );
};

export default ProductTabs;
