'use client';

import { useEffect, useRef, useState } from 'react';
import { LyricLine } from '@/types';
import { parseLyrics } from '@/lib/parseLyrics';

interface SyncedLyricsProps {
  lyricsUrl?: string;
  lyrics?: LyricLine[];
  currentTime: number;
  isPlaying: boolean;
}

export function SyncedLyrics({ lyricsUrl, lyrics: propLyrics, currentTime, isPlaying }: SyncedLyricsProps) {
  const [lyrics, setLyrics] = useState<LyricLine[]>(propLyrics || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  // Load lyrics from URL if provided
  useEffect(() => {
    if (lyricsUrl) {
      setIsLoading(true);
      setError(null);

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
          setError('Impossibile caricare il testo');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (propLyrics) {
      setLyrics(propLyrics);
    }
  }, [lyricsUrl, propLyrics]);

  // Find current active line
  const activeLineIndex = lyrics.findIndex(
    (line) => currentTime >= line.startTime && currentTime < line.endTime
  );

  // Auto-scroll to active line
  useEffect(() => {
    if (activeLineRef.current && containerRef.current && isPlaying) {
      const container = containerRef.current;
      const activeLine = activeLineRef.current;

      const containerHeight = container.clientHeight;
      const lineTop = activeLine.offsetTop;
      const lineHeight = activeLine.clientHeight;

      // Center the active line in the container
      const scrollPosition = lineTop - containerHeight / 2 + lineHeight / 2;

      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [activeLineIndex, isPlaying]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-white/50">
        <div className="animate-pulse">Caricamento testo...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-white/30">
        {error}
      </div>
    );
  }

  if (lyrics.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-white/30">
        Nessun testo disponibile
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent px-4"
    >
      {/* Gradient overlay top */}
      <div className="sticky top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />

      <div className="py-8 space-y-4">
        {lyrics.map((line, index) => {
          const isActive = index === activeLineIndex;
          const isPast = activeLineIndex > index;

          return (
            <div
              key={index}
              ref={isActive ? activeLineRef : null}
              className={`
                text-center transition-all duration-300 ease-out py-2
                ${isActive
                  ? 'text-white text-2xl font-bold scale-105'
                  : isPast
                    ? 'text-white/30 text-lg'
                    : 'text-white/50 text-lg'
                }
              `}
            >
              {line.text}
            </div>
          );
        })}
      </div>

      {/* Gradient overlay bottom */}
      <div className="sticky bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </div>
  );
}
