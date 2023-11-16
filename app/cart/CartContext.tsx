// src/cart/CartContext.js
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiService } from "../../services/apiService"; // Adjust the import path as necessary

interface CartItem {
  id: string;
  quantity: number;
  // Include other properties as needed
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  handleAddToCart: (productId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  cartCount: 0,
  handleAddToCart: async () => {}, // Provide a default no-op function
});

interface CartProviderProps {
  children: ReactNode; // Defining the type for children
}


export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const updateCartCount = () => {
    const totalCount = cart.reduce((count, item) => count + item.quantity, 0);
    return totalCount;
  };

  const handleAddToCart = async (productId: string) => {
    const isLoggedIn = false; // Replace with actual login check

    if (isLoggedIn) {
      try {
        const updatedCart = await apiService.addToCart(productId, 1); // Replace with actual API call
        setCart(updatedCart);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      const existingItem = cart.find((item) => item.id === productId);
      let newCart;
      if (existingItem) {
        newCart = cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...cart, { id: productId, quantity: 1 }];
      }
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, cartCount: updateCartCount(), handleAddToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
