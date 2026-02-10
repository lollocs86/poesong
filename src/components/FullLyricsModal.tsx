'use client';

import { useEffect, useState, useRef } from 'react';
import { LyricLine } from '@/types';
import { parseLyrics } from '@/lib/parseLyrics';

interface FullLyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lyricsUrl?: string;
  currentTime: number;
  trackTitle?: string;
  albumTitle?: string;
}

export function FullLyricsModal({
  isOpen,
  onClose,
  lyricsUrl,
  currentTime,
  trackTitle,
  albumTitle,
}: FullLyricsModalProps) {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const activeLineRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load lyrics
  useEffect(() => {
    if (!lyricsUrl || !isOpen) return;

    setIsLoading(true);
    fetch(lyricsUrl)
      .then((res) => res.text())
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
  }, [lyricsUrl, isOpen]);

  // Find current active line index
  const activeLineIndex = lyrics.findIndex(
    (line) => currentTime >= line.startTime && currentTime < line.endTime
  );

  // Auto-scroll to active line
  useEffect(() => {
    if (activeLineRef.current && containerRef.current && isOpen) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeLineIndex, isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/98 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
        aria-label="Chiudi"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <div className="absolute top-6 left-6 z-10">
        {trackTitle && (
          <h2 className="text-xl md:text-2xl font-semibold text-white/90">
            &ldquo;{trackTitle}&rdquo;
          </h2>
        )}
        {albumTitle && (
          <p className="text-sm text-white/50 mt-1">{albumTitle} album</p>
        )}
      </div>

      {/* Lyrics content */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto pt-24 pb-16 px-6 md:px-12 lg:px-24"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/50 animate-pulse">Caricamento...</p>
          </div>
        ) : lyrics.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-white/30">Nessun testo disponibile</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            {lyrics.map((line, index) => {
              const isActive = index === activeLineIndex;
              const isPast = activeLineIndex > -1 && index < activeLineIndex;

              return (
                <p
                  key={index}
                  ref={isActive ? activeLineRef : null}
                  className={`
                    text-2xl md:text-3xl lg:text-4xl font-semibold italic leading-relaxed transition-all duration-500
                    ${isActive
                      ? 'text-white'
                      : isPast
                        ? 'text-white/30'
                        : 'text-white/50'
                    }
                  `}
                >
                  {line.text}
                </p>
              );
            })}
          </div>
        )}
      </div>

      {/* Hint at bottom */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-white/30 text-sm">Clicca ovunque o premi ESC per chiudere</p>
      </div>
    </div>
  );
}
