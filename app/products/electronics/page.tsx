"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/productCard/ProductCard";
import { apiService } from "../../../services/apiService";
import styles from "./page.module.css";

// Ensure this interface is defined and matches the structure of your product data
interface TransformedProduct {
  id: string;
  name: string;
  category: string;
  // description: string; // Make sure to include a description in your TransformedProduct
  price: number;
  image: string;
  // Add any other fields you expect from your API
}

const ElectronicsProducts = () => {
  const [products, setProducts] = useState<TransformedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Start loading
        const data = await apiService.getElectronics();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        // End loading
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.pageContainer}>
      {isLoading && <div className={styles.loadingOverlay}>Loading...</div>}

      {!isLoading && (
        <div className={styles.imageBox}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              imageSrc={product.image}
              imageAlt={`Image of ${product.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ElectronicsProducts;
