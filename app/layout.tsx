import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/index";
import Footer from "../components/footer/index";
import SubFooter from "../components/subfooter/index";
import { AuthProvider } from "./auth/contexts/AuthContext";
import { CartProvider } from "./cart/CartContext";

const imagesData = [
  { id: 1, src: "/images/banner/qnc_banner_2.png", alt: "Image description 1" },
  { id: 2, src: "path-to-image-2.jpg", alt: "Image description 2" },
];

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Electronics, Cars, Fashion, Collectibles & More | QnC",
  description:
    "Buy your electronics, cars, clothes, collectibles & more on QnC, the world-class online shopping platform. Top and quality brands, low prices & and free shipping on many items",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <CartProvider>
        <AuthProvider>
          <body>
            <Navbar />
            {children}
            {/* <Footer />
            <SubFooter /> */}
          </body>
        </AuthProvider>
      </CartProvider>
    </html>
  );
}
