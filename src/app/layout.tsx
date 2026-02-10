import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieProvider } from "@/context/CookieContext";
import { CookieBanner } from "@/components/CookieBanner";
import { CookieButton } from "@/components/CookieButton";
import { GoogleConsentMode } from "@/components/GoogleConsentMode";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PoeSong - Musica che racconta storie",
  description: "PoeSong - Musica che racconta storie, emozioni che diventano melodie. Ascolta i nostri album e scopri la nostra musica.",
  keywords: ["poesong", "musica", "album", "gaza ladra", "italia", "poesia", "canzoni"],
  authors: [{ name: "Pino Sassano" }],
  icons: {
    icon: "/images/poesong-logo.png",
    apple: "/images/poesong-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://poesong.it",
    siteName: "PoeSong",
    title: "PoeSong - Musica che racconta storie",
    description: "Poesia e musica si incontrano. Ascolta i nostri album e scopri le storie che vibrano sotto la superficie del quotidiano.",
    images: [
      {
        url: "/images/poesong-logo.png",
        width: 1200,
        height: 630,
        alt: "PoeSong",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PoeSong - Musica che racconta storie",
    description: "Poesia e musica si incontrano. Ascolta i nostri album e scopri le storie che vibrano sotto la superficie del quotidiano.",
    images: ["/images/poesong-logo.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${openSans.variable} antialiased`} suppressHydrationWarning>
        <CookieProvider>
          <GoogleConsentMode />
          <Header />
          <main className="min-h-screen pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <CookieButton />
        </CookieProvider>
      </body>
    </html>
  );
}
