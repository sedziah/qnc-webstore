import styles from './ProductList.module.css';
import React from 'react';

const Home = () => {
  const products = [
    {
      id: 1,
      name: 'Brand New Jordan 12 Brilliant Orange',
      size: '9W-7.5M',
      price: 280.0,
      watching: 13,
      imageUrl: '/path-to-your-image.jpg',
      shipping: 14.95,
      sellerRating: '80.0%',
    },
    // ... other products
  ];

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.image}
          />
          <div className={styles.details}>
            <h3 className={styles.title}>{product.name}</h3>
            <p className={styles.size}>Size: {product.size}</p>
            <p className={styles.price}>${product.price}</p>
            <p className={styles.shipping}>Shipping: ${product.shipping}</p>
            <p className={styles.watching}>{product.watching} watching</p>
            <p className={styles.sellerRating}>
              Seller Rating: {product.sellerRating}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
