'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { albums } from '@/data/albums';
import type { Album, Track } from '@/types';

type FileType = 'audio' | 'lyrics';
type ViewMode = 'album' | 'singles';

interface BlobFile { name: string; url: string; }
interface Message { type: 'success' | 'error'; text: string; }
interface UploadTarget { type: FileType; targetFilename: string; trackTitle: string; }

// All filenames referenced by any album track
const allAlbumFilenames = new Set<string>(
  albums.flatMap((a) =>
    a.tracks.flatMap((t) => [
      t.audioUrl.split('/').pop() ?? '',
      t.lyricsUrl?.split('/').pop() ?? '',
    ])
  )
);

export default function AdminMediaPage() {
  const [audioFiles, setAudioFiles] = useState<BlobFile[]>([]);
  const [lyricsFiles, setLyricsFiles] = useState<BlobFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('album');
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
    if (!authenticated) { router.push('/admin'); return; }
    await fetchFiles();
    setLoading(false);
  }

  async function fetchFiles() {
    const [audioRes, lyricsRes] = await Promise.all([
      fetch('/api/upload?type=audio'),
      fetch('/api/upload?type=lyrics'),
    ]);
    if (audioRes.ok) setAudioFiles((await audioRes.json()).files);
    if (lyricsRes.ok) setLyricsFiles((await lyricsRes.json()).files);
  }

  const audioSet = new Set(audioFiles.map((f) => f.name));
  const lyricsSet = new Set(lyricsFiles.map((f) => f.name));

  function triggerUpload(target: UploadTarget) {
    pendingUpload.current = target;
    if (target.type === 'audio') audioInputRef.current?.click();
    else lyricsInputRef.current?.click();
  }

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>, type: FileType) {
    const file = e.target.files?.[0];
    const target = pendingUpload.current;
    if (!file || !target || target.type !== type) return;

    setUploading(target.targetFilename || file.name);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', target.type);
    formData.append('targetFilename', target.targetFilename);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: `"${data.filename}" caricato.` });
        await fetchFiles();
      } else {
        setMessage({ type: 'error', text: data.error || 'Errore caricamento.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Errore connessione.' });
    } finally {
      setUploading(null);
      pendingUpload.current = null;
      if (audioInputRef.current) audioInputRef.current.value = '';
      if (lyricsInputRef.current) lyricsInputRef.current.value = '';
    }
  }

  async function handleDelete(filename: string, type: FileType) {
    if (!confirm(`Eliminare "${filename}"?`)) return;
    const res = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}&type=${type}`, { method: 'DELETE' });
    if (res.ok) {
      setMessage({ type: 'success', text: `"${filename}" eliminato.` });
      await fetchFiles();
    } else {
      setMessage({ type: 'error', text: "Errore eliminazione." });
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] bg-gray-900 flex items-center justify-center -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="text-gray-400">Caricamento...</div>
      </div>
    );
  }

  const singleAudioFiles = audioFiles.filter((f) => !allAlbumFilenames.has(f.name));
  const singleLyricsFiles = lyricsFiles.filter((f) => !allAlbumFilenames.has(f.name));

  return (
    <div className="min-h-[80vh] bg-gray-900 -mx-4 sm:-mx-6 lg:-mx-8">
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
            <Link href="/admin/dashboard" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">← Pannello</Link>
            <Link href="/admin/blog" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">Blog</Link>
          </div>
        </div>

        {/* View selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Sezione</label>
          <div className="flex gap-2 flex-wrap">
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => { setViewMode('album'); setSelectedAlbum(album); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  viewMode === 'album' && selectedAlbum.id === album.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {album.title}
              </button>
            ))}
            <button
              onClick={() => setViewMode('singles')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                viewMode === 'singles'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              Singoli
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border text-sm ${
            message.type === 'success' ? 'bg-green-900/30 border-green-700 text-green-300' : 'bg-red-900/30 border-red-700 text-red-300'
          }`}>
            {message.text}
          </div>
        )}

        {viewMode === 'album' ? (
          <>
            <AlbumStats album={selectedAlbum} audioSet={audioSet} lyricsSet={lyricsSet} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <TrackSection
                title="Audio MP3"
                type="audio"
                tracks={selectedAlbum.tracks}
                existingFiles={audioSet}
                uploading={uploading}
                onUpload={(track) => triggerUpload({ type: 'audio', targetFilename: track.audioUrl.split('/').pop()!, trackTitle: track.title })}
                onUploadNew={() => triggerUpload({ type: 'audio', targetFilename: '', trackTitle: 'nuovo file' })}
                onDelete={(filename) => handleDelete(filename, 'audio')}
              />
              <TrackSection
                title="Testi TTML"
                type="lyrics"
                tracks={selectedAlbum.tracks}
                existingFiles={lyricsSet}
                uploading={uploading}
                onUpload={(track) => triggerUpload({ type: 'lyrics', targetFilename: track.lyricsUrl?.split('/').pop() ?? '', trackTitle: track.title })}
                onUploadNew={() => triggerUpload({ type: 'lyrics', targetFilename: '', trackTitle: 'nuovo file' })}
                onDelete={(filename) => handleDelete(filename, 'lyrics')}
              />
            </div>
          </>
        ) : (
          <SinglesSection
            audioFiles={singleAudioFiles}
            lyricsFiles={singleLyricsFiles}
            onUploadAudio={() => triggerUpload({ type: 'audio', targetFilename: '', trackTitle: 'singolo' })}
            onUploadLyrics={() => triggerUpload({ type: 'lyrics', targetFilename: '', trackTitle: 'singolo' })}
            onDelete={(filename, type) => handleDelete(filename, type)}
            onTrackCreated={() => setMessage({ type: 'success', text: 'Traccia creata. Ora visibile nel player.' })}
          />
        )}
      </div>
    </div>
  );
}

function AlbumStats({ album, audioSet, lyricsSet }: { album: Album; audioSet: Set<string>; lyricsSet: Set<string> }) {
  const total = album.tracks.length;
  const audioCount = album.tracks.filter((t) => audioSet.has(t.audioUrl.split('/').pop() ?? '')).length;
  const lyricsCount = album.tracks.filter((t) => lyricsSet.has(t.lyricsUrl?.split('/').pop() ?? '')).length;
  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        { label: 'Tracce', value: total, color: 'text-white' },
        { label: 'Audio presenti', value: `${audioCount}/${total}`, color: audioCount === total ? 'text-green-400' : 'text-yellow-400' },
        { label: 'Testi presenti', value: `${lyricsCount}/${total}`, color: lyricsCount === total ? 'text-green-400' : 'text-yellow-400' },
      ].map((s) => (
        <div key={s.label} className="bg-gray-800 rounded-xl p-4 text-center">
          <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          <div className="text-gray-400 text-xs mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function TrackSection({ title, type, tracks, existingFiles, uploading, onUpload, onUploadNew, onDelete }: {
  title: string; type: FileType; tracks: Track[]; existingFiles: Set<string>;
  uploading: string | null; onUpload: (t: Track) => void; onUploadNew: () => void; onDelete: (f: string) => void;
}) {
  const getFilename = (t: Track) => (type === 'audio' ? t.audioUrl : t.lyricsUrl)?.split('/').pop() ?? '';
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <button onClick={onUploadNew} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Carica nuovo
        </button>
      </div>
      <div className="space-y-2">
        {tracks.map((track) => {
          const filename = getFilename(track);
          const exists = filename ? existingFiles.has(filename) : false;
          const isUploading = uploading === filename;
          return (
            <div key={track.id} className="flex items-center gap-3 py-2.5 px-3 bg-gray-700/50 rounded-lg group hover:bg-gray-700 transition-colors">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${exists ? 'bg-green-400' : 'bg-red-500'}`} />
              <div className="flex-1 min-w-0">
                <div className="text-gray-300 text-sm truncate">{track.title}</div>
                <div className="text-gray-500 text-xs font-mono truncate">{filename || '—'}</div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {isUploading ? (
                  <svg className="animate-spin h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <button onClick={() => onUpload(track)} className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors border ${exists ? 'border-gray-500 text-gray-300 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-900/20' : 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'}`} title={exists ? 'Sostituisci' : 'Carica'}>
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      {exists ? 'Sostituisci' : 'Carica'}
                    </button>
                    {exists && (
                      <button onClick={() => onDelete(filename)} className="text-gray-600 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100" title="Elimina">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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

function SinglesSection({ audioFiles, lyricsFiles, onUploadAudio, onUploadLyrics, onDelete, onTrackCreated }: {
  audioFiles: BlobFile[]; lyricsFiles: BlobFile[];
  onUploadAudio: () => void; onUploadLyrics: () => void;
  onDelete: (filename: string, type: FileType) => void;
  onTrackCreated: () => void;
}) {
  const [form, setForm] = useState({ title: '', artist: 'Poesong', albumId: albums[0].id, duration: '', audioUrl: '', lyricsUrl: '' });
  const [saving, setSaving] = useState(false);

  async function handleCreate(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/tracks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          artist: form.artist,
          album: albums.find((a) => a.id === form.albumId)?.title ?? '',
          albumId: form.albumId,
          duration: Number(form.duration) || 0,
          audioUrl: form.audioUrl,
          lyricsUrl: form.lyricsUrl || undefined,
        }),
      });
      if (res.ok) {
        setForm({ title: '', artist: 'Poesong', albumId: albums[0].id, duration: '', audioUrl: '', lyricsUrl: '' });
        onTrackCreated();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* File lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {([
          { title: 'Audio MP3', files: audioFiles, type: 'audio' as FileType, onUpload: onUploadAudio },
          { title: 'Testi TTML', files: lyricsFiles, type: 'lyrics' as FileType, onUpload: onUploadLyrics },
        ] as const).map(({ title, files, type, onUpload }) => (
          <div key={type} className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <button onClick={onUpload} className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition-colors">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Carica
              </button>
            </div>
            <div className="space-y-1.5 max-h-60 overflow-y-auto">
              {files.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6">Nessun file caricato</p>
              ) : (
                files.map((f) => (
                  <div key={f.name} className="flex items-center gap-3 py-2 px-3 bg-gray-700/50 rounded-lg group hover:bg-gray-700 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-300 text-sm font-mono truncate">{f.name}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100">
                      <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors text-xs">URL</a>
                      <button onClick={() => onDelete(f.name, type)} className="text-gray-600 hover:text-red-400 transition-colors p-1" title="Elimina">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Crea traccia form */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Crea traccia</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Titolo *</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Nome brano"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Artista</label>
              <input
                value={form.artist}
                onChange={(e) => setForm({ ...form, artist: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Album</label>
              <select
                value={form.albumId}
                onChange={(e) => setForm({ ...form, albumId: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {albums.map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Durata (secondi)</label>
              <input
                type="number"
                min="0"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="es. 213"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">File Audio *</label>
              <select
                required
                value={form.audioUrl}
                onChange={(e) => setForm({ ...form, audioUrl: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">— seleziona MP3 —</option>
                {audioFiles.map((f) => <option key={f.url} value={f.url}>{f.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">File Testo (opzionale)</label>
              <select
                value={form.lyricsUrl}
                onChange={(e) => setForm({ ...form, lyricsUrl: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">— nessuno —</option>
                {lyricsFiles.map((f) => <option key={f.url} value={f.url}>{f.name}</option>)}
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 text-white font-semibold rounded-lg transition-colors"
            >
              {saving ? 'Salvataggio...' : 'Crea traccia'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
