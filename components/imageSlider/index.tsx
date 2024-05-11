// components/imageSlider/index.jsx

'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import type { FunctionComponent } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './imageSlider.module.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const products = [
  {
    src: '/images/deals/deal_6.jpg',
    alt: 'Deal 1',
    title: 'Bebe Tablet',
    description:
      'Wireless Industry Leading Noise Canceling Overhead Headphones with Mic for Phone-Call and Alexa Voice Control, Black',
    price: 'GHS 1000',
  },

  {
    src: '/images/deals/deals_1.png',
    alt: 'Deal 2',
    title: 'Bebe Tablet',
    description:
      'Wireless Industry Leading Noise Canceling Overhead Headphones with Mic for Phone-Call and Alexa Voice Control, Black',
    price: 'GHS 1000',
  },

  {
    src: '/images/deals/deals_2.png',
    alt: 'Deal 3',
    title: 'Bebe Tablet',
    description:
      'Wireless Industry Leading Noise Canceling Overhead Headphones with Mic for Phone-Call and Alexa Voice Control, Black',
    price: 'GHS 1000',
  },

  {
    src: '/images/deals/deals_3.png',
    alt: 'Deal 4',
    title: 'Bebe Tablet',
    description:
      'Wireless Industry Leading Noise Canceling Overhead Headphones with Mic for Phone-Call and Alexa Voice Control, Black',
    price: 'GHS 1000',
  },

  {
    src: '/images/deals/deals_4.png.jpg',
    alt: 'Deal 5',
    title: 'Bose Head Phones',
    description:
      'Wireless Industry Leading Noise Canceling Overhead Headphones with Mic for Phone-Call and Alexa Voice Control, Black',
    price: 'GHS 2000',
  },

  // ... add more products
];

const Carousel: FunctionComponent = () => {
  return (
    <Swiper
      navigation={true}
      modules={[Pagination, Navigation]}
      slidesPerView={3}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 40 },
      }}
      className={styles.mySwiper}
    >
      {products.map((product, index) => (
        <SwiperSlide key={index} className={styles.slide}>
          <img src={product.src} alt={product.alt} />
          <div className={styles.slideTitle}>{product.title}</div>
          <div className={styles.slideDescription}>{product.description}</div>
          <div className={styles.slidePrice}>{product.price}</div>
          <div className={styles.addToCartButton}>Add to Cart</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
