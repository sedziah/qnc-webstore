//app/products/[query]

"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { apiService } from "../../../services/apiService"; // Ensure the correct path
import styles from "./page.module.css";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Link from "next/link";

interface ProductImage {
  id: string;
  image: string;
  alt_text: string;
  is_main_image: boolean;
}

interface Product {
  id: string;
  product: string;
  category_name: string;
  brand_name: string;
  condition: string;
  actual_price: string;
  images: ProductImage[];
  // Add any other relevant fields for the products
}

// New ProductCard component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className={styles.product_card}>
    <div className={styles.product_image}>
      {/* Display the main image or the first image as a fallback */}
      <Image
        src={
          product.images.find((img: ProductImage) => img.is_main_image)
            ?.image || product.images[0].image // Fallback to the first image if no main image
        }
        alt={
          product.images.find((img: ProductImage) => img.is_main_image)
            ?.alt_text || product.images[0].alt_text // Fallback alt text
        }
        layout="responsive"
        width={1} // Width ratio part
        height={1} // Height ratio part, 1:1 here for a square aspect ratio
        objectFit="cover" // Adjust to cover the area without distorting the aspect ratio
        quality={100}
      />
    </div>
    <div className={styles.product_details}>
      <h2 className={styles.product_title}>
        {product.brand_name} {product.product}
      </h2>
      <p className={styles.product_price}>{product.condition}</p>
      <p className={styles.product_price}>64GB</p>
      <p className={styles.product_price}>Factory Unlocked</p>
      <p className={styles.product_price}>All Colours</p>
      <p className={styles.product_price}>GHS {product.actual_price}</p>
      <Link href={`/product/${product.id}`} passHref>
        <div className={styles.product_link}>View details</div>
      </Link>
    </div>
  </div>
);

function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Set to true initially
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    // Ensure that query is a string
    const queryParam = Array.isArray(params.query)
      ? params.query[0]
      : params.query;

    if (queryParam) {
      setLoading(true);
      apiService
        .searchProducts(queryParam)
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false); // Ensure to stop loading if no query is provided
    }
  }, [params.query]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // This takes the full height of the viewport
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      {params.query ? (
        <>
          <h1>Results for {params.query}</h1>

          <div className={styles.product_list}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <h1>No search query provided.</h1>
      )}
    </div>
  );
}

export default Page;
