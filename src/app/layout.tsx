import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeFi Pulse — TVL Dashboard",
  description: "Real-time DeFi Total Value Locked analytics. Track protocols, chains, and TVL trends across the decentralized finance ecosystem.",
  keywords: ["DeFi", "TVL", "Dashboard", "Analytics", "Blockchain", "Crypto"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/8 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/5 rounded-full blur-[128px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
