// app/checkout/guest/page.tsx

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../cart/CartContext"; // Adjust the import path as necessary
import styles from "./page.module.css";
import { apiService } from "../../../services/apiService"; // Adjust the import path as necessary

const CheckoutPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const handleGuestCheckout = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const guestUserData = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      address: address,
      city: city,
      region: region,
      primary_phone_number: primaryPhoneNumber.replace(/[^0-9]/g, ""),
    };

    const cartItemsData = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    // Payload to be sent to the backend
    const payload = {
      guest_user: guestUserData,
      cart_items: cartItemsData,
    };


    try {
      const response = await apiService.guestCheckout(payload);

      if (response.payment_url) {
        window.location.href = response.payment_url;
      } else {
        alert("Failed to create order or initiate payment.");
      }
    } catch (error: any) {
      console.error("Error during guest checkout:", error);
      alert(
        error.message || "An error occurred while processing your checkout."
      );
    }
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Guest Checkout</h1>
      <form onSubmit={handleGuestCheckout} className={styles.checkoutForm}>
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
