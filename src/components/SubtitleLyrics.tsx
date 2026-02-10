'use client';

import { useEffect, useState } from 'react';
import { LyricLine } from '@/types';
import { parseLyrics } from '@/lib/parseLyrics';

interface SubtitleLyricsProps {
  lyricsUrl?: string;
  currentTime: number;
  isPlaying: boolean;
  onClick?: () => void;
}

export function SubtitleLyrics({ lyricsUrl, currentTime, isPlaying, onClick }: SubtitleLyricsProps) {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLine, setCurrentLine] = useState<string | null>(null);

  // Load lyrics from URL
  useEffect(() => {
    if (!lyricsUrl) {
      setLyrics([]);
      return;
    }

    setIsLoading(true);

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
      })
      .finally(() => {
        setIsLoading(false);
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

  if (isLoading || !lyricsUrl) {
    return null;
  }

  return (
    <div
      className={`relative min-h-[4rem] py-3 flex items-center justify-center ${onClick ? 'cursor-pointer hover:bg-white/5 transition-colors' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-none" />

      {/* Subtitle text */}
      <div className="relative z-10 px-4 md:px-6 text-center max-w-full">
        {currentLine ? (
          <p
            className="text-white text-base md:text-lg lg:text-xl font-medium italic animate-fade-in leading-relaxed"
            key={currentLine}
          >
            <span className="text-orange-400">♪</span>
            {' '}{currentLine}{' '}
            <span className="text-orange-400">♪</span>
          </p>
        ) : isPlaying ? (
          <p className="text-white/40 text-sm">...</p>
        ) : (
          <p className="text-white/40 text-sm">Premi play per i sottotitoli</p>
        )}
        {onClick && (
          <p className="text-white/30 text-xs mt-1">Clicca per il testo completo</p>
        )}
      </div>
    </div>
  );
}
