"use client";
import { useCartStore } from "@/app/store/useCartStore";
import React from "react";

const StepHeader = () => {
  const currentStep = useCartStore((state) => state.currentStep);

  const steps = [
    { step: 1, label: "Shopping cart" },
    { step: 2, label: "Checkout details" },
    { step: 3, label: "Order complete" },
  ];

  return (
    <div className="flex items-center justify-center my-6">
      {steps.map((s, index) => (
        <div
          key={s.step}
          className={`flex items-center pb-4  w-60 ${
            currentStep === s.step ? " border-b-2   border-black" : ""
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold 
              ${
                currentStep === s.step
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-500"
              }
            `}
          >
            {s.step}
          </div>
          <p className="ml-2 mr-4">{s.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StepHeader;
