// app/cart/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext"; // Update the import path as necessary
import Breadcrumbs from "../../components/breadcrumbs/index"; // Update the import path as necessary
import styles from "./page.module.css";
import { TransformedProduct, apiService } from "../../services/apiService"; // Update the import path as necessary

export default function Page() {
  const { cart, updateCartItemQuantity } = useCart();
  const [cartProducts, setCartProducts] = useState<TransformedProduct[]>([]);
  const crumbs = [
    { title: "Home", href: "/" },
    { title: "Cart", href: "/cart" },
  ];

  useEffect(() => {
    const loadCartProducts = async () => {
      const productRequests = cart.map((cartItem) =>
        apiService.getProductById(cartItem.id)
      );
      try {
        const productResponses = await Promise.all(productRequests);
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
    return acc + product.price * (cartItem ? cartItem.quantity : 0);
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
                const productPrice = parseFloat(product.price).toFixed(2);

                return (
                  <div key={product.id} className={styles.cartItem}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                    />
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
                  </div>
                );
              })}
            </div>
            <div className={styles.cartSummary}>
              <p>Sub-Total: GHS {subtotal.toFixed(2)}</p>
              <button className={styles.checkoutButton}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
