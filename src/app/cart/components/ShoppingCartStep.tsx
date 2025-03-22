import React, { useState } from "react";

import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCartStore } from "@/app/store/useCartStore";
import { LuMinus } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { Button } from "@nextui-org/react";

const ShippingMethods = ["FREE", "EXPRESS", "PICKUP"] as const;

const ShoppingCartStep = () => {
  const {
    cartItems,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotal,
    getShippingCost,
    shippingMethod,
    setShippingMethod,
    couponCode,
    setCouponCode,
    setCurrentStep,
  } = useCartStore();

  const [localCoupon, setLocalCoupon] = useState(couponCode);

  const handleApplyCoupon = () => {
    setCouponCode(localCoupon);
    // In a real app, you might validate the coupon, etc.
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left: Cart Items */}
      <div className="flex-1">
        {/* Table Headers */}
        <div className="hidden md:flex font-semibold border-b pb-2 mb-4">
          <div className="w-1/4">Product</div>
          <div className="w-1/6">Quantity</div>
          <div className="w-1/6">Price</div>
          <div className="w-1/6">Subtotal</div>
        </div>

        {/* Cart Items List */}
        {cartItems.map((item) => {
          const subtotal = item.price * item.quantity;
          return (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center md:space-x-4 mb-4"
            >
              {/* Product Info */}
              <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
                <Image
                  src={item.image}
                  alt={"Product Image"}
                  width={80}
                  height={80}
                  className="mr-4"
                />
                <div>
                  <p className="font-semibold text-nowrap ">
                    {item.name.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <p className="text-sm text-gray-500">Color: {item.color}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 text-sm mt-1"
                  >
                    <span className="text-lg px-1">X</span> Remove
                  </button>
                </div>
              </div>

              {/* Quantity */}

              <div className="flex justify-between w-24 border rounded-md p-2 space-x-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                >
                  <LuMinus className="text-sm  text-gray-800 " size={20} />
                </button>
                <span> {item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity + 1))
                  }
                >
                  <GoPlus className="text-sm text-gray-800 " size={20} />
                </button>
              </div>

              {/* Price */}
              <div className="w-full md:w-1/6 text-center mb-2 md:mb-0">
                ${item.price.toFixed(2)}
              </div>

              {/* Subtotal */}
              <div className="w-full md:w-1/6 text-center">
                ${subtotal.toFixed(2)}
              </div>
            </div>
          );
        })}

        {/* Coupon */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Have a coupon?</h3>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Coupon Code"
              value={localCoupon}
              onChange={(e) => setLocalCoupon(e.target.value)}
              className="border rounded px-3 py-2 w-52"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Right: Cart Summary */}
      <div className="w-full md:w-[360px] border rounded p-4 h-fit">
        <h3 className="font-bold mb-4">Cart summary</h3>
        {/* Shipping Methods */}
        <div className="mb-4">
          {ShippingMethods.map((method) => {
            // Customize labels and cost display
            let label = "";
            let costLabel = "";
            if (method === "FREE") {
              label = "Free shipping";
              costLabel = "$0.00";
            } else if (method === "EXPRESS") {
              label = "Express shipping";
              costLabel = "+$15.00";
            } else if (method === "PICKUP") {
              label = "Pick Up";
              costLabel = "%21.00";
            }

            // Check if current method is selected
            const isSelected = shippingMethod === method;

            return (
              <label
                key={method}
                className={`
        flex items-center justify-between mb-2 border rounded-md p-3 cursor-pointer
        ${
          isSelected
            ? "bg-gray-100 border-gray-500" // Highlight style for selected
            : "bg-white border-gray-300" // Default style for unselected
        }
      `}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={isSelected}
                    onChange={() => setShippingMethod(method)}
                    className="accent-black"
                  />
                  <span className="font-medium">{label}</span>
                </div>
                <span className="text-gray-600">{costLabel}</span>
              </label>
            );
          })}
        </div>

        {/* Totals */}
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Subtotal</span>
            <span>${getSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Shipping</span>
            <span>${getShippingCost().toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold mb-4">
            <span>Total</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          <button
            onClick={() => setCurrentStep(2)}
            className="bg-black text-white w-full py-2 rounded"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartStep;
