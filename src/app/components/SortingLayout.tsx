"use client";
import React, { useState } from "react";
import { FaThLarge, FaTh, FaBars, FaGripLines } from "react-icons/fa"; // Import layout icons

const SortingLayout = ({ setView }: { setView: (view: string) => void }) => {
  const [sortOption, setSortOption] = useState("default");
  const [activeLayout, setActiveLayout] = useState("grid"); // Default layout

  return (
    <div className="flex  items-center space-x-2 mb-6">
      {/* Sorting Dropdown */}

      <select className="w-20" onChange={(e) => setSortOption(e.target.value)}>
        <option value="default">Sort by</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>

      {/* Layout Selection Buttons */}
      <div className="flex  rounded-lg overflow-hidden">
        {/* Grid View */}
        <button
          onClick={() => {
            setView("grid");
            setActiveLayout("grid");
          }}
          className={`p-3 transition hidden md:block ${
            activeLayout === "grid" ? "bg-gray-100 text-black" : "text-gray-500"
          }`}
        >
          <FaTh size={20} />
        </button>

        {/* Medium Grid View */}
        <button
          onClick={() => {
            setView("medium-grid");
            setActiveLayout("medium-grid");
          }}
          className={`p-3 transition hidden md:block ${
            activeLayout === "medium-grid"
              ? "bg-gray-100 text-black"
              : "text-gray-500"
          }`}
        >
          <FaThLarge size={20} />
        </button>

        {/* List View */}
        <button
          onClick={() => {
            setView("list");
            setActiveLayout("list");
          }}
          className={`p-3 transition ${
            activeLayout === "list" ? "bg-gray-100 text-black" : "text-gray-500"
          }`}
        >
          <FaBars size={20} />
        </button>

        {/* Compact List View */}
        <button
          onClick={() => {
            setView("compact-list");
            setActiveLayout("compact-list");
          }}
          className={`p-3 transition hidden md:block  ${
            activeLayout === "compact-list"
              ? "bg-gray-100 text-black"
              : "text-gray-500"
          }`}
        >
          <FaGripLines size={20} />
        </button>
      </div>
    </div>
  );
};

export default SortingLayout;
