import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins, Roboto } from 'next/font/google';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-roboto',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Sollvr - Ready-to-Launch Projects",
  description: "Launch your MVP faster with our ready-to-use project templates",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${roboto.variable} antialiased bg-[#FFE5D9]`}>
        {children}
      </body>
    </html>
  );
}
