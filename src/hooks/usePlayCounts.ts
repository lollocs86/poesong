'use client';

import { useState, useEffect, useCallback } from 'react';

interface PlayCounts {
  [trackId: string]: number;
}

const STORAGE_VERSION = '2';

export function usePlayCounts() {
  const [counts, setCounts] = useState<PlayCounts>({});

  // Carica i conteggi da localStorage al mount
  useEffect(() => {
    const savedVersion = localStorage.getItem('poesong-play-counts-version');

    if (savedVersion !== STORAGE_VERSION) {
      localStorage.removeItem('poesong-play-counts');
      localStorage.setItem('poesong-play-counts-version', STORAGE_VERSION);
      return;
    }

    const savedCounts = localStorage.getItem('poesong-play-counts');
    if (savedCounts) {
      try {
        setCounts(JSON.parse(savedCounts));
      } catch {
        // Ignora errori di parsing
      }
    }
  }, []);

  // Salva i conteggi in localStorage quando cambiano
  useEffect(() => {
    localStorage.setItem('poesong-play-counts', JSON.stringify(counts));
  }, [counts]);

  const increment = useCallback((trackId: string) => {
    setCounts((prev) => ({
      ...prev,
      [trackId]: (prev[trackId] || 0) + 1,
    }));
  }, []);

  const getPlayCount = useCallback((trackId: string): number => {
    return counts[trackId] || 0;
  }, [counts]);

  return { increment, getPlayCount };
}
