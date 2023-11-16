"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/productCard/ProductCard";
import styles from "./page.module.css";
import { apiService } from "@/services/apiService";

type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
};

const products: Product[] = [
  // Dummy product data, replace with real data as needed
  {
    id: "1",
    title: "Product 1",
    image: "/images/deals/deals_1.png",
    price: 19.99,
  },
  {
    id: "2",
    title: "Product 2",
    image: "/images/deals/deals_2.png",
    price: 29.99,
  },
  {
    id: "3",
    title: "Product 2",
    image: "/images/deals/deals_3.png",
    price: 29.99,
  },
  {
    id: "4",
    title: "Product 2",
    image: "/images/deals/deals_4.png",
    price: 29.99,
  },
  {
    id: "5",
    title: "Product 2",
    image: "/images/deals/deals_5.jpg",
    price: 29.99,
  },
  {
    id: "6",
    title: "Product 2",
    image: "/images/deals/deals_6.jpg",
    price: 29.99,
  },
  // ... more products
];

const Page = () => {
  const [cartCount, setCartCount] = useState(0);

  // Effect to update the cart count on initial load
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    updateCartCount(cart);
  }, []);

  // Function to update the cart count
  const updateCartCount = (cart: any[]) => {
    const totalCount = cart.reduce((count, item) => count + item.quantity, 0);
    setCartCount(totalCount);
  };

  const handleAddToCart = async (productId: string) => {
    console.log("Add to cart:", productId);
    const isLoggedIn = false; // Replace with actual login check

    if (isLoggedIn) {
      // User is logged in, call the API to add the item to the cart
      try {
        const updatedCart = await apiService.addToCart(productId, 1); // Replace with actual API call
        console.log("Item added to cart:", updatedCart);
        // Here you would update your state/context with the updated cart
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      // User is not logged in, store the cart in local storage
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItem = cart.find((item: any) => item.id === productId);

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity
      } else {
        cart.push({ id: productId, quantity: 1 }); // Add new item
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Item added to local storage cart");
      updateCartCount(cart);
    }
  };

  return (
    <div>
      <div className={styles.cartCount}>Cart Items: {cartCount}</div>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;