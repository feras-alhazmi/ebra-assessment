"use client";
import { Product } from "@/app/types/Product";
import React, { useState } from "react";
import ShopBanner from "./ShopBanner";
import FilterSidebar from "./FilterSidebar";
import ProductList from "./ProductList";


interface Props {
  products: Product[];
}

const ProductView: React.FC<Props> = ({ products }) => {
  const [filteredProducts, setProducts] = useState<Product[]>(products);
  return (
    <div className="mx-10 mt-6 justify-start">
      <main>
        <ShopBanner />
        <div className=" md:flex w-full">
          <div className="w-64 h-screen sticky top-15 overflow-y-auto hidden md:block">
            <FilterSidebar products={products} setProducts={setProducts} />
          </div>

          <div className="flex-1 p-5 overflow-y-auto">
            <ProductList products={filteredProducts} />
          </div>
        </div>
      </main>
    </div>
  );
};
export default ProductView;