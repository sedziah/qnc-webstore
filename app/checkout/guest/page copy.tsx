// app/checkout/page.tsx

'use client';
import React, { useState } from 'react';
import Breadcrumbs from '../../../components/breadcrumbs';
import { useRouter } from 'next/navigation'; // import useRouter from Next.js
import styles from './page.module.css'; // Update the import path as necessary
import { useCart } from '../../cart/CartContext'; // Update the import path as necessary
import { apiService } from '../../../services/apiService'; // Update the import path as necessary

const Page: React.FC = () => {
  // Personal details for GuestUser
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Additional profile information
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');

  // Cart items (this might come from a global state or context in your actual application)
  const { cart } = useCart(); // Placeholder, replace with actual cart items

  const router = useRouter();

  const crumbs = [
    { title: 'Home', href: '/' },
    { title: 'Cart', href: '/cart' },
    { title: 'Checkout', href: '/checkout' },
  ];

  const handleGuestCheckout = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    // Construct profile data
    const profileData = {
      email,
      first_name: firstName,
      last_name: lastName,
      primary_phone_number: primaryPhoneNumber,
      address,
      city,
      region,
    };

    // Transform cart items to match the expected format
    const cartItemsTransformed = cart.map((item) => ({
      product_id: item.id, // Ensure 'id' matches your product identifier in the cart items
      quantity: item.quantity,
    }));

    // Combine guest user data and cart items in the expected format
    const payload = {
      guest_user: profileData,
      cart_items: cartItemsTransformed,
    };

    try {
      // Call the service to perform the entire guest checkout process
      // Now passing profileData and cartItems as separate arguments
      const response = await apiService.guestCheckout(payload);

      // Redirect to the payment URL provided by Paystack
      if (response.payment_url) {
        window.location.href = response.payment_url;
      } else {
        console.error('Payment URL not provided');
      }
    } catch (error) {
      console.error('Guest checkout error:', error);
      // Handle errors here, e.g., show an error message to the user
    }
  };

  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <h1 className={styles.title}>Guest Checkout</h1>
      <form onSubmit={handleGuestCheckout} className={styles.checkoutForm}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type='text'
          placeholder='First Name'
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          required
        />
        <input
          type='text'
          placeholder='Last Name'
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          required
        />
        <input
          type='tel'
          placeholder='Primary Phone Number'
          value={primaryPhoneNumber}
          onChange={(e) => {
            setPrimaryPhoneNumber(e.target.value);
          }}
          required
        />
        <input
          type='text'
          placeholder='Address'
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          required
        />
        <input
          type='text'
          placeholder='City'
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          required
        />
        <input
          type='text'
          placeholder='Region'
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
          }}
          required
        />
        <button type='submit' className={styles.proceedButton}>
          Proceed to Payment
        </button>
      </form>
    </>
  );
};

export default Page;
