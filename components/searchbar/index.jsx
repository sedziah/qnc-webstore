// components/searchbar/index.jsx

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // Call useRouter at the top level

  const handleSearch = () => {
    if (searchQuery) {
      console.log("Search Query:", searchQuery);
      // Navigate to the search results page with the query
      router.push(`/products/${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
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
        {/* Additional elements (like category select) can be added here */}
      </div>
      <button className={styles.searchButton} onClick={handleSearch}>
        Go
      </button>
    </div>
  );
};

export default SearchBar;
