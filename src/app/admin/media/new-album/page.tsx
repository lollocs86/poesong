'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface TrackRow {
  id: string;
  title: string;
  audioUrl: string;
  audioFilename: string;
  lyricsUrl: string;
  lyricsFilename: string;
}

interface UploadTarget {
  trackId: string;
  type: 'album-audio' | 'album-lyrics';
}

function newTrack(): TrackRow {
  return { id: crypto.randomUUID(), title: '', audioUrl: '', audioFilename: '', lyricsUrl: '', lyricsFilename: '' };
}

export default function NewAlbumPage() {
  const router = useRouter();
  const [meta, setMeta] = useState({ title: '', artist: 'Poesong', year: new Date().getFullYear(), description: '' });
  const [coverUrl, setCoverUrl] = useState('');
  const [tracks, setTracks] = useState<TrackRow[]>([newTrack()]);
  const [uploadingFor, setUploadingFor] = useState<UploadTarget | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioInputRef = useRef<HTMLInputElement>(null);
  const lyricsInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const pendingUpload = useRef<UploadTarget | null>(null);

  useEffect(() => {
    fetch('/api/auth').then((r) => r.json()).then(({ authenticated }) => {
      if (!authenticated) router.push('/admin');
    });
  }, [router]);

  function addTrack() {
    setTracks((prev) => [...prev, newTrack()]);
  }

  function removeTrack(id: string) {
    setTracks((prev) => prev.filter((t) => t.id !== id));
  }

  function updateTrackTitle(id: string, title: string) {
    setTracks((prev) => prev.map((t) => t.id === id ? { ...t, title } : t));
  }

  function triggerUpload(target: UploadTarget) {
    pendingUpload.current = target;
    setUploadingFor(target);
    if (target.type === 'album-audio') audioInputRef.current?.click();
    else lyricsInputRef.current?.click();
  }

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>, inputType: 'audio' | 'lyrics') {
    const file = e.target.files?.[0];
    const target = pendingUpload.current;
    if (!file || !target) return;

    const fd = new FormData();
    fd.append('file', file);
    fd.append('type', target.type);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setTracks((prev) => prev.map((t) => {
          if (t.id !== target.trackId) return t;
          if (inputType === 'audio') return { ...t, audioUrl: data.url, audioFilename: data.filename };
          return { ...t, lyricsUrl: data.url, lyricsFilename: data.filename };
        }));
      } else {
        setError(data.error || 'Errore caricamento file.');
      }
    } catch (err) {
      setError(`Errore: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setUploadingFor(null);
      pendingUpload.current = null;
      if (audioInputRef.current) audioInputRef.current.value = '';
      if (lyricsInputRef.current) lyricsInputRef.current.value = '';
    }
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('type', 'images');
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) setCoverUrl(data.url);
      else setError(data.error || 'Errore copertina.');
    } finally {
      setUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = '';
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const validTracks = tracks.filter((t) => t.title.trim() && t.audioUrl);
    if (validTracks.length === 0) {
      setError('Aggiungi almeno una traccia con titolo e MP3.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: meta.title,
        artist: meta.artist,
        releaseYear: meta.year || undefined,
        description: meta.description || undefined,
        coverUrl: coverUrl || undefined,
        tracks: validTracks.map((t, i) => ({
          id: `${Date.now()}-${i}`,
          title: t.title,
          duration: 0,
          audioUrl: t.audioUrl,
          lyricsUrl: t.lyricsUrl || undefined,
        })),
      };

      const res = await fetch('/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        router.push(`/admin/media?albumCreated=${encodeURIComponent(data.title)}`);
      } else {
        setError(data.error || 'Errore creazione album.');
      }
    } catch (err) {
      setError(`Errore: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-[80vh] bg-gray-900 -mx-4 sm:-mx-6 lg:-mx-8">
      <input ref={audioInputRef} type="file" accept=".mp3" className="sr-only" onChange={(e) => handleFileSelected(e, 'audio')} />
      <input ref={lyricsInputRef} type="file" accept=".ttml" className="sr-only" onChange={(e) => handleFileSelected(e, 'lyrics')} />
      <input ref={coverInputRef} type="file" accept=".jpg,.jpeg,.png,.webp,.gif" className="sr-only" onChange={handleCoverUpload} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Nuovo Album</h1>
            <p className="text-gray-400 text-sm mt-1">Crea un nuovo album con tracce e testi</p>
          </div>
          <button
            onClick={() => router.push('/admin/media')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
          >
            ← Indietro
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-700 text-red-300 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Album metadata */}
          <div className="bg-gray-800 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white mb-2">Informazioni album</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Titolo *</label>
                <input
                  required
                  value={meta.title}
                  onChange={(e) => setMeta({ ...meta, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome album"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Artista</label>
                <input
                  value={meta.artist}
                  onChange={(e) => setMeta({ ...meta, artist: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Anno</label>
                <input
                  type="number"
                  value={meta.year}
                  onChange={(e) => setMeta({ ...meta, year: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1900" max="2099"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Copertina</label>
                <div className="flex items-center gap-3">
                  {coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={coverUrl} alt="cover" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded bg-gray-700 border border-gray-600 flex items-center justify-center flex-shrink-0">
                      <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    disabled={uploadingCover}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 text-sm hover:border-blue-500 transition-colors text-left disabled:opacity-50"
                  >
                    {uploadingCover ? 'Caricamento...' : coverUrl ? 'Cambia immagine' : 'Carica copertina'}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Descrizione</label>
              <textarea
                value={meta.description}
                onChange={(e) => setMeta({ ...meta, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Descrizione dell'album (opzionale)"
              />
            </div>
          </div>

          {/* Tracks */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Tracce ({tracks.length})</h2>
            </div>

            <div className="space-y-3">
              {tracks.map((track, index) => {
                const isUploadingAudio = uploadingFor?.trackId === track.id && uploadingFor.type === 'album-audio';
                const isUploadingLyrics = uploadingFor?.trackId === track.id && uploadingFor.type === 'album-lyrics';
                return (
                  <div key={track.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-gray-500 text-sm font-mono w-6 flex-shrink-0">{index + 1}.</span>
                      <input
                        value={track.title}
                        onChange={(e) => updateTrackTitle(track.id, e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Titolo traccia"
                      />
                      {tracks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTrack(track.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors p-1 flex-shrink-0"
                          title="Rimuovi traccia"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {/* MP3 */}
                      <button
                        type="button"
                        disabled={isUploadingAudio}
                        onClick={() => triggerUpload({ trackId: track.id, type: 'album-audio' })}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          track.audioUrl
                            ? 'bg-green-900/40 border border-green-700 text-green-400 hover:bg-green-900/60'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        } disabled:opacity-50`}
                      >
                        {isUploadingAudio ? (
                          <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                        ) : track.audioUrl ? (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        )}
                        {isUploadingAudio ? 'Caricamento...' : track.audioFilename || 'Carica MP3'}
                      </button>

                      {/* TTML */}
                      <button
                        type="button"
                        disabled={isUploadingLyrics}
                        onClick={() => triggerUpload({ trackId: track.id, type: 'album-lyrics' })}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          track.lyricsUrl
                            ? 'bg-green-900/40 border border-green-700 text-green-400 hover:bg-green-900/60'
                            : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                        } disabled:opacity-50`}
                      >
                        {isUploadingLyrics ? (
                          <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                        ) : track.lyricsUrl ? (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        )}
                        {isUploadingLyrics ? 'Caricamento...' : track.lyricsFilename || 'Carica TTML (opzionale)'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={addTrack}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors w-full justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Aggiungi traccia
            </button>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pb-8">
            <button
              type="button"
              onClick={() => router.push('/admin/media')}
              className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 text-white font-semibold rounded-lg transition-colors"
            >
              {saving ? 'Salvataggio...' : 'Crea Album'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
