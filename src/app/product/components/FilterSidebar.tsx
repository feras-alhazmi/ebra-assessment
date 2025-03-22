"use client";
import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { Product } from "../../types/Product";

const priceRanges = [
  { label: "All Price", min: 0, max: Infinity },
  { label: "$0.00 - 99.99", min: 0, max: 99.99 },
  { label: "$100.00 - 199.99", min: 100, max: 199.99 },
  { label: "$200.00 - 299.99", min: 200, max: 299.99 },
  { label: "$300.00 - 399.99", min: 300, max: 399.99 },
  { label: "$400.00+", min: 400, max: Infinity },
];

interface Props {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;

  products: Product[]; // full list of unfiltered products
}

const FilterSidebar: React.FC<Props> = ({ setProducts, products }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const categories = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  // Apply both filters together
  useEffect(() => {
    let filtered = products;

    if (activeCategory !== "All") {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice];
      filtered = filtered.filter(
        (p) => p.price >= range.min && p.price <= range.max
      );
    }

    setProducts(filtered);
  }, [activeCategory, selectedPrice, products, setProducts]);

  return (
    <div className="w-64 p-5 bg-white">
      {/* Filter Header */}
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <FiFilter size={20} /> Filter
      </h2>

      {/* Categories Section */}
      <div className="mt-4">
        <h3 className="text-md font-bold text-gray-600">CATEGORIES</h3>
        <ul className="mt-2 space-y-2 h-40 overflow-y-auto">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer ${
                activeCategory === category
                  ? "font-bold underline"
                  : "text-gray-500"
              }`}
              onClick={() =>
                setActiveCategory(
                  category === activeCategory ? "All" : category
                )
              }
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter Section */}
      <div className="mt-6">
        <h3 className="text-md font-bold text-gray-600">PRICE</h3>
        <div className="mt-3 space-y-2">
          {priceRanges.map((range, index) => (
            <label
              key={index}
              className="flex justify-between gap-2 cursor-pointer"
            >
              <span>{range.label}</span>
              <input
                type="checkbox"
                checked={selectedPrice === index}
                onChange={() =>
                  setSelectedPrice(selectedPrice === index ? null : index)
                }
                className="w-5 h-5 accent-black"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
