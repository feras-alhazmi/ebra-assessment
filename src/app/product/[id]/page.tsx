"use client";
import { Button } from "@nextui-org/react";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { LuMinus } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import StarRating from "../../components/StarRating";
import { notFound, useParams } from "next/navigation";
import { Product } from "@/app/types/Product";
import axios from "axios";
import ProductTabs from "./components/ProductTabs";
import { useCartStore } from "@/app/store/useCartStore";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function ProductDetails() {
  const { addItem } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 5,
  });
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get<Product>(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-red-600 items-center justify-center">{error}</div>
    );
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="mt-5">
      <p className="text-sm px-5 text-gray-500">
        Home &gt; Shop &gt; Living Room &gt;{" "}
        <span className="text-black font-semibold">Product</span>
      </p>

      <div className="max-w-7xl mx-auto p-5 flex flex-col lg:flex-row gap-10">
        {/* Left Section: Product Images */}
        <div className="flex flex-col w-full lg:w-[45%]">
          {/* Main Image */}
          <div className="relative w-full h-[450px] bg-[#F3F5F7] rounded-xl flex justify-center items-center">
            <div className="w-[300px] ">
              <Image
                src={selectedImage || product.image}
                alt="Product Image"
                fill
                className="mix-blend-multiply"
              />
            </div>
            {/* Labels */}
            <div className="absolute top-3 left-3 space-y-2">
              <p className="bg-white text-black text-center font-bold px-4 rounded-sm">
                New
              </p>
              <p className="bg-[#38CB89] text-white text-center font-bold px-4 rounded-sm">
                -50%
              </p>
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="flex mt-4 space-x-3">
            {images.map((img, index) => (
              <div
                key={index}
                className={`w-24 h-24  ${
                  selectedImage === img ? "border border-black" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <Image src={img} alt="Thumbnail" width={70} height={70} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="w-full lg:w-1/2 space-y-4 mt-6 lg:mt-0">
          {/* Title & Rating */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <StarRating rating={product.rating.rate} />
              <span className="text-gray-500 text-sm">
                {product.rating.count} Reviews
              </span>
            </div>
            <h1 className="text-2xl font-semibold">{product.title}</h1>

            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-gray-400 line-through text-lg">
              ${(product.price * 2).toFixed(2)}
            </span>
          </div>

          {/* Offer Timer */}
          <div>
            <p className="text-gray-600 mb-2 ">Offer expires in:</p>
            <div className="flex space-x-2 text-center">
              {Object.entries(timeLeft).map(([key, value]) => (
                <div key={key}>
                  <div className="p-2 w-[60px] h-[60px] bg-gray-100 text-black font-semibold rounded-md">
                    <p className="text-4xl">{String(value).padStart(2, "0")}</p>
                  </div>
                  <p className="text-xs text-gray-600">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Measurements */}
          <div>
            <p className="text-gray-600">Measurements</p>
            <div className="flex space-x-3 mt-2">17 1/2 x 20 5/8 "</div>
          </div>

          {/* Color Selection */}
          <div>
            <p className="text-gray-600 flex items-center">
              Choose Color <IoIosArrowForward className="ml-2" />
            </p>
            <div className="flex space-x-3 mt-2">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`p-1 border ${
                    selectedColor.name === color.name
                      ? "border-black"
                      : "border-gray-300"
                  } rounded-sm cursor-pointer`}
                  onClick={() => setSelectedColor(color)}
                >
                  <Image
                    src={color.image}
                    alt={color.name}
                    width={40}
                    height={40}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Wishlist */}
          <div className="w-full lg:w-96">
            <div className="flex items-center space-x-3">
              <div className="flex justify-between w-32 bg-[#F5F5F5] rounded-xl p-2 space-x-2">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                >
                  <LuMinus className="text-sm  text-gray-800 " size={20} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((prev) => prev + 1)}>
                  <GoPlus className="text-sm text-gray-800 " size={20} />
                </button>
              </div>
              <Button className="border flex items-center px-4 py-2 rounded-lg w-full">
                <CiHeart size={20} /> Wishlist
              </Button>
            </div>

            {/* Add to Cart Button */}
            <Button
              onPress={() =>
                addItem({
                  name: product.title,
                  price: product.price,
                  image: product.image,
                  quantity: quantity,
                  id: product.id,
                  color: "black",
                })
              }
              className="bg-black text-white rounded-lg w-full h-12 mt-4"
            >
              Add to Cart
            </Button>
          </div>

          {/* SKU & Category */}
          <div className="flex justify-between text-gray-600 text-sm mt-2 w-full max-w-xs">
            <span>SKU:</span>
            <span>1117</span>
          </div>

          <div className="flex justify-between text-gray-600 text-sm w-full max-w-xs">
            <span>CATEGORY:</span>
            <span>{product.category}</span>
          </div>
        </div>
      </div>
      <ProductTabs />
    </div>
  );
}
const images = [
  "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
];
const colors = [
  {
    name: "Black",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  },
  {
    name: "Brown",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    name: "Red",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  },
];
