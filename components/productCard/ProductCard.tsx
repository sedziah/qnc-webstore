import React from "react";
import Image from "next/image";
import styles from "./ProductCard.module.css";

type ProductProps = {
  id: string;
  title: string;
  image: string;
  price: number;
  onAddToCart: (id: string) => void;
};

const ProductCard: React.FC<ProductProps> = ({
  id,
  title,
  image,
  price,
  onAddToCart,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Image
          src={image}
          alt={title}
          layout="responsive"
          width={500}
          height={300}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>${price.toFixed(2)}</p>
        <button className={styles.button} onClick={() => onAddToCart(id)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
