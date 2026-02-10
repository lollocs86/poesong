import { Metadata } from 'next';
import { GazaLadraClient } from './GazaLadraClient';

export const metadata: Metadata = {
  title: 'Gaza Ladra - PoeSong',
  description: 'Ascolta Gaza Ladra, l\'ultimo album di PoeSong. Un viaggio musicale attraverso emozioni e paesaggi sonori unici.',
};

export default function GazaLadraPage() {
  return <GazaLadraClient />;
}
