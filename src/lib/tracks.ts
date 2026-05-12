import { list } from '@vercel/blob';

const TRACKS_BLOB_PATH = 'data/extra-tracks.json';

export interface ExtraTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumId: string;
  duration: number;
  audioUrl: string;
  lyricsUrl?: string;
  coverUrl?: string;
}

export async function readTracks(): Promise<ExtraTrack[]> {
  try {
    const { blobs } = await list({ prefix: TRACKS_BLOB_PATH });
    const blob = blobs.find((b) => b.pathname === TRACKS_BLOB_PATH);
    if (!blob) return [];
    const res = await fetch(`${blob.url}?t=${Date.now()}`, { cache: 'no-store' });
    return await res.json();
  } catch {
    return [];
  }
}
