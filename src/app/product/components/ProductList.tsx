"use client";
import React, { useState } from "react";
import ProductItem from "./ProductItem";
import SortingAndLayout from "../../components/SortingLayout"; // Import the sorting & layout component
import { Product } from "../../types/Product";

interface Props {
  products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  const [view, setView] = useState("grid"); // State to manage layout type

  return (
    <div className="max-w-7xl mx-auto p-5">
      {/* Sorting & Layout Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Living Room</h1>
        <SortingAndLayout setView={setView} />
      </div>

      {/* Product Grid/List Layout */}

      <div
        className={`${
          view === "grid"
            ? "grid grid-cols-3 gap-6"
            : view === "medium-grid"
            ? "grid grid-cols-2 gap-6"
            : "space-y-6"
        }`}
      >
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
