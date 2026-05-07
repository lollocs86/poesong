import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';
import { put, list, del } from '@vercel/blob';
import path from 'path';

export const maxDuration = 60; // seconds, for large file uploads

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return session ? verifySessionToken(session.value) : false;
}

const FILE_CONFIG = {
  audio:          { prefix: 'audio/',          exts: ['.mp3'] },
  lyrics:         { prefix: 'lyrics/',         exts: ['.ttml'] },
  images:         { prefix: 'images/',         exts: ['.jpg', '.jpeg', '.png', '.webp', '.gif'] },
  'singles-audio': { prefix: 'singles/audio/', exts: ['.mp3'] },
  'singles-lyrics':{ prefix: 'singles/lyrics/',exts: ['.ttml'] },
} as const;

type FileType = keyof typeof FILE_CONFIG;

function isValidType(type: string): type is FileType {
  return type in FILE_CONFIG;
}

function validExt(type: FileType, ext: string): boolean {
  return (FILE_CONFIG[type].exts as readonly string[]).includes(ext);
}

export async function GET(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const type = request.nextUrl.searchParams.get('type') ?? '';
  if (!isValidType(type)) {
    return NextResponse.json({ error: 'Tipo non valido' }, { status: 400 });
  }

  const { blobs } = await list({ prefix: FILE_CONFIG[type].prefix });
  const exts = FILE_CONFIG[type].exts as readonly string[];
  const files = blobs
    .map((b) => ({ name: b.pathname.split('/').pop()!, url: b.url }))
    .filter((f) => exts.some((e) => f.name.endsWith(e)))
    .sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json({ files });
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const type = (formData.get('type') as string) ?? '';
  const targetFilename = (formData.get('targetFilename') as string) ?? '';

  if (!file || !isValidType(type)) {
    return NextResponse.json({
      error: 'File o tipo mancante',
      debug: { filePresent: !!file, type, typeValid: isValidType(type) }
    }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!validExt(type, ext)) {
    return NextResponse.json(
      { error: `Estensione non valida per ${type}` },
      { status: 400 }
    );
  }

  let filename: string;
  if (targetFilename) {
    const tExt = path.extname(targetFilename).toLowerCase();
    if (!validExt(type, tExt)) {
      return NextResponse.json({ error: 'targetFilename estensione non valida' }, { status: 400 });
    }
    const tBase = path.basename(targetFilename, tExt).replace(/[^a-zA-Z0-9\-_]/g, '-').toLowerCase();
    filename = `${tBase}${tExt}`;
  } else {
    const base = path.basename(file.name, ext).replace(/[^a-zA-Z0-9\-_]/g, '-').toLowerCase();
    filename = `${base}${ext}`;
  }

  const pathname = `${FILE_CONFIG[type].prefix}${filename}`;
  try {
    const blob = await put(pathname, file, { access: 'public', addRandomSuffix: false, allowOverwrite: true });
    return NextResponse.json({ success: true, filename, url: blob.url });
  } catch (err) {
    return NextResponse.json({ error: `Errore blob: ${err instanceof Error ? err.message : String(err)}` }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const filename = request.nextUrl.searchParams.get('filename') ?? '';
  const type = request.nextUrl.searchParams.get('type') ?? '';

  if (!filename || !isValidType(type)) {
    return NextResponse.json({ error: 'Parametri mancanti' }, { status: 400 });
  }

  const ext = path.extname(filename).toLowerCase();
  if (!validExt(type, ext) || filename.includes('/') || filename.includes('..')) {
    return NextResponse.json({ error: 'Nome file non valido' }, { status: 400 });
  }

  const { blobs } = await list({ prefix: `${FILE_CONFIG[type].prefix}${filename}` });
  const blob = blobs.find((b) => b.pathname === `${FILE_CONFIG[type].prefix}${filename}`);

  if (!blob) {
    return NextResponse.json({ error: 'File non trovato' }, { status: 404 });
  }

  await del(blob.url);
  return NextResponse.json({ success: true });
}
