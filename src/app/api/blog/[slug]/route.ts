import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';
import { getPosts, getPostBySlug, savePosts } from '@/lib/blog';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return NextResponse.json({ error: 'Articolo non trovato' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  if (!session || !verifySessionToken(session.value)) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const body = await request.json();
  const posts = await getPosts();
  const index = posts.findIndex((p) => p.slug === slug);

  if (index === -1) {
    return NextResponse.json({ error: 'Articolo non trovato' }, { status: 404 });
  }

  if (body.slug && body.slug !== slug && posts.some((p) => p.slug === body.slug)) {
    return NextResponse.json({ error: 'Slug già esistente' }, { status: 400 });
  }

  posts[index] = { ...posts[index], ...body };
  await savePosts(posts);

  return NextResponse.json(posts[index]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  if (!session || !verifySessionToken(session.value)) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const posts = await getPosts();
  const filtered = posts.filter((p) => p.slug !== slug);

  if (filtered.length === posts.length) {
    return NextResponse.json({ error: 'Articolo non trovato' }, { status: 404 });
  }

  await savePosts(filtered);
  return NextResponse.json({ success: true });
}
