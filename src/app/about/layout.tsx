import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Musem - Sikh History & Heritage | Digital Museum",
  description: "Learn about Musem's mission to preserve and celebrate Sikh heritage through digital innovation. Discover our interactive exhibits and educational content about Sikh history.",
  keywords: [
    "about musem",
    "sikh digital museum",
    "sikh heritage preservation",
    "sikh history education",
    "musem mission",
    "sikh culture digital"
  ],
  openGraph: {
    title: "About Musem - Sikh History & Heritage | Digital Museum",
    description: "Learn about Musem's mission to preserve and celebrate Sikh heritage through digital innovation.",
    url: 'https://musem.app/about',
  },
  twitter: {
    title: "About Musem - Sikh History & Heritage | Digital Museum",
    description: "Learn about Musem's mission to preserve and celebrate Sikh heritage through digital innovation.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
