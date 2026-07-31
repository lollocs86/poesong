'use client';

import { useState } from 'react';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { usePlayCounts } from '@/hooks/usePlayCounts';
import { FixedSubtitleBar } from '@/components/FixedSubtitleBar';
import { FullLyricsModal } from '@/components/FullLyricsModal';
import { Track } from '@/types';
import { ExtraTrack } from '@/lib/tracks';

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds === 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function extraToTrack(t: ExtraTrack): Track {
  return {
    id: t.id,
    title: t.title,
    artist: t.artist,
    album: t.album,
    duration: t.duration,
    audioUrl: t.audioUrl,
    coverUrl: t.coverUrl,
    lyricsUrl: t.lyricsUrl,
  };
}

export function SingleTrackClient({ track: extraTrack }: { track: ExtraTrack }) {
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const { increment, getPlayCount } = usePlayCounts();

  const track = extraToTrack(extraTrack);
  const tracks = [track];

  const { currentTrack, isPlaying, currentTime, duration, volume, isMuted,
    toggle, seek, setVolume, toggleMute,
  } = useMusicPlayer(tracks, increment);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const playCount = getPlayCount(track.id);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li>/</li>
              <li><a href="/singoli" className="hover:text-white transition-colors">Singoli</a></li>
              <li>/</li>
              <li className="text-white truncate">{track.title}</li>
            </ol>
          </nav>

          {/* Cover + Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-8">
            <div className="w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl">
              {track.coverUrl
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-500" />}
            </div>
            <div className="text-center sm:text-left">
              <p className="text-white/50 text-sm uppercase tracking-widest mb-1">Singolo</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{track.title}</h1>
              <p className="text-white/70 text-lg">{track.artist}</p>
              {track.duration > 0 && (
                <p className="text-white/40 text-sm mt-1">{formatTime(track.duration)}</p>
              )}
            </div>
          </div>

          {/* Player */}
          <div className="bg-black/30 rounded-2xl px-6 py-5 mb-6">
            {/* Play/Pause */}
            <div className="flex items-center justify-center mb-4">
              <button
                onClick={toggle}
                className="w-16 h-16 bg-purple-500 hover:bg-purple-400 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-lg"
              >
                {isPlaying
                  ? <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  : <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
              </button>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-white/60 w-10 text-right">{formatTime(currentTime)}</span>
              <input
                type="range" min="0" max={duration || 100} value={currentTime}
                onChange={(e) => seek(Number(e.target.value))}
                className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)` }}
              />
              <span className="text-xs text-white/60 w-10">{formatTime(duration)}</span>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-end gap-2">
              <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors">
                {isMuted || volume === 0
                  ? <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/></svg>
                  : <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>}
              </button>
              <input
                type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-24 h-1 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, white 0%, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)` }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center gap-1 text-white/40 text-sm ml-auto">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              {playCount} {playCount === 1 ? 'riproduzione' : 'riproduzioni'}
            </span>
          </div>

          {/* Back link */}
          <a href="/singoli" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            Tutti i singoli
          </a>
        </div>
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
        albumTitle="Singoli"
      />
    </>
  );
}
