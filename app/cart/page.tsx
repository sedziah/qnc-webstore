//app/cart/page.tsx
"use client"
import styles from "./page.module.css";
import { useCart} from "@/app/cart/CartContext";
import Image from "next/image";

export default function Page() {
  const { cart, updateCartItemQuantity, removeCartItem } = useCart();


  // Calculate the total cost of items in the cart
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <span>Your cart is currently empty.</span>
        {/* Link to the shop page */}
        <a href="/shop">Click here to shop</a>
      </div>
    );
  }

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
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className={styles.productInfo}>
                    {/* <Image
                      src={item.image}
                      alt={item.title}
                      className={styles.productImage}
                    /> */}
                    {/* <img
                      src={item.image}
                      alt={item.title}
                      className={styles.productImage}
                    /> */}
                    <span>{item.title}</span>
                  </div>
                </td>
                <td>{item.price}</td>
                <td>
                  <button
                    onClick={() =>
                      updateCartItemQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateCartItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </td>
                <td>{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeCartItem(item.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.cartTotals}>
          <div className={styles.subtotal}>
            <span>Subtotal</span>
            <span>{total.toFixed(2)}</span>
          </div>
          <div className={styles.total}>
            <span>Total</span>
            <span>{total.toFixed(2)}</span>
          </div>
          <button className={styles.checkoutButton}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
