'use client';

import { useState, useEffect, useCallback } from 'react';

export type VoteType = 'like' | 'dislike' | null;

interface UserVotes {
  [trackId: string]: VoteType;
}

interface VoteCounts {
  [trackId: string]: {
    likes: number;
    dislikes: number;
  };
}

// Versione per resettare localStorage quando cambiano i dati
const STORAGE_VERSION = '3';

export function useVotes() {
  const [userVotes, setUserVotes] = useState<UserVotes>({});
  const [counts, setCounts] = useState<VoteCounts>({});

  // Carica i voti da localStorage al mount
  useEffect(() => {
    const savedVersion = localStorage.getItem('poesong-votes-version');

    // Se la versione è diversa, resetta tutto
    if (savedVersion !== STORAGE_VERSION) {
      localStorage.removeItem('poesong-user-votes');
      localStorage.removeItem('poesong-vote-counts');
      localStorage.removeItem('poesong-votes'); // vecchia chiave
      localStorage.setItem('poesong-votes-version', STORAGE_VERSION);
      return;
    }

    const savedUserVotes = localStorage.getItem('poesong-user-votes');
    const savedCounts = localStorage.getItem('poesong-vote-counts');

    if (savedUserVotes) {
      try {
        setUserVotes(JSON.parse(savedUserVotes));
      } catch {
        // Ignora errori di parsing
      }
    }

    if (savedCounts) {
      try {
        setCounts(JSON.parse(savedCounts));
      } catch {
        // Ignora errori di parsing
      }
    }
  }, []);

  // Salva i voti in localStorage quando cambiano
  useEffect(() => {
    localStorage.setItem('poesong-user-votes', JSON.stringify(userVotes));
  }, [userVotes]);

  useEffect(() => {
    localStorage.setItem('poesong-vote-counts', JSON.stringify(counts));
  }, [counts]);

  const vote = useCallback((trackId: string, voteType: VoteType) => {
    setUserVotes((prevVotes) => {
      const currentVote = prevVotes[trackId];

      // Aggiorna i conteggi
      setCounts((prevCounts) => {
        const trackCounts = prevCounts[trackId] || { likes: 0, dislikes: 0 };
        let newLikes = trackCounts.likes;
        let newDislikes = trackCounts.dislikes;

        // Rimuovi il voto precedente se esiste
        if (currentVote === 'like') {
          newLikes = Math.max(0, newLikes - 1);
        } else if (currentVote === 'dislike') {
          newDislikes = Math.max(0, newDislikes - 1);
        }

        // Se non stiamo rimuovendo il voto (toggle), aggiungi il nuovo
        if (currentVote !== voteType) {
          if (voteType === 'like') {
            newLikes += 1;
          } else if (voteType === 'dislike') {
            newDislikes += 1;
          }
        }

        return {
          ...prevCounts,
          [trackId]: { likes: newLikes, dislikes: newDislikes },
        };
      });

      // Se l'utente clicca sullo stesso voto, lo rimuove
      if (currentVote === voteType) {
        const { [trackId]: _, ...rest } = prevVotes;
        return rest;
      }
      return { ...prevVotes, [trackId]: voteType };
    });
  }, []);

  const getVote = useCallback((trackId: string): VoteType => {
    return userVotes[trackId] || null;
  }, [userVotes]);

  const getCounts = useCallback((trackId: string): { likes: number; dislikes: number } => {
    return counts[trackId] || { likes: 0, dislikes: 0 };
  }, [counts]);

  return { vote, getVote, getCounts };
}
