'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCookieConsent } from '@/context/CookieContext';

export function Footer() {
  const { openSettings } = useCookieConsent();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/poesong-logo.png"
                alt="PoeSong Logo"
                width={40}
                height={40}
                className="rounded bg-white p-1"
              />
              <span className="text-2xl font-bold">Poe<span className="text-blue-400">Song</span></span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Musica che racconta storie, emozioni che diventano melodie.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Link Utili</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gazaladra" className="text-gray-400 hover:text-white transition-colors">
                  Gaza Ladra
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  L&apos;autore
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informazioni Legali</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <button
                  onClick={openSettings}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gestisci Cookie
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} PoeSong. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
