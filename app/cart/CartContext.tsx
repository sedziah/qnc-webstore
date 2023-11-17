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
  title: string;
  price: number;
  image: string;
  // Include other properties as needed
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  handleAddToCart: (productId: string) => Promise<void>;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  removeCartItem: (productId: string) => void;
}

const CartContext = createContext<CartContextType>(null!);

interface CartProviderProps {
  children: ReactNode; // Defining the type for children
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Helper function to persist the cart state to local storage
  const saveCartToLocalStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateCartCount = () => {
    const totalCount = cart.reduce((count, item) => count + item.quantity, 0);
    return totalCount;
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(0, quantity) }
        : item
    );
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  // Function to remove a cart item
  const removeCartItem = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  // This function simulates fetching product details from local storage.
  function getProductDetails(productId: string) {
    // Retrieve the product list from local storage
    const products = JSON.parse(localStorage.getItem("products") || "[]");

    // Find the product with the matching productId
    const product = products.find(
      (productId: string) => product.id === productId
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

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
        const productDetails = getProductDetails(productId);
        newCart = [
          ...cart,
          {
            id: productId,
            quantity: 1,
            title: productDetails.title, // Replace with actual title
            price: productDetails.price, // Replace with actual price
            image: productDetails.image, // Replace with actual image URL
          },
        ];
      }

      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
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
