export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  audioUrl: string;
  coverUrl?: string;
  lyricsUrl?: string; // URL to TTML/LRC file for synced lyrics
  lyricsDocUrl?: string; // URL to Google Docs with formatted lyrics
  driveUrl?: string; // URL to Google Drive file
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseYear?: number;
  tracks: Track[];
  description?: string;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
}

// Synced lyrics types
export interface LyricLine {
  startTime: number; // in seconds
  endTime: number;   // in seconds
  text: string;
}

export interface SyncedLyrics {
  trackId: string;
  lines: LyricLine[];
}
