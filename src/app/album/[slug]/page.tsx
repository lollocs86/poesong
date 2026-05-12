import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readAlbums } from '@/lib/dynamic-albums';
import { DynamicAlbumClient } from './DynamicAlbumClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const albums = await readAlbums();
  const album = albums.find((a) => a.id === slug || a.id.startsWith(slug + '-'));

  if (!album) return { title: 'Album non trovato - PoeSong' };

  const title = `${album.title} - ${album.artist} | PoeSong`;
  const description = album.description || `Ascolta "${album.title}" di ${album.artist} su PoeSong.`;
  const url = `https://poesong.it/album/${album.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'music.album',
      ...(album.coverUrl ? { images: [{ url: album.coverUrl, width: 800, height: 800 }] } : {}),
    },
  };
}

export default async function DynamicAlbumPage({ params }: Props) {
  const { slug } = await params;
  const albums = await readAlbums();
  const album = albums.find((a) => a.id === slug || a.id.startsWith(slug + '-'));

  if (!album) notFound();

  return <DynamicAlbumClient album={album} />;
}
