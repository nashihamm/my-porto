import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nashih Amin - Fullstack Developer',
  description: 'Turning ideas into scalable and interactive web experiences',
  openGraph: {
    title: 'Nashih Amin - Fullstack Developer',
    description: 'Turning ideas into scalable and interactive web experiences',
    url: 'https://nashih.vercel.app',
    siteName: 'Nashih Amin Portfolio',
    images: [
      {
        url: 'https://nashih.dev/og.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}