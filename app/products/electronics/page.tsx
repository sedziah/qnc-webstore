"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/productCard/ProductCard";
import { apiService } from "../../../services/apiService";
import styles from "./page.module.css";
import SearchBar from "../../../components/searchbar/index";
import Breadcrumbs from "../../../components/breadcrumbs/index";

interface TransformedProduct {
  id: string;
  name: string;
  category: string;
  condition: string;
  // description: string; // Make sure to include a description in your TransformedProduct
  price: number;
  image: string;
  // Add any other fields you expect from your API
}

const ElectronicsProducts = () => {
  const [products, setProducts] = useState<TransformedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const crumbs = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Mobile Phones", href: "/electronics" },
  ];

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
    <>
      <div>
        <SearchBar />
      </div>
      <div>
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className={styles.pageContainer}>
        {isLoading && <div className={styles.loadingOverlay}>Loading...</div>}

        {!isLoading && (
          <div className={styles.imageBox}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                category={product.category}
                condition={product.condition}
                price={product.price}
                imageSrc={product.image}
                imageAlt={`Image of ${product.name}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ElectronicsProducts;

