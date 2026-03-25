import { Metadata } from 'next';
import { ASandroEAEnzoClient } from './ASandroEAEnzoClient';

export const metadata: Metadata = {
  title: 'A Sandro e a Enzo - PoeSong',
  description: 'Ascolta A Sandro e a Enzo, una poesong dedicata agli amici Sandro ed Enzo. Un viaggio poetico attraverso la Sila e i suoi paesaggi.',
  alternates: {
    canonical: 'https://poesong.it/a-sandro-e-a-enzo',
  },
  openGraph: {
    title: 'A Sandro e a Enzo - PoeSong',
    description: 'Un viaggio poetico attraverso la Sila e i suoi paesaggi. Ascolta la poesong completa.',
    url: 'https://poesong.it/a-sandro-e-a-enzo',
    images: [
      {
        url: '/images/a-sandro-e-a-enzo.jpg',
        width: 1200,
        height: 630,
        alt: 'Sandro ed Enzo',
      },
    ],
  },
};

export default function ASandroEAEnzoPage() {
  return <ASandroEAEnzoClient />;
}
