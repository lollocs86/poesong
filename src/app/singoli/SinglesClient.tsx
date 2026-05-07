'use client';

import { useEffect, useState } from 'react';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { usePlayCounts } from '@/hooks/usePlayCounts';
import { FixedSubtitleBar } from '@/components/FixedSubtitleBar';
import { FullLyricsModal } from '@/components/FullLyricsModal';
import { Track } from '@/types';

export function SinglesClient() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const { increment, getPlayCount } = usePlayCounts();

  useEffect(() => {
    fetch('/api/tracks')
      .then((r) => r.json())
      .then((all: (Track & { albumId?: string })[]) => {
        setTracks(all.filter((t) => t.albumId === 'singoli'));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const { currentTrack, isPlaying, currentTime, duration, volume, isMuted,
    toggle, seek, setVolume, toggleMute, playTrack, nextTrack, previousTrack, setPlaylist,
  } = useMusicPlayer(tracks, increment);

  useEffect(() => { setPlaylist(tracks); }, [tracks, setPlaylist]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-900">
        <div className="text-gray-400">Caricamento...</div>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-900">
        <p className="text-gray-400">Nessun singolo disponibile.</p>
      </div>
    );
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  function formatTime(s: number) {
    if (!s || isNaN(s)) return '0:00';
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li>/</li>
              <li className="text-white">Singoli</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold text-white mb-2">Singoli</h1>
          <p className="text-white/60 mb-8">{tracks.length} bran{tracks.length === 1 ? 'o' : 'i'}</p>

          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
            {/* Player controls */}
            <div className="px-6 py-5 bg-black/30">
              {currentTrack && (
                <div className="flex items-center gap-4 mb-4">
                  {currentTrack.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={currentTrack.coverUrl} alt={currentTrack.title} className="w-12 h-12 rounded object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded bg-gradient-to-br from-purple-600 to-pink-500 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-white font-medium">{currentTrack.title}</p>
                    <p className="text-white/60 text-sm">{currentTrack.artist}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-4 mb-4">
                <button onClick={previousTrack} className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
                </button>
                <button onClick={toggle} className="w-14 h-14 bg-purple-500 hover:bg-purple-400 rounded-full flex items-center justify-center transition-all hover:scale-105">
                  {isPlaying
                    ? <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    : <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
                </button>
                <button onClick={nextTrack} className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-white/60 w-10 text-right">{formatTime(currentTime)}</span>
                <input type="range" min="0" max={duration || 100} value={currentTime}
                  onChange={(e) => seek(Number(e.target.value))}
                  className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)` }}
                />
                <span className="text-xs text-white/60 w-10">{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-end gap-2 mt-3">
                <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors">
                  {isMuted || volume === 0
                    ? <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/></svg>
                    : <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>}
                </button>
                <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-24 h-1 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, white 0%, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)` }}
                />
              </div>
            </div>

            {/* Track list */}
            <div className="px-4 md:px-6 py-4">
              {tracks.map((track, index) => (
                <div key={track.id} onClick={() => playTrack(track)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                    currentTrack?.id === track.id ? 'bg-white/10 text-purple-400' : 'hover:bg-white/5 text-white/80'
                  }`}>
                  {track.coverUrl
                    ? <img src={track.coverUrl} alt={track.title} className="w-10 h-10 rounded object-cover flex-shrink-0" />
                    : <div className="w-10 h-10 rounded bg-gradient-to-br from-purple-600 to-pink-500 flex-shrink-0 flex items-center justify-center text-white/60 text-xs">{index + 1}</div>}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${currentTrack?.id === track.id ? 'text-purple-400' : ''}`}>{track.title}</p>
                    <p className="text-xs text-white/50">{track.artist}</p>
                  </div>
                  <span className="text-xs text-white/40 ml-2">{getPlayCount(track.id)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {currentTrack?.lyricsUrl && (
        <FixedSubtitleBar lyricsUrl={currentTrack.lyricsUrl} currentTime={currentTime}
          isPlaying={isPlaying} trackTitle={currentTrack.title}
          onLyricsClick={() => setShowFullLyrics(true)} />
      )}
      <FullLyricsModal isOpen={showFullLyrics} onClose={() => setShowFullLyrics(false)}
        lyricsUrl={currentTrack?.lyricsUrl} currentTime={currentTime}
        trackTitle={currentTrack?.title} albumTitle="Singoli" />
    </>
  );
}
