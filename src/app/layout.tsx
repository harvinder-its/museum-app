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
  title: "Musem - Sikh History & Heritage | Digital Museum of Sikh Martyrs",
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
  authors: [{ name: "Musem Team" }],
  creator: "Musem",
  publisher: "Musem",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://musem.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Musem - Sikh History & Heritage | Digital Museum of Sikh Martyrs",
    description: "Explore the rich history of Sikhism through the lives of great martyrs and leaders. Discover stories of Shaheed Bhai Mani Singh Ji, Bhai Taru Singh Ji, and other Sikh heroes.",
    url: 'https://musem.app',
    siteName: 'Musem',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Musem - Sikh History & Heritage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Musem - Sikh History & Heritage | Digital Museum of Sikh Martyrs",
    description: "Explore the rich history of Sikhism through the lives of great martyrs and leaders. Discover stories of Shaheed Bhai Mani Singh Ji, Bhai Taru Singh Ji, and other Sikh heroes.",
    images: ['/images/logo.png'],
    creator: '@musem',
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Musem",
              "description": "Digital Museum of Sikh History and Heritage",
              "url": "https://musem.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://musem.app/search?q={search_term_string}",
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
              "name": "Musem",
              "description": "Digital Museum preserving Sikh History and Heritage",
              "url": "https://musem.app",
              "logo": "https://musem.app/images/logo.png",
              "sameAs": [
                "https://twitter.com/musem",
                "https://facebook.com/musem"
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
