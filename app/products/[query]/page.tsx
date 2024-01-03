//app/products/[query]

"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { apiService } from "../../../services/apiService"; // Ensure the correct path
import styles from "./page.module.css";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

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
  actual_price: string;
  images: ProductImage[];
  // Add any other relevant fields for the products
}


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
              <div key={product.id} className={styles.product_card}>
                <div className={styles.product_image}>
                  {/* Check if the product has images and display the main image */}
                  {product.images.length > 0 &&
                    product.images.find((img) => img.is_main_image) && (
                      <Image
                        src={
                          product.images.find((img) => img.is_main_image)
                            ?.image || product.images[0].image // Fallback to the first image if no main image
                        }
                        alt={
                          product.images.find((img) => img.is_main_image)
                            ?.alt_text || product.images[0].alt_text // Fallback alt text
                        }
                        width={400} // Set the width as required
                        height={400} // Set the height as required
                        // layout="responsive" // This prop is used to maintain the aspect ratio of the image
                        quality={100}
                      />
                    )}
                </div>
                <h2>{product.product}</h2>
                <p>{product.brand_name}</p>
                <p>{product.category_name}</p>
                <p>${product.actual_price}</p>
              </div>
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
