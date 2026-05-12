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
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const { increment, getPlayCount } = usePlayCounts();

  const track = extraToTrack(extraTrack);
  const tracks = [track];

  const { currentTrack, isPlaying, currentTime, duration, volume, isMuted,
    toggle, seek, setVolume, toggleMute,
  } = useMusicPlayer(tracks, increment);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const shareUrl = `https://poesong.it/singoli/${track.id}`;
  const shareText = `Ascolta "${track.title}" di ${track.artist} su PoeSong`;
  const playCount = getPlayCount(track.id);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = track.audioUrl;
    link.download = `${track.artist} - ${track.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(`${track.title} - ${track.artist}`)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
  };

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
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
              Scarica MP3
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
              Condividi
            </button>
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

      {/* Share modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowShareModal(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Condividi traccia</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                {track.coverUrl
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
                  : <svg className="w-8 h-8 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>}
              </div>
              <p className="text-xl text-gray-700">&quot;{track.title}&quot;</p>
            </div>
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">URL</label>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                <input type="text" readOnly value={shareUrl} className="flex-1 bg-transparent text-gray-600 text-sm outline-none truncate" />
                <button onClick={handleCopy} className="flex-shrink-0 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors">
                  {copied ? 'Copiato!' : 'Copia'}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-14 h-14 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="Facebook">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-14 h-14 flex items-center justify-center text-green-500 hover:bg-green-50 rounded-full transition-colors" title="WhatsApp">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-14 h-14 flex items-center justify-center text-gray-800 hover:bg-gray-100 rounded-full transition-colors" title="X">
                <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={shareLinks.email} className="w-14 h-14 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded-full transition-colors" title="Email">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
