// app/checkout/page.tsx

'use client';
import React, { useState } from 'react';
import Breadcrumbs from '../../../components/breadcrumbs';
import styles from './page.module.css'; // Update the import path as necessary
import { useCart } from '../../cart/CartContext'; // Update the import path as necessary
import { apiService } from '../../../services/apiService'; // Update the import path as necessary

interface Crumb {
  title: string;
  href: string;
}

interface ProfileData {
  email: string;
  first_name: string;
  last_name: string;
  primary_phone_number: string;
  address: string;
  city: string;
  region: string;
}

const Page: React.FC = () => {
  // Personal details for GuestUser
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  // Additional profile information
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  // Cart items (this might come from a global state or context in your actual application)
  const { cart } = useCart(); // Assuming cart is of type CartItem[]

  const crumbs: Crumb[] = [
    { title: 'Home', href: '/' },
    { title: 'Cart', href: '/cart' },
    { title: 'Checkout', href: '/checkout' },
  ];

  const handleGuestCheckout = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    // Construct profile data
    const profileData: ProfileData = {
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
      const response = await apiService.guestCheckout(payload);

      // Redirect to the payment URL provided by Paystack
      if (typeof response.payment_url === 'string') {
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
      <form onSubmit={handleGuestCheckout}>
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
