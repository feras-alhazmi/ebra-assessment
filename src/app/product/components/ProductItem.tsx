"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import StarRating from "../../components/StarRating";
import { Product } from "../../types/Product";
import Link from "next/link";
import { useCartStore } from "../../store/useCartStore";
interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const { addItem } = useCartStore();
  return (
    <Link href={`/product/${product.id}`}>
      <div className="  bg-white p-4 space-y-2">
        {/* Product Card */}
        <div className="relative w-64  h-80  bg-[#F3F5F7] rounded-xl p-2 flex flex-col items-center justify-center group overflow-hidden">
          {/* Product Image (Takes Full Space) */}
          <div className="relative w-full h-80 ">
            <Image
              className=" mix-blend-multiply mt-10"
              src={product.image}
              alt="product photo"
              fill
              priority
            />

            {/* Top Labels */}
            <div className="absolute top-2 left-2 space-y-2">
              <p className="bg-white text-black text-center font-bold px-4  rounded-sm">
                New
              </p>
              <p className="bg-[#38CB89] text-white text-center font-bold px-4  rounded-sm">
                -50%
              </p>
            </div>

            {/* Heart Icon */}
            <CiHeart
              className="absolute top-2 right-2 bg-white text-black text-center p-2 rounded-full transition-opacity duration-300 cursor-pointer"
              size={35}
            />
          </div>

          {/* Add to Cart Button (Appears on Hover) */}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addItem({
                name: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,
                id: product.id,
                color: "",
              });
            }}
            className="bg-black text-white rounded-lg w-56 h-10 mt-4  transition-opacity duration-300"
          >
            Add to cart
          </Button>
        </div>

        {/* Bottom Info */}
        <StarRating />
        <p className="text-sm text-gray-500">{product.title}</p>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold">${product.price}</span>
          <span className="text-gray-400 line-through text-sm">
            ${product.price * 2}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
