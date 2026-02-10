import { Metadata } from 'next';
import { GazaLadraClient } from './GazaLadraClient';

export const metadata: Metadata = {
  title: 'Gaza Ladra - PoeSong',
  description: 'Ascolta Gaza Ladra, l\'album di PoeSong. Un requiem per ciò che è stato perso e un inno alla vita che resiste.',
  openGraph: {
    title: 'Gaza Ladra - PoeSong',
    description: 'Un requiem per ciò che è stato perso e un inno alla vita che resiste. Ascolta l\'album completo.',
    url: 'https://poesong.it/gazaladra',
    images: [
      {
        url: '/images/gazaladra-cover.svg',
        width: 1200,
        height: 630,
        alt: 'Gaza Ladra - Album Cover',
      },
    ],
  },
};

export default function GazaLadraPage() {
  return <GazaLadraClient />;
}
