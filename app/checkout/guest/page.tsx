// app/checkout/guest/page.tsx

"use client"
import React, { useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { useRouter } from "next/navigation";
import { useCart } from "../../cart/CartContext"; // Adjust import path as necessary
import styles from "./page.module.css";
import { apiService } from "../../../services/apiService"; // Adjust import path as necessary

const CheckoutPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [subtotal, setSubtotal] = useState(0); // Subtotal in Pesewas
  const [isGuestInfoValid, setIsGuestInfoValid] = useState(false);
  const { cart, clearCart } = useCart();
  const router = useRouter();
  

  useEffect(() => {
    // Print the public key when the component mounts or when the cart changes
    console.log(
      "Paystack Public Key:",
      process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    );
    
    const fetchProductDetailsAndCalculateSubtotal = async () => {
      let newSubtotal = 0; // Assume this will be in GHS
      for (const cartItem of cart) {
        try {
          const productDetails = await apiService.getProductById(cartItem.id);
          // If productDetails.price is in GHS, convert to Pesewas by multiplying by 100
          newSubtotal += productDetails.price * 100 * cartItem.quantity;
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
      // Set subtotal in state already converted to Pesewas
      setSubtotal(newSubtotal);
    };

    if (cart.length > 0) {
      fetchProductDetailsAndCalculateSubtotal();
    }
  }, [cart]);

  const componentProps = {
    email,
    amount: subtotal,
    currency: "GHS",
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Replace with your actual Paystack public key
    text: "Pay Now",
    metadata: {
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: `${firstName} ${lastName}`,
        },
        {
          display_name: "Phone Number",
          variable_name: "phone",
          value: primaryPhoneNumber,
        },
      ],
    },
    onSuccess: (response: any) => {
      console.log(response);
      alert("Payment successful! Reference: " + response.reference);
      clearCart(); // Clear the cart after a successful payment
      router.push("guest/payment-success");
    },
    onClose: () => alert("Payment was not completed."),
  };

  const handleGuestCheckout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      email &&
      firstName &&
      lastName &&
      primaryPhoneNumber &&
      address &&
      city &&
      region
    ) {
      setIsGuestInfoValid(true);
    } else {
      alert("Please fill in all the required fields.");
    }
  };

  return (
    <div>
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
        {isGuestInfoValid ? (
          <PaystackButton
            {...componentProps}
            className={styles.proceedButton}
          />
        ) : (
          <button type="submit" className={styles.proceedButton}>
            Validate Info
          </button>
        )}
      </form>
    </div>
  );
};

export default CheckoutPage;
