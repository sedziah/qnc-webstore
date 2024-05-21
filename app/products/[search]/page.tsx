// app/products/[search]/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { apiService } from '../../../services/apiService'; // Adjust the path as needed
import styles from './page.module.css';
import SearchBar from '../../../components/searchbar';
import Breadcrumbs from '../../../components/breadcrumbs';
import { useCart } from '../../cart/CartContext'; // Adjust the path as needed

interface TransformedProduct {
  id: string;
  name: string;
  category: string;
  condition: string;
  price: number;
  image: string;
  features: string;
}

const SearchProducts = () => {
  const [products, setProducts] = useState<TransformedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { handleAddToCart } = useCart();

  const crumbs = [
    { title: 'Home', href: '/' },
    { title: 'Search Results', href: pathname },
  ];

  useEffect(() => {
    const searchSegment = pathname.split('/').pop() || '';

    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const searchResults = await apiService.searchProducts(searchSegment);
        setProducts(searchResults);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, []);

  return (
    <>
      <SearchBar />
      <Breadcrumbs crumbs={crumbs} />

      <div className={styles.pageContainer}>
        {/* {isLoading ? (
          <div className={styles.loadingOverlay}>Loading...</div>
        ) : (
          <div className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                category={product.category}
                condition={product.condition}
                features={product.features}
                price={product.price}
                imageSrc={product.image || "/default-product-image.jpg"} // Add a default image if none is provided
                imageAlt={`Image of ${product.name}`}
                onAddToCart={() =>
                  handleAddToCart({
                    id: product.id,
                    quantity: 1,
                    price: product.price,
                  })
                }
              />
            ))}
          </div>
        )} */}
        {!isLoading && products.length === 0 && (
          <div className={styles.noResults}>
            <h2>No Products Found</h2>
            <p>We couldn't find any products matching your search.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchProducts;

// "use client";

// import React, { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import { apiService } from "../../../services/apiService"; // Ensure the path is correct
// import styles from "./page.module.css";
// import SearchBar from "../../../components/searchbar";
// import Breadcrumbs from "../../../components/breadcrumbs";

// const SearchProducts = () => {
//   const [products, setProducts] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const pathname = usePathname();

//   useEffect(() => {
//     const searchSegment = pathname.split("/").pop();

//     const fetchProducts = async () => {
//       if (searchSegment) {
//         // Ensure searchSegment is defined before making the call
//         setIsLoading(true);
//         try {
//           const fetchedProducts = await apiService.searchProducts(
//             searchSegment
//           );
//           setProducts(JSON.stringify(fetchedProducts, null, 2)); // stringify the fetched products
//         } catch (error) {
//           console.error("Failed to fetch products:", error);
//           setProducts("Failed to fetch products");
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchProducts();
//   }, [pathname]);

//   return (
//     <>
//       <SearchBar />
//       <Breadcrumbs crumbs={[{ title: "Search Results", href: "#" }]} />
//       <div className={styles.pageContainer}>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <pre>{products}</pre> // Display the stringified products
//         )}
//       </div>
//     </>
//   );
// };

// export default SearchProducts;

// "use client"; // Ensures this component is treated as a Client Component

// import React, { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import ProductCard from "../../../components/productCard/ProductCard";
// import { apiService, TransformedProduct } from "../../../services/apiService";
// import styles from "./page.module.css";
// import SearchBar from "../../../components/searchbar";
// import Breadcrumbs from "../../../components/breadcrumbs";
// import { useCart } from "../../cart/CartContext";

// const SearchProducts = () => {
//   const [products, setProducts] = useState<TransformedProduct[]>([]);
//   const [isLoading, setIsLoading] = useState(true); // Start with loading state
//   const searchParams = useSearchParams();
//   const { handleAddToCart } = useCart();
//   const router = useRouter();

//   useEffect(() => {
//     const searchQuery = searchParams.get("search");

//     const fetchSearchResults = async () => {
//       if (!searchQuery) {
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const searchResults = await apiService.searchProducts(searchQuery);
//         setProducts(searchResults);
//       } catch (error) {
//         console.error("Failed to fetch search results:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSearchResults();
//   }, [searchParams]);

//   return (
//     <>
//       <SearchBar />
//       <Breadcrumbs crumbs={[{ title: "Search Results", href: "#" }]} />
//       <div className={styles.pageContainer}>
//         {isLoading ? (
//           <div className={styles.loadingOverlay}>Searching...</div>
//         ) : products.length > 0 ? (
//           <div className={styles.productGrid}>
//             {products.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 name={product.name}
//                 category={product.category}
//                 condition={product.condition}
//                 features={product.features}
//                 price={product.price}
//                 imageSrc={product.image}
//                 imageAlt={`Image of ${product.name}`}
//                 onAddToCart={() =>
//                   handleAddToCart({
//                     id: product.id,
//                     quantity: 1,
//                     price: product.price,
//                   })
//                 }
//               />
//             ))}
//           </div>
//         ) : (
//           <div className={styles.noResults}>
//             <h2>No Products Found</h2>
//             <p>We couldn't find any products matching your search.</p>
//             <button
//               className={styles.continueShoppingButton}
//               onClick={() => router.push("/")}
//             >
//               Continue Shopping
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SearchProducts;
