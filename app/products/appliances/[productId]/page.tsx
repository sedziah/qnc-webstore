// // products/details.tsx

// "use client";

import React from 'react';
// import ImageCarousel from "../../../../components/imageCarousel/index";
// import { useParams } from 'next/navigation';
// import { apiService } from '../../../../services/apiService'; // This should be your actual API service path
// import styles from "./page.module.css";

// interface CarouselImage {
//   src: string;
//   alt?: string;
// }

// interface ProductDetails {
//   id: string;
//   title: string;
//   description: string;
//   images: CarouselImage[];
//   price: number;
//   salePrice: number;
// }

// const ProductDetailsPage: React.FC = () => {
// }
//   const { productId } = useParams<{ productId: string }>();
//   const [product, setProduct] = useState<ProductDetails | null>(null);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       if (!productId) return;
//       // Fetch product details from an API
//       const productDetails = await apiService.getProductById(productId);
//       setProduct(productDetails);
//     };

//     fetchProductDetails();
//   }, [productId]);

//   if (!product) {
//     return <div>Loading...</div>; // Or any other loading state
//   }

//   return (
//     <div className={styles.productPage}>
//       <div className={styles.upperContainer}>
//         <div className={styles.carouselContainer}>
//           <ImageCarousel images={product.images} />
//         </div>
//         <div className={styles.purchaseContainer}>
//           <h1 className={styles.productTitle}>{product.title}</h1>
//           <p className={styles.productDescription}>{product.description}</p>
//           <div className={styles.priceSection}>
//             <span className={styles.salePrice}>Ghs {product.salePrice}</span>
//             <span className={styles.originalPrice}>Ghs {product.price}</span>
//           </div>
//           <div className={styles.addToCartSection}>
//             {/* Add functionality to these buttons */}
//             <button className={styles.quantityButton}>-</button>
//             <input
//               className={styles.quantityInput}
//               type="number"
//               defaultValue={1}
//             />
//             <button className={styles.quantityButton}>+</button>
//             <button className={styles.addToCartButton}>Add to Cart</button>
//           </div>
//         </div>
//       </div>
//       {/* Implement tabs if needed */}
//     </div>
//   );
// };

const ProductDetailsPage: React.FC = () => {
  return <h1>Hello World</h1>;
};

export default ProductDetailsPage;
