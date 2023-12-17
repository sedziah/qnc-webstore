// components/searchbar/index.js

import React from "react";
import styles from "./SearchBar.module.css"; // Assuming a CSS module
import { apiService } from "../../services/apiService";

const SearchBar = () => {
  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for anything"
        />
        <div className={styles.categorySelectContainer}>
          <select className={styles.categorySelect}>
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Appliances</option>
            <option>Accessories</option>
            {/* You can map over your categories here */}
          </select>
        </div>
      </div>
      <button className={styles.searchButton}>Go</button>
    </div>
  );
};

export default SearchBar;
