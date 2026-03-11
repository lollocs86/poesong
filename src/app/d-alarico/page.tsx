import { Metadata } from 'next';
import { DAlaricClient } from './DAlaricClient';

export const metadata: Metadata = {
  title: "D'Alarico - PoeSong",
  description: "Ascolta D'Alarico, un brano di PoeSong",
  alternates: {
    canonical: 'https://poesong.it/d-alarico',
  },
  openGraph: {
    title: "D'Alarico - PoeSong",
    description: "Ascolta D'Alarico con lyrics sincronizzate",
    url: 'https://poesong.it/d-alarico',
  },
};

export default function DAlaricPage() {
  return <DAlaricClient />;
}
