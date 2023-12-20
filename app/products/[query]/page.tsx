//app/products/[query]

"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { apiService } from "../../../services/apiService"; // Ensure the correct path
import styles from "./page.module.css";


interface Product {
  id: string;
  product_name: string;
  category_name: string;
  brand_name: string;
  actual_price: string;
  // Add any other relevant fields for the products
}


function Page() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Set to true initially
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.query) {
      apiService
        .searchProducts(params.query)
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
    return <h1>Loading...</h1>;
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
              <div className={styles.product_card} key={product.id}>
                <h2>{product.product_name}</h2>
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
