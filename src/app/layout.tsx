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
  keywords: ["poesong", "musica", "album", "gaza ladra", "italia"],
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
