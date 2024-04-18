// app/checkout/guest/page.tsx

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../cart/CartContext";
import styles from "./page.module.css";
import { apiService } from "../../../services/apiService";

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  // State hooks for form inputs
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    // This effect checks for a query parameter indicating payment success.
    const paymentSuccess = new URLSearchParams(window.location.search).get(
      "paymentSuccess"
    );
    if (paymentSuccess) {
      handlePaymentSuccess();
    }
  }, [router]);

  const handlePaymentSuccess = () => {
    // This function can be triggered after successful payment if needed
    clearCart();
    router.push("/payment-success");
  };

  const handleGuestCheckout = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const cartItemsData = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const guestUserData = {
      email,
      first_name: firstName,
      last_name: lastName,
      primary_phone_number: primaryPhoneNumber.replace(/[^0-9]/g, ""),
      address,
      city,
      region,
    };

    const payload = {
      guest_user: guestUserData,
      cart_items: cartItemsData,
    };

    try {
      const response = await apiService.guestCheckout(payload);
      if (response.payment_url) {
        // Redirect to the payment URL provided by the backend
        window.location.href = response.payment_url;
      } else {
        alert("Failed to create order or initiate payment.");
      }
    } catch (error) {
      console.error("Error during guest checkout:", error);
      alert("An error occurred while processing your checkout.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Guest Checkout</h1>
      <form onSubmit={handleGuestCheckout} className={styles.checkoutForm}>
        {/* Form inputs */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Primary Phone Number"
          value={primaryPhoneNumber}
          onChange={(e) => setPrimaryPhoneNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          required
        />
        <button type="submit" className={styles.proceedButton}>
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
