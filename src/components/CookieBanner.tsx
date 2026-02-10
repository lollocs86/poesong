'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCookieConsent } from '@/context/CookieContext';

export function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, acceptSelected } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (!showBanner) return null;

  const handleSavePreferences = () => {
    acceptSelected({ necessary: true, analytics, marketing });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Informativa sui Cookie
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {!showSettings ? (
            <>
              <p className="text-gray-600 mb-4">
                Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. I cookie necessari sono essenziali per il funzionamento del sito. Puoi scegliere di accettare anche i cookie analitici e di marketing per aiutarci a migliorare i nostri servizi.
              </p>
              <p className="text-gray-600 mb-6 text-sm">
                Per maggiori informazioni, consulta la nostra{' '}
                <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                {' '}e la{' '}
                <Link href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</Link>.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptAll}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Accetta tutti
                </button>
                <button
                  onClick={rejectAll}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Solo necessari
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex-1 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Personalizza
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Scegli quali cookie desideri accettare. I cookie necessari non possono essere disattivati.
              </p>

              {/* Cookie Settings */}
              <div className="space-y-4 mb-6">
                {/* Necessary */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">Cookie Necessari</h3>
                    <p className="text-sm text-gray-500">Essenziali per il funzionamento del sito</p>
                  </div>
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">Cookie Analitici</h3>
                    <p className="text-sm text-gray-500">Ci aiutano a capire come usi il sito</p>
                  </div>
                  <button
                    onClick={() => setAnalytics(!analytics)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${analytics ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${analytics ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">Cookie di Marketing</h3>
                    <p className="text-sm text-gray-500">Per mostrarti contenuti personalizzati</p>
                  </div>
                  <button
                    onClick={() => setMarketing(!marketing)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${marketing ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${marketing ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Salva preferenze
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Indietro
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
