'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth').then(async (res) => {
      const { authenticated } = await res.json();
      if (!authenticated) router.push('/admin');
      else setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-gray-900 flex items-center justify-center -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="text-gray-400">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gray-900 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">
            Poe<span className="text-blue-400">Song</span> Admin
          </h1>
          <p className="text-gray-400 mt-2">Pannello di controllo</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/admin/blog"
            className="group bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-blue-500 rounded-xl p-8 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">Blog</h2>
            </div>
            <p className="text-gray-400 text-sm">Crea, modifica e pubblica articoli del blog.</p>
          </Link>

          <Link
            href="/admin/media"
            className="group bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-purple-500 rounded-xl p-8 transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">Media</h2>
            </div>
            <p className="text-gray-400 text-sm">Carica e gestisci file audio MP3 e testi TTML.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
