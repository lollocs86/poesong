import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readTracksSafe } from '@/lib/tracks';
import { SingleTrackClient } from './SingleTrackClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tracks = await readTracksSafe();
  const track = tracks.find((t) => t.id === id && t.albumId === 'singoli');

  if (!track) {
    return { title: 'Traccia non trovata - PoeSong' };
  }

  const title = `${track.title} - ${track.artist} | PoeSong`;
  const description = `Ascolta "${track.title}" di ${track.artist} su PoeSong.`;
  const url = `https://poesong.it/singoli/${id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'music.song',
      ...(track.coverUrl ? { images: [{ url: track.coverUrl, width: 800, height: 800 }] } : {}),
    },
    twitter: {
      card: track.coverUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(track.coverUrl ? { images: [track.coverUrl] } : {}),
    },
  };
}

export default async function SingleTrackPage({ params }: Props) {
  const { id } = await params;
  const tracks = await readTracksSafe();
  const track = tracks.find((t) => t.id === id && t.albumId === 'singoli');

  if (!track) notFound();

  return <SingleTrackClient track={track} />;
}
