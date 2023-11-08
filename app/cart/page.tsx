import styles from "./page.module.css";

export default function Page() {
  return (
    <div>
      <div className={styles.cart}>
        <h1 className={styles.cartText}>Cart</h1>
      </div>
      <div className={styles.emptyCart}>
        <span>Your cart is currently empty     </span>
        
        <span>Click here to shop</span>
      </div>
    </div>
  );
}
