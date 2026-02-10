import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contatti | PoeSong',
  description: 'Contattaci per domande, collaborazioni o feedback. Siamo sempre felici di ascoltarti.',
  openGraph: {
    title: 'Contatti | PoeSong',
    description: 'Contattaci per domande, collaborazioni o feedback.',
    url: 'https://poesong.it/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
