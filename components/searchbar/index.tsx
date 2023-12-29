// components/searchbar/index.tsx

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import styles from "./SearchBar.module.css";
import SearchIcon from '@mui/icons-material/Search';
import Stack from "@mui/material/Stack";
import "../../app/globals.css"


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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter(); // Initialize useRouter hook

  const handleSearch = async () => {
    if (searchQuery) {
      setIsLoading(true);
      setError("");
      try {
        // Perform the search and log the results
        // const results = await apiService.searchProducts(searchQuery);
        // console.log(results); // Log the results to the console
        // Instead of setting search results in the state, navigate to the dynamic route
        await router.push(`/products/${encodeURIComponent(searchQuery)}`);
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
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchContainer}>
        <SearchIcon className={styles.SearchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for anything"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <button
        className={styles.searchButton}
        onClick={handleSearch}
        disabled={isLoading}
      >
        Go
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default SearchBar;
