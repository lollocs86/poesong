import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | PoeSong',
  description: 'Informativa sul trattamento dei dati personali ai sensi del GDPR. Scopri come proteggiamo la tua privacy.',
  alternates: {
    canonical: 'https://poesong.it/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
