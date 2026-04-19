// app/layout.tsx (updated)
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'FluidArch - Embed Smart Customer Support',
  description: 'AI-powered support system that integrates seamlessly into your product, providing instant answers and maintaining your brand\'s unique identity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} font-body bg-background text-on-surface antialiased`}>
        <Navbar />
        {children}
        <Footer />
         <script src="https://customer-support-agent-embed-system.vercel.app/embed.js"></script>
      </body>
    </html>
  );
}