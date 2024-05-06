'use client'


import { Coffee } from "@/app/page";
// CartContext.tsx

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";


export interface CartItem {
  coffee: Coffee;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (coffee: Coffee, quantity: number) => void;
  removeFromCart: (coffeeId: number) => void;
  updateCartItemQuantity: (coffeeId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart data from localStorage on component mount
    useEffect(() => {
        const storedCart = sessionStorage.getItem("cart");
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      }, []);
      
      // Save cart data to sessionStorage whenever cart changes
      useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);


  const addToCart = (coffee: Coffee, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.coffee.id === coffee.id);
  
      if (existingItem) {
        const updatedCart = prevCart.map((item) =>
          item.coffee.id === coffee.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log("inside if of context", updatedCart);
        return updatedCart;
      } else {
        const updatedCart = [...prevCart, { coffee, quantity }];
        console.log("inside else of context", updatedCart);
        return updatedCart;
      }
    });
  };
  

  const removeFromCart = (coffeeId: number) => {
    setCart(cart.filter((item) => item.coffee.id !== coffeeId));
  };

  const updateCartItemQuantity = (coffeeId: number, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.coffee.id === coffeeId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCartItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

