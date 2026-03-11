import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | PoeSong',
  description: 'Informativa sull\'utilizzo dei cookie ai sensi del GDPR. Scopri come utilizziamo i cookie sul nostro sito.',
  alternates: {
    canonical: 'https://poesong.it/cookie-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
