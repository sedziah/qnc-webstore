"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { apiService } from "../../services/apiService";
import styles from "./page.module.css";

// Ensure this interface is defined and matches the structure of your product data
interface TransformedProduct {
  id: string;
  name: string;
  category: string;
  condition: string;
  // description: string; // Make sure to include a description in your TransformedProduct
  price: number;
  image: string;
  // Add any other fields you expect from your API
}

const ElectronicsProducts = () => {
  const [products, setProducts] = useState<TransformedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Start loading
        const data = await apiService.getElectronics();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        // End loading
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.pageContainer}>
      {isLoading && <div className={styles.loadingOverlay}>Loading...</div>}

      {!isLoading && (
        <div className={styles.imageBox}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              category={product.category}
              condition = {product.condition}
              price={product.price}
              imageSrc={product.image}
              imageAlt={`Image of ${product.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ElectronicsProducts;

// "use client";
// import React, { useEffect, useState } from "react";
// import ProductCard from "../../components/productCard/ProductCard";
// import { apiService } from "../../services/apiService"; // Adjust the path as necessary
// import styles from "./page.module.css";

// // Ensure this interface is defined and matches the structure of your product data
// interface TransformedProduct {
//   id: string;
//   name: string;
//   category: string;
//   // description: string; // Make sure to include a description in your TransformedProduct
//   price: number;
//   image: string;
//   // Add any other fields you expect from your API
// }

// const ElectronicsProducts = () => {
//   const [products, setProducts] = useState<TransformedProduct[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true); // Add a loading state

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setIsLoading(true); // Start loading
//         const data = await apiService.getElectronics();
//         console.log("Fetched products:", data);
//         setProducts(data);
//         setIsLoading(false); // End loading
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         setIsLoading(false); // End loading even if there is an error
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Define the number of placeholders you want to display
//   const placeholderCount = 5; // For example

//   return (
//     <div className={styles.imageBox}>
//       {isLoading
//         ? Array.from({ length: placeholderCount }, (_, index) => (
//             <div key={index} className={styles.placeholderCard}></div>
//           ))
//         : products.map((product) => (
//             <ProductCard
//               key={product.id}
//               name={product.name}
//               category={product.category}
//               price={product.price}
//               imageSrc={product.image}
//               imageAlt={`Image of ${product.name}`}
//             />
//           ))}
//     </div>
//   );
// };

// export default ElectronicsProducts;
