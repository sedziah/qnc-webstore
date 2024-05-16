// app/checkout/guest/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/navigation'; // next/router should be used instead of next/navigation
import { useCart } from '../../cart/CartContext';
import styles from './page.module.css';
import { apiService } from '../../../services/apiService';

const CheckoutPage = (): ReactElement => {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  // State hooks for form inputs and payment URL
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [primaryPhoneNumber, setPrimaryPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [paymentURL, setPaymentURL] = useState(''); // State for payment URL
  const [showPaymentFrame, setShowPaymentFrame] = useState(false); // State to control iframe display

  interface CheckoutResponse {
    payment_url?: string;
  }
  // Listen for payment success or failure
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const paymentStatus = query.get('status');
    const orderReference = query.get('reference')?.trim() ?? '';

    if (paymentStatus === 'success' && orderReference !== '') {
      verifyPayment(orderReference).catch((error) => {
        console.error('Payment verification failed:', error);
        alert('There was an issue with the payment verification process.');
      });
    } else if (paymentStatus === 'failed') {
      alert('Payment failed. Please try again.');
    }
  }, []);

  const verifyPayment = async (reference: string): Promise<void> => {
    try {
      const response = await apiService.verifyPayment(reference);
      if (response.status === 'success') {
        handlePaymentSuccess();
      } else {
        throw new Error('Verification failed');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('There was an issue with verifying your payment.');
    }
  };

  const handlePaymentSuccess = (): void => {
    clearCart();
    router.push('/payment-success');
  };

  const handleGuestCheckout = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const cartItemsData = cart.map(({ id, quantity }) => ({
      product_id: id,
      quantity,
    }));

    const guestUserData = {
      email,
      first_name: firstName,
      last_name: lastName,
      primary_phone_number: primaryPhoneNumber.replace(/[^0-9]/g, ''),
      address,
      city,
      region,
    };

    const payload = {
      guest_user: guestUserData,
      cart_items: cartItemsData,
    };

    try {
      const response: CheckoutResponse =
        await apiService.guestCheckout(payload);
      if (response.payment_url !== undefined && response.payment_url !== '') {
        setPaymentURL(response.payment_url);
        setShowPaymentFrame(true); // Show payment iframe after setting URL
      } else {
        alert('Failed to create order or initiate payment.');
      }
    } catch (error) {
      console.error('Error during guest checkout:', error);
      alert('An error occurred while processing your checkout.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Guest Checkout</h1>
      {!showPaymentFrame && (
        <form
          onSubmit={(event) => {
            event.preventDefault(); // Move the preventDefault here to ensure it's always called
            handleGuestCheckout(event).catch((error) => {
              console.error('Error during form submission:', error);
              alert('An error occurred while processing your form.');
            });
          }}
          className={styles.checkoutForm}
        >
          {/* Form inputs */}
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
      )}
      {showPaymentFrame && (
        <iframe
          src={paymentURL}
          className={styles.paymentFrame}
          style={{ width: '100%', height: '600px', border: 'none' }}
        ></iframe>
      )}
    </div>
  );
};

export default CheckoutPage;
