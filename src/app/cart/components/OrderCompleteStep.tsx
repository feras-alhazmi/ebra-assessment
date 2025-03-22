import { useCartStore } from "@/app/store/useCartStore";
import React from "react";

const OrderCompleteStep = () => {
  const setCurrentStep = useCartStore((state) => state.setCurrentStep);

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-4">Order Complete (Step 3)</h2>
      <p className="text-gray-600 mb-6">
        Thank you for your order! You will receive a confirmation email soon.
      </p>
      <button
        onClick={() => setCurrentStep(1)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Back to Step 1
      </button>
    </div>
  );
};

export default OrderCompleteStep;
