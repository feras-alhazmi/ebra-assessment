"use client";
import React from "react";

import { useCartStore } from "../store/useCartStore";
import StepHeader from "./components/StepHeader";
import ShoppingCartStep from "./components/ShoppingCartStep";
import CheckoutDetailsStep from "./components/CheckoutDetailsStep";
import OrderCompleteStep from "./components/OrderCompleteStep";

const CartPage = () => {
  const currentStep = useCartStore((state) => state.currentStep);

  return (
    <div className="max-w-7xl mx-auto py-5 px-20">
      {/* Step Header */}
      <StepHeader />

      {/* Render Step Content */}
      {currentStep === 1 && <ShoppingCartStep />}
      {currentStep === 2 && <CheckoutDetailsStep />}
      {currentStep === 3 && <OrderCompleteStep />}
    </div>
  );
};

export default CartPage;
