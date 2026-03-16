import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://vistavisionproductions.com"),
  applicationName: "Vista Vision Productions",
  title: "Vista Vision Productions",
  description: "Cinematography, videography, and video editing for brands, artists, events, and commercial campaigns.",
  keywords: [
    "Vista Vision Productions",
    "videography",
    "cinematography",
    "video editing",
    "brand films",
    "music videos",
    "commercial shoots",
    "event videography",
    "wedding films",
    "product commercials",
    "Delhi videographer",
    "India production house",
  ],
  authors: [{ name: "Vista Vision Productions" }],
  creator: "Vista Vision Productions",
  publisher: "Vista Vision Productions",
  category: "video production",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/vvlogo.jpeg",
    shortcut: "/vvlogo.jpeg",
    apple: "/vvlogo.jpeg",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Vista Vision Productions",
    title: "Vista Vision Productions",
    description: "Brand films, music videos, event coverage, and commercial edits with a cinematic visual language.",
    images: [
      {
        url: "/vvlogo.jpeg",
        alt: "Vista Vision Productions logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Vista Vision Productions",
    description: "Cinematography, videography, and editing with a polished cinematic feel.",
    images: ["/vvlogo.jpeg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
