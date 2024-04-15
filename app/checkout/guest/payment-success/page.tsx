// app/checkout/guest/payment-success/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../../cart/CartContext"; // Adjust import path as necessary
import styles from "./payment-success.module.css"; // Ensure you have this CSS module

// Define a type for your payment details state
interface PaymentDetails {
  reference: string | null;
  orderNumber: string | null;
  totalPaid: string | null;
}

const PaymentSuccessPage: React.FC = () => {
  const router = useRouter();
  const { clearCart } = useCart();
  // Initialize your state with the correct types
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    reference: null,
    orderNumber: null,
    totalPaid: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      // Fetch values from the URL parameters
      const reference = urlParams.get("reference");
      const orderNumber = urlParams.get("orderNumber");
      const totalPaid = urlParams.get("totalPaid");

      // Update state with the fetched values
      // TypeScript now understands that these values can be either string or null
      setPaymentDetails({ reference, orderNumber, totalPaid });
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className={styles.successPage}>
      <h1>Payment Successful!</h1>
      <p>Your payment was successful. Your order is being processed.</p>
      <div className={styles.details}>
        <p>Order Number: {paymentDetails.orderNumber}</p>
        <p>Total Paid: ${paymentDetails.totalPaid}</p>
        <p>Payment Reference: {paymentDetails.reference}</p>
      </div>
      <button className={styles.button} onClick={() => router.push("/")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccessPage;
