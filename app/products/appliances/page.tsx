// app/products/appliances/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/productCard/ProductCard";
import { apiService } from "../../../services/apiService";
import styles from "./page.module.css";
import SearchBar from "../../../components/searchbar/index";
import Breadcrumbs from "../../../components/breadcrumbs/index";
import { useCart } from "../../cart/CartContext";


interface TransformedProduct {
  id: string;
  name: string;
  category: string;
  condition: string;
  // description: string; // Make sure to include a description in your TransformedProduct
  price: number;
  image: string;
  features: string;
  // Add any other fields you expect from your API...
}

const AppliancesProducts = () => {
  const [products, setProducts] = useState<TransformedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleAddToCart } = useCart();

  const crumbs = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products/mobile-phones" },
    { title: "Home Appliances", href: "/products/appliances" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getAppliances();
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

        {!isLoading && products.length > 0 && (
          <div className={styles.imageBox}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                category={product.category}
                condition={product.condition}
                features={product.features}
                price={product.price}
                imageSrc={product.image}
                imageAlt={`Image of ${product.name}`}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
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

export default AppliancesProducts;
