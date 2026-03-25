'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FixedSubtitleBar } from '@/components/FixedSubtitleBar';
import { FullLyricsModal } from '@/components/FullLyricsModal';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { usePlayCounts } from '@/hooks/usePlayCounts';
import { Track } from '@/types';

const aSandroEAEnzo: Track = {
  id: 'a-sandro-e-a-enzo',
  title: 'A Sandro e a Enzo',
  artist: 'Poesong',
  duration: 167,
  audioUrl: '/audio/a-sandro-e-a-enzo.mp3',
  lyricsUrl: '/lyrics/a-sandro-e-a-enzo.ttml',
};

export function ASandroEAEnzoClient() {
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const { increment, getPlayCount } = usePlayCounts();

  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    toggle,
    seek,
    setVolume,
    toggleMute,
    loadTrack,
    setPlaylist,
  } = useMusicPlayer([aSandroEAEnzo], increment);

  useEffect(() => {
    setPlaylist([aSandroEAEnzo]);
    loadTrack(aSandroEAEnzo);
  }, [setPlaylist, loadTrack]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const playCount = getPlayCount(aSandroEAEnzo.id);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = aSandroEAEnzo.audioUrl;
    link.download = `${aSandroEAEnzo.artist} - ${aSandroEAEnzo.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black pb-24">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20">
          {/* Background Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(circle at center, #004183 0%, #001f4c 50%, transparent 100%)',
              }}
            />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-white/60">
                <li>
                  <a href="/" className="hover:text-white transition-colors">Home</a>
                </li>
                <li>/</li>
                <li className="text-white">A Sandro e a Enzo</li>
              </ol>
            </nav>

            {/* Music Player */}
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Track Header */}
              <div className="relative p-6 md:p-8 bg-gradient-to-b from-violet-900/50 to-transparent">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                  <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-lg overflow-hidden shadow-2xl flex-shrink-0">
                    <Image
                      src="/images/a-sandro-e-a-enzo.jpg"
                      alt="Sandro ed Enzo"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-sm font-medium text-white/70 uppercase tracking-wider">Brano</p>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mt-2">{aSandroEAEnzo.title}</h1>
                    <p className="text-lg text-white/80 mt-2">{aSandroEAEnzo.artist}</p>
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                      <button
                        onClick={toggle}
                        className="w-16 h-16 bg-orange-500 hover:bg-orange-400 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-lg"
                        aria-label={isPlaying ? 'Pausa' : 'Riproduci'}
                      >
                        {isPlaying ? (
                          <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                          </svg>
                        ) : (
                          <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="p-4 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        title="Scarica MP3"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-white/50 mt-3">{playCount} riproduzioni</p>
                  </div>
                </div>
              </div>

              {/* Player Controls */}
              <div className="px-6 md:px-8 py-4 bg-black/30">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/60 w-10 text-right">{formatTime(currentTime)}</span>
                  <div className="flex-1 relative group">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={(e) => seek(Number(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:group-hover:opacity-100 [&::-webkit-slider-thumb]:transition-opacity"
                      style={{ background: `linear-gradient(to right, #f97316 0%, #f97316 ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)` }}
                    />
                  </div>
                  <span className="text-xs text-white/60 w-10">{formatTime(duration)}</span>
                </div>

                <div className="flex items-center justify-end gap-2 mt-3">
                  <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors" aria-label={isMuted ? 'Attiva audio' : 'Muta'}>
                    {isMuted || volume === 0 ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    ) : volume < 0.5 ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    style={{ background: `linear-gradient(to right, white 0%, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)` }}
                  />
                </div>
              </div>
            </div>

            {/* Track Description */}
            <div className="mt-12 text-center">
              <p className="text-white/70 max-w-2xl mx-auto leading-relaxed italic">
                Vi tengo stretti stretti al cuore mio in un addio lanciato d&apos;altra sponda.
              </p>
              <p className="text-white/70 max-w-2xl mx-auto leading-relaxed mt-4">
                Una poesong dedicata agli amici Sandro ed Enzo, un viaggio attraverso la Sila,
                i suoi boschi e la sua natura selvaggia. Un addio che diventa abbraccio,
                tra rovi, arbusti, laghi d&apos;altopiano e gli animali che popolano la foresta.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Fixed Subtitle Bar - Always visible at bottom */}
      {currentTrack && currentTrack.lyricsUrl && (
        <FixedSubtitleBar
          lyricsUrl={currentTrack.lyricsUrl}
          currentTime={currentTime}
          isPlaying={isPlaying}
          trackTitle={currentTrack.title}
          onLyricsClick={() => setShowFullLyrics(true)}
        />
      )}

      {/* Full Lyrics Modal */}
      <FullLyricsModal
        isOpen={showFullLyrics}
        onClose={() => setShowFullLyrics(false)}
        lyricsUrl={currentTrack?.lyricsUrl}
        currentTime={currentTime}
        trackTitle={currentTrack?.title}
        albumTitle="A Sandro e a Enzo"
      />
    </>
  );
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds === 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
