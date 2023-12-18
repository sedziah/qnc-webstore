// components/searchbar/index.tsx

"use client";
import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { apiService } from "../../services/apiService";
import ProductList from "components/productList/index"; // Import the ProductList component

interface SearchResult {
  id: string;
  product_name: string;
  category_name: string;
  brand_name: string;
  actual_price: string;
  imageUrl?: string;
}

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    if (searchQuery) {
      setIsLoading(true);
      setError("");
      try {
        const results = await apiService.searchProducts(searchQuery);
        setSearchResults(results.map(result => ({
          ...result,
          name: result.product_name,
          brand: result.brand_name,
          category: result.category_name,
          price: result.actual_price,
          imageUrl: result.imageUrl // Assuming imageUrl is part of the results
        })));
      } catch (err) {
        setError("Failed to fetch search results.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className={styles.searchBarWrapper}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className={styles.searchButton}
            onClick={handleSearch}
            disabled={isLoading}
          >
            Go
          </button>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ProductList products={searchResults} /> {/* Display search results using ProductList */}
    </div>
  );
};

export default SearchBar;

