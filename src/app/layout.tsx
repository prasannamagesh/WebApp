import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import { CartDrawer } from '@/components/CartDrawer';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DermFix — Preventive Skin Science',
  description:
    'Science-backed formulations engineered for long-term skin health. Clinically proven actives at therapeutic concentrations. Take the Skin Test, shop our range, and explore the science behind every formula.',
  keywords: ['skincare', 'serum', 'ectoin', 'niacinamide', 'dermatologist tested', 'clinical skincare'],
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <div className="sticky top-0 z-50">
            <AnnouncementBar />
            <Navbar />
          </div>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
