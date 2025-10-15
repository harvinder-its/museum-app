import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Museum - Sikh History & Heritage | Digital Museum",
  description: "Learn about Museum's mission to preserve and celebrate Sikh heritage through digital innovation. Discover our interactive exhibits and educational content about Sikh history.",
  keywords: [
    "about museum",
    "sikh digital museum",
    "sikh heritage preservation",
    "sikh history education",
    "museum mission",
    "sikh culture digital"
  ],
  openGraph: {
    title: "About Museum - Sikh History & Heritage | Digital Museum",
    description: "Learn about Museum's mission to preserve and celebrate Sikh heritage through digital innovation.",
    url: 'https://museum.app/staging/about',
  },
  twitter: {
    title: "About Museum - Sikh History & Heritage | Digital Museum",
    description: "Learn about Museum's mission to preserve and celebrate Sikh heritage through digital innovation.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
