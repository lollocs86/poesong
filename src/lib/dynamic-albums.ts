import { list, put } from '@vercel/blob';

const ALBUMS_BLOB_PATH = 'data/albums.json';

export interface DynamicTrack {
  id: string;
  title: string;
  duration: number;
  audioUrl: string;
  lyricsUrl?: string;
}

export interface DynamicAlbum {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
  releaseYear?: number;
  description?: string;
  tracks: DynamicTrack[];
  createdAt: string;
}

export async function readAlbums(): Promise<DynamicAlbum[]> {
  try {
    const { blobs } = await list({ prefix: ALBUMS_BLOB_PATH });
    const blob = blobs.find((b) => b.pathname === ALBUMS_BLOB_PATH);
    if (!blob) return [];
    const res = await fetch(`${blob.url}?t=${Date.now()}`, { cache: 'no-store' });
    return await res.json();
  } catch {
    return [];
  }
}

export async function writeAlbums(albums: DynamicAlbum[]) {
  await put(ALBUMS_BLOB_PATH, JSON.stringify(albums), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
}
