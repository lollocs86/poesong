import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';
import { readAlbums, writeAlbums, type DynamicAlbum } from '@/lib/dynamic-albums';

export const maxDuration = 30;

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return session ? verifySessionToken(session.value) : false;
}

export async function GET() {
  const albums = await readAlbums();
  return NextResponse.json(albums);
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const body = await request.json() as Omit<DynamicAlbum, 'id' | 'createdAt'>;
  if (!body.title) {
    return NextResponse.json({ error: 'Titolo obbligatorio' }, { status: 400 });
  }

  try {
    const albums = await readAlbums();
    const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const id = `${slug}-${Date.now()}`;
    const newAlbum: DynamicAlbum = { ...body, id, createdAt: new Date().toISOString() };
    albums.push(newAlbum);
    await writeAlbums(albums);
    return NextResponse.json(newAlbum);
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
    const albums = await readAlbums();
    const filtered = albums.filter((a) => a.id !== id);
    await writeAlbums(filtered);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: `Errore eliminazione: ${err instanceof Error ? err.message : String(err)}` }, { status: 500 });
  }
}
