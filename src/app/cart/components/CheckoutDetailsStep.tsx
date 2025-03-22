"use client";
import { useCartStore } from "@/app/store/useCartStore";
import React from "react";

const CheckoutDetailsStep = () => {
  const setCurrentStep = useCartStore((state) => state.setCurrentStep);

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-4">Checkout Details (Step 2)</h2>
      <p className="text-gray-600 mb-6">[Checkout form goes here...]</p>
      <button
        onClick={() => setCurrentStep(3)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Continue to Step 3
      </button>
    </div>
  );
};

export default CheckoutDetailsStep;
