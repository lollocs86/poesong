'use client';

import { useState } from 'react';
import { FixedSubtitleBar } from '@/components/FixedSubtitleBar';
import { FullLyricsModal } from '@/components/FullLyricsModal';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { usePlayCounts } from '@/hooks/usePlayCounts';
import { Track } from '@/types';
import { DynamicAlbum } from '@/lib/dynamic-albums';

function formatTime(s: number): string {
  if (isNaN(s) || s === 0) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

function albumToTracks(album: DynamicAlbum): Track[] {
  return album.tracks.map((t) => ({
    id: t.id,
    title: t.title,
    artist: album.artist,
    album: album.title,
    duration: t.duration,
    audioUrl: t.audioUrl,
    lyricsUrl: t.lyricsUrl,
    coverUrl: album.coverUrl,
  }));
}

export function DynamicAlbumClient({ album }: { album: DynamicAlbum }) {
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const { increment, getPlayCount } = usePlayCounts();

  const tracks = albumToTracks(album);

  const { currentTrack, isPlaying, currentTime, duration, volume, isMuted,
    toggle, seek, setVolume, toggleMute, playTrack, nextTrack, previousTrack,
  } = useMusicPlayer(tracks, increment);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black pb-24">
        <section className="relative py-12 md:py-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at center, #1e3a5f 0%, #0a1628 50%, transparent 100%)' }} />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-white/60">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li>/</li>
                <li><a href="/album" className="hover:text-white transition-colors">Album</a></li>
                <li>/</li>
                <li className="text-white">{album.title}</li>
              </ol>
            </nav>

            {/* Album header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-10">
              <div className="w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl">
                {album.coverUrl
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={album.coverUrl} alt={album.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-gradient-to-br from-blue-700 to-indigo-900" />}
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white/50 text-sm uppercase tracking-widest mb-1">Album{album.releaseYear ? ` · ${album.releaseYear}` : ''}</p>
                <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">{album.title}</h1>
                <p className="text-white/70 text-lg">{album.artist}</p>
                <p className="text-white/40 text-sm mt-1">{tracks.length} bran{tracks.length === 1 ? 'o' : 'i'}</p>
              </div>
            </div>

            {/* Player controls */}
            <div className="bg-black/30 rounded-2xl px-6 py-5 mb-6">
              {currentTrack && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-700 to-indigo-900 flex-shrink-0 overflow-hidden">
                    {album.coverUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={album.coverUrl} alt={currentTrack.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{currentTrack.title}</p>
                    <p className="text-white/60 text-xs">{album.artist}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-4 mb-4">
                <button onClick={previousTrack} className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
                </button>
                <button onClick={toggle} className="w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all hover:scale-105">
                  {isPlaying
                    ? <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    : <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
                </button>
                <button onClick={nextTrack} className="text-white/70 hover:text-white transition-colors">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                </button>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-white/60 w-10 text-right">{formatTime(currentTime)}</span>
                <input type="range" min="0" max={duration || 100} value={currentTime}
                  onChange={(e) => seek(Number(e.target.value))}
                  className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)` }}
                />
                <span className="text-xs text-white/60 w-10">{formatTime(duration)}</span>
              </div>

              <div className="flex items-center justify-end gap-2">
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
            <div className="bg-black/20 rounded-2xl overflow-hidden">
              {tracks.map((track, index) => {
                const isCurrent = currentTrack?.id === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors group ${
                      isCurrent ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="w-8 text-center flex-shrink-0">
                      {isCurrent && isPlaying ? (
                        <div className="flex items-center justify-center gap-[2px] h-4">
                          <span className="w-[3px] h-full bg-blue-400 rounded-full animate-[equalizer_0.5s_ease-in-out_infinite_alternate]" />
                          <span className="w-[3px] h-full bg-blue-400 rounded-full animate-[equalizer_0.5s_ease-in-out_infinite_alternate_0.2s]" />
                          <span className="w-[3px] h-full bg-blue-400 rounded-full animate-[equalizer_0.5s_ease-in-out_infinite_alternate_0.4s]" />
                        </div>
                      ) : (
                        <span className={`text-sm ${isCurrent ? 'text-blue-400' : 'text-white/40 group-hover:text-white/70'}`}>{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isCurrent ? 'text-blue-400' : 'text-white/80'}`}>{track.title}</p>
                      <p className="text-xs text-white/40 truncate">{album.artist}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        {getPlayCount(track.id)}
                      </span>
                      <span className="text-xs text-white/40 w-10 text-right">{formatTime(track.duration)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {album.description && (
              <div className="mt-12 text-center">
                <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">{album.description}</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {currentTrack?.lyricsUrl && (
        <FixedSubtitleBar
          lyricsUrl={currentTrack.lyricsUrl}
          currentTime={currentTime}
          isPlaying={isPlaying}
          trackTitle={currentTrack.title}
          onLyricsClick={() => setShowFullLyrics(true)}
        />
      )}
      <FullLyricsModal
        isOpen={showFullLyrics}
        onClose={() => setShowFullLyrics(false)}
        lyricsUrl={currentTrack?.lyricsUrl}
        currentTime={currentTime}
        trackTitle={currentTrack?.title}
        albumTitle={album.title}
      />
    </>
  );
}
