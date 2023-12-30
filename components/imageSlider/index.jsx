// components/imageSlider/index.jsx

"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { Swiper as SwiperClass, Navigation, Pagination } from "swiper/core";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./imageSlider.module.css";

// Import Swiper components with SSR disabled
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false }
);

function Carousel() {
  // Initialize Swiper modules on the client-side
  useEffect(() => {
    SwiperClass.use([Navigation, Pagination]);
  }, []);

  return (
    <div className={styles.carouselContainer}>
      <Swiper
        slidesPerView={3} // Adjust the number of slides per view according to your design
        spaceBetween={30} // Adjust the space between slides
        navigation
        pagination={{ clickable: true }}
        className={styles.mySwiper} // Use a custom class for additional styling
      >
        {/* Generate SwiperSlides based on your data */}
        {/* Replace with your actual data and image paths */}
        <SwiperSlide className={styles.slide}>
          <img src="/images/deals/deal_6.jpg" alt="Item 1" />
          <div className={styles.slideContent}>
            <div className={styles.slideTitle}>SONY WH-1000XM4</div>
            <div className={styles.slideDescription}>
              Wireless Industry Leading Noise Cancelling Overhead Headphones
              with Mic
            </div>
            <div className={styles.slidePrice}>Ghs 1,279</div>
            <div className={styles.originalPrice}>Ghs 1,999</div>
          </div>
        </SwiperSlide>
        {/* Repeat for other slides */}
        <SwiperSlide className={styles.slide}>
          <img src="/images/deals/deal_6.jpg" alt="Item 1" />
          <div className={styles.slideContent}>
            <div className={styles.slideTitle}>SONY WH-1000XM4</div>
            <div className={styles.slideDescription}>
              Wireless Industry Leading Noise Cancelling Overhead Headphones
              with Mic
            </div>
            <div className={styles.slidePrice}>Ghs 1,279</div>
            <div className={styles.originalPrice}>Ghs 1,999</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Carousel;
