import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';
import { put, list, del } from '@vercel/blob';
import path from 'path';

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return session ? verifySessionToken(session.value) : false;
}

const FILE_CONFIG = {
  audio: { prefix: 'audio/', ext: '.mp3' },
  lyrics: { prefix: 'lyrics/', ext: '.ttml' },
} as const;

type FileType = keyof typeof FILE_CONFIG;

function isValidType(type: string): type is FileType {
  return type in FILE_CONFIG;
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
  const files = blobs
    .map((b) => ({ name: b.pathname.split('/').pop()!, url: b.url }))
    .filter((f) => f.name.endsWith(FILE_CONFIG[type].ext))
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
    return NextResponse.json({ error: 'File o tipo mancante' }, { status: 400 });
  }

  const config = FILE_CONFIG[type];
  const ext = path.extname(file.name).toLowerCase();

  if (ext !== config.ext) {
    return NextResponse.json(
      { error: `Estensione non valida. Atteso: ${config.ext}` },
      { status: 400 }
    );
  }

  let filename: string;
  if (targetFilename) {
    const tExt = path.extname(targetFilename).toLowerCase();
    if (tExt !== config.ext) {
      return NextResponse.json({ error: 'targetFilename estensione non valida' }, { status: 400 });
    }
    const tBase = path.basename(targetFilename, tExt).replace(/[^a-zA-Z0-9\-_]/g, '-').toLowerCase();
    filename = `${tBase}${tExt}`;
  } else {
    const base = path.basename(file.name, ext).replace(/[^a-zA-Z0-9\-_]/g, '-').toLowerCase();
    filename = `${base}${ext}`;
  }

  const pathname = `${config.prefix}${filename}`;
  const blob = await put(pathname, file, { access: 'public', addRandomSuffix: false });

  return NextResponse.json({ success: true, filename, url: blob.url });
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

  const config = FILE_CONFIG[type];
  const ext = path.extname(filename).toLowerCase();

  if (ext !== config.ext || filename.includes('/') || filename.includes('..')) {
    return NextResponse.json({ error: 'Nome file non valido' }, { status: 400 });
  }

  // Find blob URL by pathname
  const { blobs } = await list({ prefix: `${config.prefix}${filename}` });
  const blob = blobs.find((b) => b.pathname === `${config.prefix}${filename}`);

  if (!blob) {
    return NextResponse.json({ error: 'File non trovato' }, { status: 404 });
  }

  await del(blob.url);
  return NextResponse.json({ success: true });
}
