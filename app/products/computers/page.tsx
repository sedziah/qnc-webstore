'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../../components/productCard/ProductCard';
import { apiService } from '../../../services/apiService';
import styles from './page.module.css';
import SearchBar from '../../../components/searchbar/index';
import Breadcrumbs from '../../../components/breadcrumbs/index';
import { useCart, type CartItem } from '../../cart/CartContext';

interface TransformedProduct {
  id: string;
  name: string;
  category: string;
  condition: string;
  // description: string; // Make sure to include a description in your TransformedProduct
  price: number;
  image: string;
  features: string;
  // Add any other fields you expect from your API...
}

const ComputerProducts = () => {
  const [products, setProducts] = useState<TransformedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleAddToCart } = useCart();

  const crumbs = [
    { title: 'Home', href: '/' },
    { title: 'Products', href: '/products/computers' },
    { title: 'Computers', href: '/products/computers' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Start loading
        const data = await apiService.getComputers();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        // End loading
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <SearchBar />
      <Breadcrumbs crumbs={crumbs} />
      <div className={styles.pageContainer}>
        {isLoading && <div className={styles.loadingOverlay}>Loading...</div>}

        {!isLoading && (
          <div className={styles.imageBox}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                category={product.category}
                condition={product.condition}
                features={product.features}
                price={product.price}
                imageSrc={product.image}
                imageAlt={`Image of ${product.name}`}
                onAddToCart={() => {
                  const itemToAdd: CartItem = {
                    id: product.id,
                    quantity: 1, // Assuming a default quantity of 1
                    price: product.price, // Ensure your product object has a price field
                  };
                  handleAddToCart(itemToAdd);
                }}
              />
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className={styles.noProductsMessage}>
            No products found in this category.
          </div>
        )}
      </div>
    </>
  );
};

export default ComputerProducts;
