// app/products/[search]/page.tsx

"use client"; // Ensures this component is treated as a Client Component

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter} from "next/navigation";
import ProductCard from "../../../components/productCard/ProductCard";
import { apiService, TransformedProduct } from "../../../services/apiService";
import styles from "./page.module.css";
import SearchBar from "../../../components/searchbar";
import Breadcrumbs from "../../../components/breadcrumbs";
import { useCart } from "../../cart/CartContext";

const SearchProducts = () => {
  const [products, setProducts] = useState<TransformedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Set to false initially
  const [searchParams] = useSearchParams(); // This should not be destructured if it's an array
  const { handleAddToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams) {
      // If searchParams is not available, don't do anything
      return;
    }

    // searchParams is an array of tuples, we find the 'search' param
    const searchQuery = searchParams.find(([key]) => key === "search")?.[1];

    const fetchSearchResults = async () => {
      if (searchQuery) {
        setIsLoading(true);
        try {
          const searchResults = await apiService.searchProducts(searchQuery);
          setProducts(searchResults);
        } catch (error) {
          console.error("Failed to fetch search results:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSearchResults();
  }, [searchParams]); // Depend on searchParams

  return (
    <>
      <SearchBar />
      <Breadcrumbs crumbs={[{ title: "Search Results", href: "#" }]} />
      <div className={styles.pageContainer}>
        {isLoading ? (
          <div className={styles.loadingOverlay}>Searching...</div>
        ) : (
          <>
            {products.length > 0 ? (
              <div className={styles.productGrid}>
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
                    onAddToCart={() =>
                      handleAddToCart({
                        id: product.id,
                        quantity: 1,
                        price: product.price,
                      })
                    }
                  />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <h2>No Products Found</h2>
                <p>We couldn't find any products matching your search.</p>
                <button
                  className={styles.continueShoppingButton}
                  onClick={() => router.push("/")} // Redirects to homepage
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SearchProducts;
