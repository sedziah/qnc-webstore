import styles from './ProductCard.module.css';
import React from 'react';

interface ProductCardProps {
  name: string;
  category: string;
  condition: string;
  features: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  // Optionally, add a callback prop for the Add to Cart action
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  category,
  condition,
  features,
  price,
  imageSrc,
  imageAlt,
  onAddToCart,
}) => {
  // Handler to stop link navigation and call onAddToCart if provided
  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop event propagation to prevent link navigation
    console.log(`Adding ${name} to cart...`);
    onAddToCart?.(); // Call the onAddToCart callback if provided
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imageSrc} alt={imageAlt} className={styles.productImage} />
      </div>
      <div className={styles.details}>
        <h2 className={styles.productTitle}>{name}</h2>
        <p className={styles.category}>{category}</p>
        <p className={styles.description}>
          {condition} | {features}
        </p>
        <div className={styles.pricing}>
          <span className={styles.price}>GHS {price}</span>
        </div>
        <button
          className={styles.addToCartButton}
          onClick={handleAddToCartClick}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
