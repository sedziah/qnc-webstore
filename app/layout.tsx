import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/navbar/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Electronics, Cars, Fashion, Collectibles & More | QnC",
  description: "Buy your electronics, cars, clothes, collectibles & more on QnC, the world-class online shopping platform. Top and quality brands, low prices & and free shipping on many items",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
