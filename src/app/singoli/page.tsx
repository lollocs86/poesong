import { Metadata } from 'next';
import { SinglesClient } from './SinglesClient';

export const metadata: Metadata = {
  title: 'Singoli - PoeSong',
  description: 'Ascolta i singoli di PoeSong.',
  alternates: { canonical: 'https://poesong.it/singoli' },
};

export default function SinglesPage() {
  return <SinglesClient />;
}
