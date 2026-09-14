'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/gazaladra', label: 'Album' },
  { href: '/singoli', label: 'Singoli' },
  {
    href: '/lo-spettacolo',
    label: 'Lo spettacolo',
    children: [{ href: '/eventi', label: 'Eventi' }],
  },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: "L'autore" },
  { href: '/contact', label: 'Contatti' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/poesong-logo.png"
              alt="PoeSong"
              width={150}
              height={40}
              className="h-8 md:h-10 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) =>
              item.children ? (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200 py-2"
                  >
                    {item.label}
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[160px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-50 font-medium transition-colors duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            {menuItems.map((item) =>
              item.children ? (
                <div key={item.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="block py-3 text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <button
                      aria-label="Espandi sottomenu"
                      className="p-3 text-gray-400"
                      onClick={() =>
                        setOpenMobileSubmenu(openMobileSubmenu === item.href ? null : item.href)
                      }
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openMobileSubmenu === item.href ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  {openMobileSubmenu === item.href && (
                    <div className="pl-4 border-l-2 border-gray-100 ml-1 mb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-gray-500 hover:text-blue-500 font-medium transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-gray-600 hover:text-blue-500 font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
