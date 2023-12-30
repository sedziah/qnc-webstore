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
    <div className={styles.imageSliderContainer}>
      <Swiper slidesPerView={4} navigation pagination={{ clickable: true }}>
        <SwiperSlide>
          <img src="/images/deals/deal_6.jpg" alt="Item 1" />
          <div>Title</div>
          <div>Description</div>
          {/* Add other content for slide 1 */}
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/deals/deals_1.png" alt="Item 2" />
          {/* Add other content for slide 2 */}
        </SwiperSlide>
        {/* ... additional slides */}
      </Swiper>
    </div>
  );
}

export default Carousel;


