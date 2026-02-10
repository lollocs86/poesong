import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';
import { getPosts, getPublishedPosts, savePosts } from '@/lib/blog';
import { BlogPost } from '@/types/blog';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all') === 'true';

  if (all) {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME);
    if (!session || !verifySessionToken(session.value)) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }
    const posts = await getPosts();
    return NextResponse.json(posts);
  }

  const posts = await getPublishedPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  if (!session || !verifySessionToken(session.value)) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const body = await request.json();
  const posts = await getPosts();

  if (posts.some((p) => p.slug === body.slug)) {
    return NextResponse.json({ error: 'Slug già esistente' }, { status: 400 });
  }

  const newPost: BlogPost = {
    id: Date.now().toString(),
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt,
    content: body.content,
    category: body.category || 'Generale',
    date: body.date || new Date().toISOString().split('T')[0],
    published: body.published ?? false,
  };

  posts.push(newPost);
  await savePosts(posts);

  return NextResponse.json(newPost, { status: 201 });
}
