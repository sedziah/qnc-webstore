import React from "react";
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.container}>
      <div className={styles.desktopSearchBar}>
        <input
          type="text"
          placeholder="Search..."
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </div>
    </div>
  );
}

export default SearchBar;
