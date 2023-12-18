// components/ProductList.tsx

import React from 'react';
import styles from './ProductList.module.css'; // Ensure this CSS module exists

// Define the Product interface
interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  imageUrl?: string; // Optional property
}

// Props interface for ProductList component
interface ProductListProps {
  products?: Product[]; // products is now an optional prop
}

const ProductList: React.FC<ProductListProps> = ({ products = [] }) => {
  // Check if products array is empty or undefined
  const hasProducts = products.length > 0;

  return (
    <div className={styles.productListContainer}>
      {hasProducts ? (
        products.map(product => (
          <div key={product.id} className={styles.productItem}>
            <div className={styles.productImage}>
              <img src={product.imageUrl || '/default-product.jpg'} alt={product.name} />
            </div>
            <div className={styles.productDetails}>
              <h3>{product.name}</h3>
              <p className={styles.brand}>Brand: {product.brand}</p>
              <p className={styles.category}>Category: {product.category}</p>
              <p className={styles.price}>Price: ${product.price}</p>
              <button className={styles.buyButton}>Buy Now</button>
            </div>
          </div>
        ))
      ) : (
        <p>No products</p>
      )}
    </div>
  );
};

export default ProductList;


// import React from "react";
// import styles from "./ProductList.module.css"; // Make sure to create this CSS module

// const staticProducts = [
//   {
//     id: "1",
//     name: "Wireless Headphones",
//     brand: "AudioTech",
//     category: "Electronics",
//     price: "99.99",
//   },
//   {
//     id: "2",
//     name: "Smartphone 12X",
//     brand: "PhoneCo",
//     category: "Electronics",
//     price: "799.00",
//   },
//   {
//     id: "3",
//     name: "Performance Running Shoes",
//     brand: "Sporty",
//     category: "Footwear",
//     price: "120.00",
//   },
//   {
//     id: "4",
//     name: "Waterproof Hiking Backpack",
//     brand: "OutdoorPro",
//     category: "Outdoor",
//     price: "89.95",
//   },
//   // ... add more products as needed
// ];


// const ProductList = () => {
//   return (
//     <div className={styles.productListContainer}>
//       {staticProducts.map((product) => (
//         <div key={product.id} className={styles.productItem}>
//           <div className={styles.productImage}>
//             <img
//               src={product.imageUrl || "images/default-image.png"}
//               alt={product.name}
//             />
//           </div>
//           <div className={styles.productDetails}>
//             <h3>{product.name}</h3>
//             <p className={styles.brand}>Brand: {product.brand}</p>
//             <p className={styles.category}>Category: {product.category}</p>
//             <p className={styles.price}>Price: ${product.price}</p>
//             <button className={styles.buyButton}>Buy Now</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;
