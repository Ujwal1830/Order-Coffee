import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/context/AuthProvider";
import { getServerSession } from "next-auth";
import { CartProvider } from "@/context/CartContext";

const nunito = Nunito({ subsets: ["latin"], style: ['normal', 'italic'], weight: ['300', '400', '500', '700', '900'] });

export const metadata: Metadata = {
  title: "Order Coffee",
  description: "Coffee Ordering Website",
};

const session =  getServerSession();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <AuthProvider session={session}>
          <CartProvider >
            <main>
              <Header />
              {children}
            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
