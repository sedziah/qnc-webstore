// Home.js or Home.tsx

"use client";

import React, { useEffect, useState } from "react";
import ImageCarousel from "../../components/imageCarousel";
import styles from "./page.module.css"; // Ensure this path is correct

interface CarouselImage {
  src: string;
  alt?: string;
}

export default function Home() {
  const [images, setImages] = useState<CarouselImage[]>([]);

  useEffect(() => {
    // This is where you would fetch or import your images
    const imageFiles = [
      "deals_1.png",
      "deals_2.png",
      "deals_3.png",
      "deals_4.png",
      "deals_5.jpg",
      "deals_6.jpg",
    ];

    const loadedImages: CarouselImage[] = imageFiles.map((fileName) => ({
      src: `/images/deals/${fileName}`,
      alt: fileName,
    }));

    setImages(loadedImages);
  }, []);

  return (
    <div className={styles.productPage}>
      <div className={styles.topSection}>
        <div className={styles.carouselContainer}>
          <ImageCarousel images={images} />
        </div>
        <div className={styles.productDetails}>
          <h1 className={styles.productTitle}>JBL BOOMBOX 3</h1>
          <div className={styles.priceSection}>
            <span className={styles.salePrice}>Ghs 2279</span>
            <span className={styles.originalPrice}>Ghs 1,999</span>
          </div>
          <p className={styles.productDescription}>
            JBL Boombox 3 - Portable Bluetooth Speaker, Powerful Sound and
            Monstrous bass, IPX7 Waterproof, 24 Hours of Playtime, powerbank,
            JBL PartyBoost for Speaker Pairing, and eco-Friendly Packaging
            (Black)
          </p>
          <div className={styles.quantitySection}>
            <button className={styles.quantityButton}>-</button>
            <input
              className={styles.quantityInput}
              type="number"
              defaultValue={1}
            />
            <button className={styles.quantityButton}>+</button>
          </div>
          <button className={styles.addToCartButton}>Add to Cart</button>
        </div>
      </div>
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.active}`}>Description</div>
        <div className={styles.tab}>Additional Information</div>
        <div className={styles.tab}>Reviews (1)</div>
      </div>
      <div className={styles.tabContent}>
        {/* Content for the selected tab would go here */}
      </div>
    </div>
  );
}
