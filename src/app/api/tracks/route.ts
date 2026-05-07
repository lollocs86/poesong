import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';
import { put, list } from '@vercel/blob';

export const maxDuration = 30;

const TRACKS_BLOB_PATH = 'data/extra-tracks.json';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return session ? verifySessionToken(session.value) : false;
}

interface ExtraTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumId: string;
  duration: number;
  audioUrl: string;
  lyricsUrl?: string;
}

async function readTracks(): Promise<ExtraTrack[]> {
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

async function writeTracks(tracks: ExtraTrack[]) {
  await put(TRACKS_BLOB_PATH, JSON.stringify(tracks), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
}

// Public: no auth needed to read tracks (used by app pages)
export async function GET() {
  const tracks = await readTracks();
  return NextResponse.json(tracks);
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const track = await request.json() as Omit<ExtraTrack, 'id'>;
  if (!track.title || !track.audioUrl) {
    return NextResponse.json({ error: 'Titolo e audioUrl obbligatori' }, { status: 400 });
  }

  try {
    const tracks = await readTracks();
    const newTrack: ExtraTrack = {
      ...track,
      id: `extra-${Date.now()}`,
    };
    tracks.push(newTrack);
    await writeTracks(tracks);
    return NextResponse.json(newTrack);
  } catch (err) {
    return NextResponse.json({ error: `Errore salvataggio: ${err instanceof Error ? err.message : String(err)}` }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID mancante' }, { status: 400 });

  try {
    const tracks = await readTracks();
    const filtered = tracks.filter((t) => t.id !== id);
    await writeTracks(filtered);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: `Errore eliminazione: ${err instanceof Error ? err.message : String(err)}` }, { status: 500 });
  }
}
