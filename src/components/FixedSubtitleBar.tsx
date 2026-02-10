'use client';

import { useEffect, useState } from 'react';
import { LyricLine } from '@/types';
import { parseLyrics } from '@/lib/parseLyrics';

interface FixedSubtitleBarProps {
  lyricsUrl?: string;
  currentTime: number;
  isPlaying: boolean;
  trackTitle?: string;
  onClose?: () => void;
  onLyricsClick?: () => void;
}

export function FixedSubtitleBar({
  lyricsUrl,
  currentTime,
  isPlaying,
  trackTitle,
  onClose,
  onLyricsClick
}: FixedSubtitleBarProps) {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLine, setCurrentLine] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Load lyrics from URL
  useEffect(() => {
    if (!lyricsUrl) {
      setLyrics([]);
      return;
    }

    fetch(lyricsUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load lyrics');
        return res.text();
      })
      .then((content) => {
        const parsed = parseLyrics(content);
        setLyrics(parsed);
      })
      .catch((err) => {
        console.error('Error loading lyrics:', err);
        setLyrics([]);
      });
  }, [lyricsUrl]);

  // Find current line based on time
  useEffect(() => {
    if (lyrics.length === 0) {
      setCurrentLine(null);
      return;
    }

    const activeLine = lyrics.find(
      (line) => currentTime >= line.startTime && currentTime < line.endTime
    );

    setCurrentLine(activeLine?.text || null);
  }, [lyrics, currentTime]);

  // Don't show if no lyrics URL or user closed it
  if (!lyricsUrl || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-inset-bottom">
      {/* Background with blur */}
      <div className="relative bg-black/95 backdrop-blur-md border-t border-white/10">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-1 text-white/40 hover:text-white transition-colors"
          aria-label="Chiudi sottotitoli"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Track info */}
        {trackTitle && (
          <div className="text-center pt-2 pb-1">
            <p className="text-xs text-white/50 truncate px-8">
              {isPlaying ? '▶ ' : '⏸ '}{trackTitle}
            </p>
          </div>
        )}

        {/* Subtitle text */}
        <div
          className={`px-4 md:px-8 py-3 md:py-4 text-center ${onLyricsClick ? 'cursor-pointer hover:bg-white/5 transition-colors' : ''}`}
          onClick={onLyricsClick}
          role={onLyricsClick ? 'button' : undefined}
          tabIndex={onLyricsClick ? 0 : undefined}
          onKeyDown={onLyricsClick ? (e) => e.key === 'Enter' && onLyricsClick() : undefined}
        >
          {currentLine ? (
            <p
              className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium italic leading-relaxed animate-fade-in"
              key={currentLine}
            >
              <span className="text-orange-400">♪</span>
              {' '}{currentLine}{' '}
              <span className="text-orange-400">♪</span>
            </p>
          ) : isPlaying ? (
            <p className="text-white/30 text-base">♪ ♪ ♪</p>
          ) : (
            <p className="text-white/30 text-sm">In attesa...</p>
          )}
          {onLyricsClick && (
            <p className="text-white/30 text-xs mt-1">Clicca per il testo completo</p>
          )}
        </div>
      </div>
    </div>
  );
}
