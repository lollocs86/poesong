'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { useCookieConsent } from '@/context/CookieContext';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function GoogleConsentMode() {
  const { consent } = useCookieConsent();

  // Aggiorna il consenso quando cambia
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && consent) {
      window.gtag('consent', 'update', {
        'ad_storage': consent.marketing ? 'granted' : 'denied',
        'ad_user_data': consent.marketing ? 'granted' : 'denied',
        'ad_personalization': consent.marketing ? 'granted' : 'denied',
        'analytics_storage': consent.analytics ? 'granted' : 'denied',
        'functionality_storage': 'granted',
        'personalization_storage': consent.marketing ? 'granted' : 'denied',
        'security_storage': 'granted',
      });
    }
  }, [consent]);

  return (
    <>
      {/* Google Consent Mode V2 - Default settings */}
      <Script
        id="google-consent-mode"
        strategy="beforeInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          // Set default consent to denied
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'functionality_storage': 'granted',
            'personalization_storage': 'denied',
            'security_storage': 'granted',
            'wait_for_update': 500
          });

          // Enable URL passthrough for better measurement
          gtag('set', 'url_passthrough', true);

          // Enable ads data redaction when consent is denied
          gtag('set', 'ads_data_redaction', true);
        `}
      </Script>

      {/* Google Tag Manager - Sostituisci GTM-XXXXXXX con il tuo ID */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}');
        `}
      </Script>
    </>
  );
}
