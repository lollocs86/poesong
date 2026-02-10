import { promises as fs } from 'fs';
import path from 'path';
import { BlogPost } from '@/types/blog';

const DATA_PATH = path.join(process.cwd(), 'src/data/blog-posts.json');

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getPosts();
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function savePosts(posts: BlogPost[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(posts, null, 2), 'utf-8');
}
