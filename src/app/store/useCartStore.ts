import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types/CartItem ";


/** Represents each shipping method. */
type ShippingMethod = "FREE" | "EXPRESS" | "PICKUP";

/** Represents the current step in the checkout process. */
type CartStep = 1 | 2 | 3;

interface CartState {
  cartItems: CartItem[];
  shippingMethod: ShippingMethod;
  currentStep: CartStep;
  couponCode: string;

  /** Actions */
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setCouponCode: (code: string) => void;
  setCurrentStep: (step: CartStep) => void;

  /** Derived states */
  getSubtotal: () => number;
  getShippingCost: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      /** Initial State */
      cartItems: [
      ],
      shippingMethod: "FREE",
      currentStep: 1,
      couponCode: "",

      /** Actions */
      addItem: (item) => {
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (cartItem) => cartItem.id === item.id 
          );
      
          if (existingItemIndex !== -1) {
            // Item already exists, update its quantity
            const updatedItems = [...state.cartItems];
            updatedItems[existingItemIndex].quantity += item.quantity;
            return { cartItems: updatedItems };
          } else {
            // New item
            return { cartItems: [...state.cartItems, item] };
          }
        });
      },
      

      removeItem: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      setShippingMethod: (method) => {
        set(() => ({ shippingMethod: method }));
      },

      setCouponCode: (code) => {
        set(() => ({ couponCode: code }));
      },

      setCurrentStep: (step) => {
        set(() => ({ currentStep: step }));
      },

      /** Derived states / helpers */
      getSubtotal: () => {
        return get().cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      getShippingCost: () => {
        const method = get().shippingMethod;
        return method === "EXPRESS" ? 15 : 0;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getShippingCost();
      },
    }),
    {
      name: "cart-storage", // Key in localStorage
      getStorage: () => localStorage, // Persist in localStorage
    }
  )
);
