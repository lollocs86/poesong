'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { albums } from '@/data/albums';
import type { Album, Track } from '@/types';

type FileType = 'audio' | 'lyrics';

interface Message {
  type: 'success' | 'error';
  text: string;
}

interface UploadTarget {
  type: FileType;
  targetFilename: string;
  trackTitle: string;
}

export default function AdminMediaPage() {
  const [audioFiles, setAudioFiles] = useState<Set<string>>(new Set()); // set of filenames
  const [lyricsFiles, setLyricsFiles] = useState<Set<string>>(new Set()); // set of filenames
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null); // filename being uploaded
  const [message, setMessage] = useState<Message | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album>(albums[0]);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const lyricsInputRef = useRef<HTMLInputElement>(null);
  const pendingUpload = useRef<UploadTarget | null>(null);
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
    await fetchFiles();
    setLoading(false);
  }

  async function fetchFiles() {
    const [audioRes, lyricsRes] = await Promise.all([
      fetch('/api/upload?type=audio'),
      fetch('/api/upload?type=lyrics'),
    ]);
    if (audioRes.ok) setAudioFiles(new Set((await audioRes.json()).files.map((f: { name: string }) => f.name)));
    if (lyricsRes.ok) setLyricsFiles(new Set((await lyricsRes.json()).files.map((f: { name: string }) => f.name)));
  }

  function triggerUpload(target: UploadTarget) {
    pendingUpload.current = target;
    if (target.type === 'audio') audioInputRef.current?.click();
    else lyricsInputRef.current?.click();
  }

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>, type: FileType) {
    const file = e.target.files?.[0];
    const target = pendingUpload.current;
    if (!file || !target || target.type !== type) return;

    setUploading(target.targetFilename);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', target.type);
    formData.append('targetFilename', target.targetFilename);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: `"${data.filename}" caricato per "${target.trackTitle}".` });
        await fetchFiles();
      } else {
        setMessage({ type: 'error', text: data.error || 'Errore durante il caricamento.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Errore di connessione.' });
    } finally {
      setUploading(null);
      pendingUpload.current = null;
      if (audioInputRef.current) audioInputRef.current.value = '';
      if (lyricsInputRef.current) lyricsInputRef.current.value = '';
    }
  }

  async function handleDelete(filename: string, type: FileType) {
    if (!confirm(`Eliminare "${filename}"?`)) return;

    const res = await fetch(
      `/api/upload?filename=${encodeURIComponent(filename)}&type=${type}`,
      { method: 'DELETE' }
    );
    if (res.ok) {
      setMessage({ type: 'success', text: `"${filename}" eliminato.` });
      await fetchFiles();
    } else {
      setMessage({ type: 'error', text: "Errore durante l'eliminazione." });
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
      {/* Hidden file inputs */}
      <input ref={audioInputRef} type="file" accept=".mp3" className="hidden" onChange={(e) => handleFileSelected(e, 'audio')} />
      <input ref={lyricsInputRef} type="file" accept=".ttml" className="hidden" onChange={(e) => handleFileSelected(e, 'lyrics')} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestione Media</h1>
            <p className="text-gray-400 text-sm mt-1">Carica e gestisci file audio e testi</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
            >
              ← Pannello
            </Link>
            <Link
              href="/admin/blog"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>

        {/* Album selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Album</label>
          <div className="flex gap-2 flex-wrap">
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => setSelectedAlbum(album)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedAlbum.id === album.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {album.title}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border text-sm ${
              message.type === 'success'
                ? 'bg-green-900/30 border-green-700 text-green-300'
                : 'bg-red-900/30 border-red-700 text-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Stats row */}
        <AlbumStats album={selectedAlbum} audioFiles={audioFiles} lyricsFiles={lyricsFiles} />

        {/* Track list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <TrackSection
            title="Audio MP3"
            type="audio"
            tracks={selectedAlbum.tracks}
            existingFiles={audioFiles}
            uploading={uploading}
            onUpload={(track) =>
              triggerUpload({
                type: 'audio',
                targetFilename: track.audioUrl.split('/').pop()!,
                trackTitle: track.title,
              })
            }
            onUploadNew={() => triggerUpload({ type: 'audio', targetFilename: '', trackTitle: 'nuovo file' })}
            onDelete={(filename) => handleDelete(filename, 'audio')}
          />
          <TrackSection
            title="Testi TTML"
            type="lyrics"
            tracks={selectedAlbum.tracks}
            existingFiles={lyricsFiles}
            uploading={uploading}
            onUpload={(track) =>
              triggerUpload({
                type: 'lyrics',
                targetFilename: track.lyricsUrl?.split('/').pop() ?? '',
                trackTitle: track.title,
              })
            }
            onUploadNew={() => triggerUpload({ type: 'lyrics', targetFilename: '', trackTitle: 'nuovo file' })}
            onDelete={(filename) => handleDelete(filename, 'lyrics')}
          />
        </div>
      </div>
    </div>
  );
}

function AlbumStats({
  album,
  audioFiles,
  lyricsFiles,
}: {
  album: Album;
  audioFiles: Set<string>;
  lyricsFiles: Set<string>;
}) {
  const total = album.tracks.length;
  const audioCount = album.tracks.filter((t) => {
    const filename = t.audioUrl.split('/').pop();
    return filename && audioFiles.has(filename);
  }).length;
  const lyricsCount = album.tracks.filter((t) => {
    const filename = t.lyricsUrl?.split('/').pop();
    return filename && lyricsFiles.has(filename);
  }).length;

  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        { label: 'Tracce', value: total, color: 'text-white' },
        { label: 'Audio presenti', value: `${audioCount}/${total}`, color: audioCount === total ? 'text-green-400' : 'text-yellow-400' },
        { label: 'Testi presenti', value: `${lyricsCount}/${total}`, color: lyricsCount === total ? 'text-green-400' : 'text-yellow-400' },
      ].map((stat) => (
        <div key={stat.label} className="bg-gray-800 rounded-xl p-4 text-center">
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function TrackSection({
  title,
  type,
  tracks,
  existingFiles,
  uploading,
  onUpload,
  onUploadNew,
  onDelete,
}: {
  title: string;
  type: FileType;
  tracks: Track[];
  existingFiles: Set<string>;
  uploading: string | null;
  onUpload: (track: Track) => void;
  onUploadNew: () => void;
  onDelete: (filename: string) => void;
}) {
  const getFilename = (track: Track): string => {
    const url = type === 'audio' ? track.audioUrl : track.lyricsUrl;
    return url?.split('/').pop() ?? '';
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <button
          onClick={onUploadNew}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Carica nuovo
        </button>
      </div>
      <div className="space-y-2">
        {tracks.map((track) => {
          const filename = getFilename(track);
          const exists = filename ? existingFiles.has(filename) : false;
          const isUploading = uploading === filename;

          return (
            <div
              key={track.id}
              className="flex items-center gap-3 py-2.5 px-3 bg-gray-700/50 rounded-lg group hover:bg-gray-700 transition-colors"
            >
              {/* Status dot */}
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  exists ? 'bg-green-400' : 'bg-red-500'
                }`}
              />

              {/* Track info */}
              <div className="flex-1 min-w-0">
                <div className="text-gray-300 text-sm truncate">{track.title}</div>
                <div className="text-gray-500 text-xs font-mono truncate">{filename || '—'}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {isUploading ? (
                  <svg className="animate-spin h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    {/* Upload / Replace button */}
                    <button
                      onClick={() => onUpload(track)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors border ${
                        exists
                          ? 'border-gray-500 text-gray-300 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-900/20'
                          : 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      title={exists ? 'Sostituisci file' : 'Carica file'}
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      {exists ? 'Sostituisci' : 'Carica'}
                    </button>
                    {/* Delete button */}
                    {exists && (
                      <button
                        onClick={() => onDelete(filename)}
                        className="text-gray-600 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100"
                        title="Elimina"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
