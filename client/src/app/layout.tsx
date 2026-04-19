// app/layout.tsx
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'FluidArch | Embed Smart Customer Support',
  description: 'Transform your product\'s user experience with FluidArch\'s luminescent support widgets. Intelligent, fast, and beautifully integrated into your tech stack.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${plusJakarta.variable} font-body bg-background text-on-surface antialiased`}>
        <div className="noise-overlay" />
        <Navbar/>
        {children}
        <Footer/>
         {/* <script src="https://customer-support-agent-embed-system.vercel.app/embed.js"></script> */}
      </body>
    </html>
  );
}



