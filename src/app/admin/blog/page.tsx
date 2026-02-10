'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

export default function AdminBlogDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkAuthAndFetch() {
    const authRes = await fetch('/api/auth');
    const { authenticated } = await authRes.json();
    if (!authenticated) {
      router.push('/admin');
      return;
    }

    const res = await fetch('/api/blog?all=true');
    if (res.ok) {
      const data = await res.json();
      setPosts(
        data.sort(
          (a: BlogPost, b: BlogPost) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    }
    setLoading(false);
  }

  async function handleDelete(slug: string) {
    if (!confirm('Sei sicuro di voler eliminare questo articolo?')) return;

    const res = await fetch(`/api/blog/${slug}`, { method: 'DELETE' });
    if (res.ok) {
      setPosts(posts.filter((p) => p.slug !== slug));
    }
  }

  async function handleTogglePublish(slug: string, currentStatus: boolean) {
    const res = await fetch(`/api/blog/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !currentStatus }),
    });
    if (res.ok) {
      setPosts(
        posts.map((p) =>
          p.slug === slug ? { ...p, published: !currentStatus } : p
        )
      );
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-gray-900 flex items-center justify-center -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="text-gray-400">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gray-900 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestione Blog</h1>
            <p className="text-gray-400 text-sm mt-1">
              {posts.length} articol{posts.length === 1 ? 'o' : 'i'}
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            + Nuovo Articolo
          </Link>
        </div>

        {/* Table */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-gray-800 rounded-xl">
            <p className="text-gray-400 text-lg">Nessun articolo creato.</p>
            <Link
              href="/admin/blog/new"
              className="text-blue-400 hover:text-blue-300 mt-2 inline-block"
            >
              Crea il primo articolo &rarr;
            </Link>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      Titolo
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300 hidden md:table-cell">
                      Categoria
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300 hidden sm:table-cell">
                      Data
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">
                      Stato
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-300">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-gray-700/50 hover:bg-gray-700/30"
                    >
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{post.title}</div>
                        <div className="text-gray-500 text-xs mt-1">/{post.slug}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm hidden md:table-cell">
                        {post.category}
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm hidden sm:table-cell">
                        {new Date(post.date).toLocaleDateString('it-IT')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublish(post.slug, post.published)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            post.published
                              ? 'bg-green-900/50 text-green-400 hover:bg-green-900'
                              : 'bg-yellow-900/50 text-yellow-400 hover:bg-yellow-900'
                          }`}
                        >
                          {post.published ? 'Pubblicato' : 'Bozza'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/blog/edit/${post.slug}`}
                            className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded-lg transition-colors"
                          >
                            Modifica
                          </Link>
                          <button
                            onClick={() => handleDelete(post.slug)}
                            className="px-3 py-1.5 bg-red-900/50 hover:bg-red-800 text-red-400 hover:text-red-300 text-sm rounded-lg transition-colors"
                          >
                            Elimina
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
