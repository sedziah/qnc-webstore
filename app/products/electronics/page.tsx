"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/productCard/ProductCard"
import { apiService } from "../../../services/apiService"; // Adjust the path as necessary
import styles from "./Electronics.module.css"

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
  // Explicitly define the state type
  const [products, setProducts] = useState<TransformedProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getElectronics(); // Assuming getElectronics is correctly implemented
        console.log("Fetched products:", data);
        setProducts(data); // This should now work without type errors
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.imageBox}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          category={product.category}
          // description={'Test product'} // Ensure your API or transform function provides this
          price={product.price}
          imageSrc={product.image}
          imageAlt={`Image of ${product.name}`}
        />
      ))}
    </div>
  );
};

export default ElectronicsProducts;
