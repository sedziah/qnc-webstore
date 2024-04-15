// app/checkout/guest/page.tsx

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Make sure this is 'next/router' not 'next/navigation'
import { useCart } from "../../cart/CartContext";
import styles from "./page.module.css";
import { apiService } from "../../../services/apiService";
import Script from "next/script";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const CheckoutPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const handlePaymentSuccess = (reference: string) => {
    // Function to handle what happens after payment is successful
    clearCart();
    router.push(`/payment-success?reference=${reference}`);
  };

  const handleGuestCheckout = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Create the user data and cart items payload
    const guestUserData = {
      email,
      first_name: firstName,
      last_name: lastName,
      address,
      city,
      region,
      primary_phone_number: primaryPhoneNumber.replace(/[^0-9]/g, ""),
    };

    const cartItemsData = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const payload = {
      guest_user: guestUserData,
      cart_items: cartItemsData,
    };

    // Log the payload to the console for debugging
    console.log("Payload for guest checkout:", payload);

    try {
      // Make the API call for guest checkout
      const response = await apiService.guestCheckout(payload);

      // Log the response for debugging
      console.log("Response from guest checkout:", response);

      if (response.payment_url && window.PaystackPop) {
        const handler = window.PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email,
          amount: response.amount,
          ref: response.reference,
          callback: (response: { reference: string }) => {
            handlePaymentSuccess(response.reference);
          },
          onClose: () => {
            alert("Transaction was not completed, window closed.");
          },
        });

        handler.openIframe();
      } else {
        alert("Failed to create order or initiate payment.");
      }
    } catch (error) {
      console.error("Error during guest checkout:", error);
      alert("An error occurred while processing your checkout.");
    }
  };

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="beforeInteractive"
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Guest Checkout</h1>
        <form onSubmit={handleGuestCheckout} className={styles.checkoutForm}>
          {/* Form fields remain unchanged */}
          {/* ... */}
          <button type="submit" className={styles.proceedButton}>
            Proceed to Payment
          </button>
        </form>
      </div>
    </>
  );
};

export default CheckoutPage;
