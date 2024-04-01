// app/checkout/guest/payment-success/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../../cart/CartContext"; // Adjust import path as necessary
import styles from "./payment-success.module.css"; // Ensure you have this CSS module

const PaymentSuccessPage: React.FC = () => {
  const router = useRouter();
  const { clearCart } = useCart();
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get("reference"); // Assuming 'reference' is the query param
      setReference(ref);
      console.log("Fetched reference:", ref); // Log the fetched reference

      if (ref) {
        clearCart(); // Clear the cart if the reference is successfully fetched
      }
    }
  }, [clearCart]);

  return (
    <div className={styles.successPage}>
      <h1>Payment Successful!</h1>
      <p>Your payment was successful. Your order is being processed.</p>
      <p>Payment Reference: {reference}</p>
      <button className={styles.button} onClick={() => router.push("/")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccessPage;
