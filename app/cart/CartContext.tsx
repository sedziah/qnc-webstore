// app/cart/CartContext.js
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CartItem {
  id: string;
  quantity: number;
  price: number; // Assuming each cart item has a price field
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  totalAmount: number;
  handleAddToCart: (item: CartItem) => void;
  updateCartItemQuantity: (productId: string, newQuantity: number) => void;
  removeCartItem: (productId: string) => void;
  clearCart: () => void; // Changed from '() => {}' to '() => void'
}

const CartContext = createContext<CartContextType>({
  cart: [],
  cartCount: 0,
  totalAmount: 0,
  handleAddToCart: () => {},
  updateCartItemQuantity: () => {},
  removeCartItem: () => {},
  clearCart: () => {
    return;
  }, // Explicitly returning void
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // Initialize cart from local storage or other persistent storage here
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const saveCartToLocalStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToCart = (item: CartItem) => {
    let updatedCart = [...cart]; // Create a shallow copy of the cart array
    const itemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (itemIndex >= 0) {
      // Update the quantity of the existing item
      const updatedItem = {
        ...updatedCart[itemIndex],
        quantity: updatedCart[itemIndex].quantity + item.quantity,
      };
      updatedCart[itemIndex] = updatedItem; // Replace the item in the array
    } else {
      // Add the new item to the cart
      updatedCart.push(item);
    }

    setCart(updatedCart); // Update the cart state
    saveCartToLocalStorage(updatedCart); // Save the updated cart to local storage
  };

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const removeCartItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const clearCart = () => {
    setCart([]); // Reset the cart state to an empty array
    localStorage.removeItem("cart"); // Clear the cart from localStorage if you're using it
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        totalAmount,
        handleAddToCart,
        updateCartItemQuantity,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
