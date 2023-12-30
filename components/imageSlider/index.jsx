// components/imageSlider/index.jsx

"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./imageSlider.module.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function Carousel() {
  return (
    <>
      <Swiper
        // pagination={{
        //   type: "fraction",
        // }}
        navigation={true}
        modules={[Pagination, Navigation]}
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },

        }}
        className={styles.mySwiper}
      >
        <SwiperSlide className={styles.slide}>
          <img src="/images/deals/deal_6.jpg" alt="Deal 6" />
          <div className={styles.slideTitle}>Bebe Tablet</div>
          <div className={styles.slideDescription}>
            Wireless Industry Leading Noise Canceling Overhead Headphones with
            Mic for Phone-Call and Alexa Voice Control, Black
          </div>
          <div className={styles.slidePrice}>GHS 1000</div>
          <div className={styles.addToCartButton}>Add to Cart</div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/deals/deals_1.png" alt="Deal 1" />
          <div>Title</div>
          <div>Details</div>
          <div>Price</div>
          <div>Add to Cart</div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/deals/deals_2.png" alt="Deal 2" />
          <div>Title</div>
          <div>Details</div>
          <div>Price</div>
          <div>Add to Cart</div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/deals/deals_3.png" alt="Deal 3" />
          <div>Title</div>
          <div>Details</div>
          <div>Price</div>
          <div>Add to Cart</div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/deals/deals_4.png" alt="Deal 4" />
          <div>Title</div>
          <div>Details</div>
          <div>Price</div>
          <div>Add to Cart</div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
