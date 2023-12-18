// app/pages/products/[query].jsx

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProductList from "../../../components/productList/index"; // Ensure correct import path

// Static data for demonstration purposes
const staticProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    brand: "AudioTech",
    category: "Electronics",
    price: "99.99",
    imageUrl: "/images/iphone_14.png", // Example image path
  },
  {
    id: "2",
    name: "Smartphone 12X",
    brand: "PhoneCo",
    category: "Electronics",
    price: "799.00",
    imageUrl: "/images/iphone.png",
  },
  // ... more products
];

const SearchResultsPage = () => {

  return (
    <div>
      <ProductList products={staticProducts} />
    </div>
  );
};

export default SearchResultsPage;
