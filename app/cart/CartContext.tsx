//app/cart/CartContext.js
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
  updateCartItemQuantity: (productId: string, newQuantity: number) => void;
  removeCartItem: (productId: string) => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  cartCount: 0,
  handleAddToCart: async () => {}, // Provide a default no-op function
  updateCartItemQuantity: (productId: string, newQuantity: number) => {},
  removeCartItem: (productId: string) => {},
});



interface CartProviderProps {
  children: ReactNode; // Defining the type for children
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to save cart to local storage
  const saveCartToLocalStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Initialize cart from local storage
  useEffect(() => {
    let storedCart;
    try {
      storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    } catch (error) {
      console.error("Error parsing cart from local storage:", error);
      storedCart = [];
    }
    setCart(storedCart); // Set the cart state with the stored cart
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
      // localStorage.setItem("cart", JSON.stringify(newCart));
      saveCartToLocalStorage(newCart); // Save updated cart to local storage
    }
  };

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    // Ensure the new quantity is not less than 1
    if (newQuantity < 1) {
      console.warn("Quantity cannot be less than 1");
      return; // Exit the function if the new quantity is invalid
    }

    // Optionally, you can also add a maximum limit check
    // const MAX_QUANTITY = 10; // Example maximum limit
    // if (newQuantity > MAX_QUANTITY) {
    //   console.warn(`Quantity cannot exceed ${MAX_QUANTITY}`);
    //   return; // Exit the function if the new quantity exceeds the limit
    // }

    // Find the cart item by productId and update its quantity
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );

    // Update the cart state with the new cart
    setCart(updatedCart);

    // Save the updated cart to local storage
    saveCartToLocalStorage(updatedCart);
  };

  const removeCartItem = (productId: string) => {
    // Filter out the item with the given productId
    const updatedCart = cart.filter((item) => item.id !== productId);

    // Update the cart state with the new cart
    setCart(updatedCart);

    // Save the updated cart to local storage
    saveCartToLocalStorage(updatedCart);
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: updateCartCount(),
        handleAddToCart,
        updateCartItemQuantity,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
