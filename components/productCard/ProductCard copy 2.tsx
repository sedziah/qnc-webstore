// components/ProductCard.js
import React from "react";
import styles from "./page.module.css";

const ProductCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src="images/iphone_14.png"
          alt="Apple iPhone XR (Red, 128 GB)"
          className={styles.productImage}
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.productTitle}>Apple iPhone XR (Red, 128 GB)</h2>
        <p className={styles.category}>Mobile Phones </p>
        <p className={styles.description}>
          128 GB ROM | 15.49 cm (6.1 inch) Display | 12MP Rear Camera | 7MP
          Front Camera | A12 Bionic Chip Processor | Gorilla Glass with high
          quality display
        </p>
        <div className={styles.extraDetails}>
          {/* <span className={styles.store}>All items from Mobile point</span> */}
          {/* <button className={styles.wishlistButton}>Add to wishlist</button> */}
        </div>
        <div className={styles.pricing}>
          <span className={styles.price}>$459.99</span>
          {/* <div className={styles.ratings}>
            <span className={styles.stars}>★★★★☆</span>
            <span className={styles.reviews}>1985 reviews</span>
          </div> */}
        </div>
        <button className={styles.addToCartButton}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;