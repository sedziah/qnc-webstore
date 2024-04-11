// app/cart/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext"; // Update the import path as necessary
import Breadcrumbs from "../../components/breadcrumbs/index"; // Update the import path as necessary
import styles from "./page.module.css";
import { TransformedProduct, apiService } from "../../services/apiService"; // Update the import path as necessary
import Link from "next/link";

export default function Page() {
  const { cart, updateCartItemQuantity, removeCartItem } = useCart();
  console.log("Current items in cart:", cart); // Log the current cart items
  const [cartProducts, setCartProducts] = useState<TransformedProduct[]>([]);
  const crumbs = [
    { title: "Home", href: "/" },
    { title: "Cart", href: "/cart" },
  ];

  const handleRemoveItem = (productId: string) => {
    // Assuming your useCart context has a method named 'removeCartItem'
    // Call this method with the productId to remove the item from the cart
    removeCartItem(productId);
  };

  useEffect(() => {
    const loadCartProducts = async () => {
      const productRequests = cart.map((cartItem) =>
        apiService.getProductById(cartItem.id)
      );
      try {
        const productResponses = await Promise.all(productRequests);
        console.log("Loaded cart products:", productResponses);
        setCartProducts(productResponses);
      } catch (error) {
        console.error("Error loading cart products:", error);
      }
    };

    if (cart.length > 0) {
      loadCartProducts();
    }
  }, [cart]);

  const subtotal = cartProducts.reduce((acc, product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    // Ensure product.price is a number before multiplying
    const price =
      typeof product.price === "number"
        ? product.price
        : parseFloat(product.price);
    return acc + price * (cartItem ? cartItem.quantity : 0);
  }, 0);

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <div className={styles.cartContainer}>
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <div className={styles.emptyCart}>No items in cart.</div>
        ) : (
          <>
            <div className={styles.cartList}>
              {cartProducts.map((product) => {
                const cartItem = cart.find((item) => item.id === product.id);
                const quantity = cartItem ? cartItem.quantity : 0;
                // Directly use toFixed on price if it's a number
                const productPrice =
                  typeof product.price === "number"
                    ? product.price.toFixed(2)
                    : parseFloat(product.price).toFixed(2);

                return (
                  <div key={product.id} className={styles.cartItem}>
                    {/* <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                    /> */}
                    <div className={styles.productDetails}>
                      <div className={styles.productInfo}>
                        <h3>{product.name}</h3>
                        <p>{product.features}</p>
                      </div>
                      <div className={styles.productMeta}>
                        <div className={styles.price}>GHS {productPrice}</div>
                        <div className={styles.controls}>
                          <button
                            onClick={() =>
                              updateCartItemQuantity(
                                product.id,
                                Math.max(1, quantity - 1)
                              )
                            }
                          >
                            -
                          </button>
                          <span>{quantity}</span>
                          <button
                            onClick={() =>
                              updateCartItemQuantity(product.id, quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(product.id)}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
              
            </div>
            <div className={styles.cartSummary}>
              <p>Sub-Total: GHS {subtotal.toFixed(2)}</p>
              <Link href="/checkout/guest" className={styles.checkoutButton}>
                Guest Checkout
              </Link>
              <br />
              <Link href="/accounts/signin" className={styles.checkoutButton}>
                Login to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
