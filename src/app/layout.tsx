import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Cormorant_Garamond } from 'next/font/google';
import Navbar from '@/components/Navbar';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lumé — Skincare',
  description: 'Premium minimalist skincare. Discover Shop, About, and our personalised Skin Test.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} bg-[#f9f8f6]`}>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
