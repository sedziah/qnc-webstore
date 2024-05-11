import type { ReactNode, ReactElement } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/navbar/index';
import Footer from '../components/footer/index';
import SubFooter from '../components/subfooter/index';
import { AuthProvider } from './auth/contexts/AuthContext';
import { CartProvider } from './cart/CartContext';

export const metadata: Metadata = {
  title: 'Electronics, Cars, Fashion, Collectibles & More | QnC',
  description:
    'Buy your electronics, cars, clothes, collectibles & more on QnC, the world-class online shopping platform. Top and quality brands, low prices & and free shipping on many items',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang='en'>
      <head></head>
      <CartProvider>
        <AuthProvider>
          <body>
            <Navbar />
            {children}
            <Footer />
            <SubFooter />
          </body>
        </AuthProvider>
      </CartProvider>
    </html>
  );
}
