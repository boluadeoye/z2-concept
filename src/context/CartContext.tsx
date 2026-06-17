"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: number | string;
  variationId?: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: any, qty?: number, variation?: any) => void;
  removeFromCart: (id: number | string, variationId?: number) => void;
  updateQuantity: (id: number | string, delta: number, variationId?: number) => void;
  clearCart: () => void;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("z2_cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setCart(parsed);
      } catch (e) {
        localStorage.removeItem("z2_cart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("z2_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any, qty: number = 1, variation: any = null) => {
    setCart((prev) => {
      const existing = prev.find((item) =>
        variation ? item.variationId === variation.id : item.id === product.id && !item.variationId
      );

      if (existing) {
        return prev.map((item) =>
          (variation ? item.variationId === variation.id : item.id === product.id && !item.variationId)
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      // CLEAN PRICE LOGIC: Strip ₦ and commas
      const rawPrice = variation?.price || product.price || "0";
      const cleanPrice = parseFloat(String(rawPrice).replace(/[^\d.]/g, ""));

      return [
        ...prev,
        {
          id: product.id,
          variationId: variation?.id,
          name: product.name,
          price: cleanPrice,
          image: variation?.image?.src || product.images?.[0]?.src || "",
          quantity: qty,
        },
      ];
    });
  };

  const removeFromCart = (id: number | string, variationId?: number) => {
    setCart((prev) => prev.filter((item) => (variationId ? item.variationId !== variationId : item.id !== id)));
  };

  const updateQuantity = (id: number | string, delta: number, variationId?: number) => {
    setCart((prev) =>
      prev.map((item) =>
        (variationId ? item.variationId === variationId : item.id === id && !item.variationId)
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("z2_cart");
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error("useCart must be used within a CartProvider");
  return context;
};
