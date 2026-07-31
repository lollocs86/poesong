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
  const { blobs } = await list({ prefix: TRACKS_BLOB_PATH });
  const blob = blobs.find((b) => b.pathname === TRACKS_BLOB_PATH);
  if (!blob) return [];
  const res = await fetch(`${blob.url}?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Impossibile leggere le tracce esistenti (${res.status})`);
  }
  return await res.json();
}

// Used by public pages: never throw, just show nothing rather than break rendering
export async function readTracksSafe(): Promise<ExtraTrack[]> {
  try {
    return await readTracks();
  } catch {
    return [];
  }
}
