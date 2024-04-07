// app/products/mobile-phones/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/productCard/ProductCard";
import { apiService } from "../../../services/apiService";
import styles from "./page.module.css";
import SearchBar from "../../../components/searchbar/index";
import Breadcrumbs from "../../../components/breadcrumbs/index";
// Import the useCart hook from your CartContext
import { useCart } from "../../cart/CartContext";

interface TransformedProduct {
  id: string;
  name: string;
  category: string;
  condition: string;
  price: number;
  image: string;
  features: string;
}

const ElectronicsProducts = () => {
  const [products, setProducts] = useState<TransformedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Use the useCart hook to access the handleAddToCart function from the context
  const { handleAddToCart } = useCart();

  const crumbs = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products/electronics" },
    { title: "Mobile Phones", href: "/products/electronics" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getMobilePhones();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <SearchBar />
      <Breadcrumbs crumbs={crumbs} />

      <div className={styles.pageContainer}>
        {isLoading && <div className={styles.loadingOverlay}>Loading...</div>}

        {!isLoading && (
          <div className={styles.imageBox}>
            {products.map((product) => {
              // Log the details of the current product
              console.log("Displaying product details:", product);

              // Construct a CartItem object
              const cartItem = {
                id: product.id,
                quantity: 1, // Assuming you want to add 1 quantity of the product to the cart
                price: product.price, // Use the product's price
              };

              // Return the ProductCard component
              return (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  category={product.category}
                  condition={product.condition}
                  features={product.features}
                  price={product.price}
                  imageSrc={product.image}
                  imageAlt={`Image of ${product.name}`}
                  onAddToCart={() => handleAddToCart(cartItem)} // Pass the CartItem object instead of just the ID
                />
              );
            })}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className={styles.noProductsMessage}>
            No products found in this category.
          </div>
        )}
      </div>
    </>
  );
};

export default ElectronicsProducts;
