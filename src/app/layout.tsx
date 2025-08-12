import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientOnly from "@/components/ClientOnly";
import { AudioProvider } from "@/contexts/AudioContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ਸਿੱਖ ਇਤਿਹਾਸ - Sikh History",
  description: "Explore the rich history of Sikhism through the lives of great martyrs and leaders.",
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ClientOnly>
          <AudioProvider>
            <main className="min-h-screen">
              {children}
            </main>
          </AudioProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
