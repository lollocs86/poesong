'use client';

import { useCookieConsent } from '@/context/CookieContext';

export function CookieButton() {
  const { openSettings, showBanner } = useCookieConsent();

  // Non mostrare il pulsante se il banner è già aperto
  if (showBanner) return null;

  return (
    <button
      onClick={openSettings}
      className="fixed top-20 right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/90 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      aria-label="Gestisci Cookie"
      title="Gestisci Cookie"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    </button>
  );
}
