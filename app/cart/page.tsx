"use client";
import styles from "./page.module.css";
import { useCart } from "./CartContext";
import { useEffect, useState } from "react";
import { TransformedProduct, apiService } from "../../services/apiService";

export default function Page() {
  const { cart, updateCartItemQuantity, removeCartItem } = useCart();
  const [products, setProducts] = useState<TransformedProduct[]>([]);

  useEffect(() => {
    // Fetch products data when the component mounts
    const loadProducts = async () => {
      try {
        const allProducts = await apiService.getProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <span>Your cart is currently empty.</span>
        <a href="/shop">Click here to shop</a>
      </div>
    );
  }

  // Calculate the total cost of items in the cart
  const total = cart.reduce((sum, cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    // Check if product is found and price is a number
    const price = product && !isNaN(product.price) ? product.price : 0;
    return sum + price * cartItem.quantity;
  }, 0);

  return (
    <div className={styles.cartPage}>
      <h1>Cart</h1>
      <div className={styles.cartContents}>
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem) => {
              const product = products.find((p) => p.id === cartItem.id);
              if (!product) return null; // Handle this case appropriately

              return (
                <tr key={cartItem.id}>
                  <td>
                    {/* Product Information */}
                    <span>{product.name}</span>
                  </td>
                  <td>GHS {product.price}</td>
                  <td>
                    <button
                      onClick={() =>
                        updateCartItemQuantity(
                          cartItem.id,
                          cartItem.quantity - 1
                        )
                      }
                    >
                      -
                    </button>
                    <span>{cartItem.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartItemQuantity(
                          cartItem.id,
                          cartItem.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </td>
                  <td>GHS {(product.price * cartItem.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeCartItem(cartItem.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.cartTotals}>
          <div className={styles.total}>
            <span>Total</span>
            <span>GHS {isNaN(total) ? "0.00" : total.toFixed(2)}</span>
          </div>

          <button className={styles.checkoutButton}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
