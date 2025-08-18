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
  title: "Museum - Sikh History & Heritage | Digital Museum of Sikh Martyrs",
  description: "Explore the rich history of Sikhism through the lives of great martyrs and leaders. Discover stories of Shaheed Bhai Mani Singh Ji, Bhai Taru Singh Ji, and other Sikh heroes. Interactive digital museum preserving Sikh heritage.",
  keywords: [
    "Sikh history",
    "Sikh heritage",
    "Sikh martyrs",
    "Bhai Mani Singh",
    "Bhai Taru Singh",
    "Sikh digital museum",
    "Sikh culture",
    "Khalsa",
    "Sikhism",
    "Punjab history",
    "Sikh heroes",
    "Sikh education"
  ],
  authors: [{ name: "Museum Team" }],
  creator: "Museum",
  publisher: "Museum",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://museum.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Museum - Sikh History & Heritage | Digital Museum of Sikh Martyrs",
    description: "Explore the rich history of Sikhism through the lives of great martyrs and leaders. Discover stories of Shaheed Bhai Mani Singh Ji, Bhai Taru Singh Ji, and other Sikh heroes.",
    url: 'https://museum.app',
    siteName: 'Museum',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Museum - Sikh History & Heritage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Museum - Sikh History & Heritage | Digital Museum of Sikh Martyrs",
    description: "Explore the rich history of Sikhism through the lives of great martyrs and leaders. Discover stories of Shaheed Bhai Mani Singh Ji, Bhai Taru Singh Ji, and other Sikh heroes.",
    images: ['/images/logo.png'],
    creator: '@museum',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.ico',
    apple: '/images/favicon.ico',
  },
  manifest: '/manifest.json',
  category: 'education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Clear any existing light theme preference to ensure dark mode is default
              if (typeof window !== 'undefined' && !localStorage.getItem('theme')) {
                localStorage.setItem('theme', 'dark');
              }
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Museum",
              "description": "Digital Museum of Sikh History and Heritage",
              "url": "https://museum.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://museum.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Museum",
              "description": "Digital Museum preserving Sikh History and Heritage",
              "url": "https://museum.app",
              "logo": "https://museum.app/images/logo.png",
              "sameAs": [
                "https://twitter.com/museum",
                "https://facebook.com/museum"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ClientOnly>
          <AudioProvider>
            <main className="min-h-screen w-full">
              {children}
            </main>
          </AudioProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
