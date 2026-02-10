'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Track } from '@/types';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { useVotes } from '@/hooks/useVotes';
import { usePlayCounts } from '@/hooks/usePlayCounts';
import { SyncedLyrics } from './SyncedLyrics';
import { SubtitleLyrics } from './SubtitleLyrics';
import { VoteButtons } from './VoteButtons';
import { FullLyricsModal } from './FullLyricsModal';

interface MusicPlayerProps {
  tracks: Track[];
  albumCover?: string;
  albumTitle?: string;
  albumArtist?: string;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds === 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function MusicPlayer({ tracks, albumCover, albumTitle, albumArtist }: MusicPlayerProps) {
  const [activeTab, setActiveTab] = useState<'tracks' | 'lyrics'>('tracks');
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const { vote, getVote, getCounts } = useVotes();
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
    playTrack,
    nextTrack,
    previousTrack,
    setPlaylist,
  } = useMusicPlayer(tracks, increment);

  useEffect(() => {
    setPlaylist(tracks);
  }, [tracks, setPlaylist]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
      {/* Album Header */}
      <div className="relative p-6 md:p-8 bg-gradient-to-b from-violet-900/50 to-transparent">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          {/* Album Cover */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-lg overflow-hidden shadow-2xl flex-shrink-0">
            {albumCover ? (
              <Image
                src={albumCover}
                alt={albumTitle || 'Album cover'}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-violet-600 to-orange-500 flex items-center justify-center">
                <svg className="w-20 h-20 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>
            )}
          </div>

          {/* Album Info */}
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-white/70 uppercase tracking-wider">Album</p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-2">{albumTitle || 'Album'}</h1>
            <p className="text-lg text-white/80 mt-2">{albumArtist || 'Artista'}</p>
            <p className="text-sm text-white/60 mt-1">{tracks.length} brani</p>
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="px-6 md:px-8 py-4 bg-black/30">
        {/* Now Playing */}
        {currentTrack && (
          <div className="text-center mb-4">
            <p className="text-white font-medium">{currentTrack.title}</p>
            <p className="text-white/60 text-sm">{currentTrack.artist}</p>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 md:gap-6">
          {/* Previous */}
          <button
            onClick={previousTrack}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Traccia precedente"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={toggle}
            className="w-14 h-14 bg-orange-500 hover:bg-orange-400 rounded-full flex items-center justify-center transition-all hover:scale-105"
            aria-label={isPlaying ? 'Pausa' : 'Riproduci'}
          >
            {isPlaying ? (
              <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Next */}
          <button
            onClick={nextTrack}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Traccia successiva"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-xs text-white/60 w-10 text-right">{formatTime(currentTime)}</span>
          <div className="flex-1 relative group">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-3
                [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:opacity-0
                [&::-webkit-slider-thumb]:group-hover:opacity-100
                [&::-webkit-slider-thumb]:transition-opacity"
              style={{
                background: `linear-gradient(to right, #f97316 0%, #f97316 ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`,
              }}
            />
          </div>
          <span className="text-xs text-white/60 w-10">{formatTime(duration)}</span>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-end gap-2 mt-3">
          <button
            onClick={toggleMute}
            className="text-white/60 hover:text-white transition-colors"
            aria-label={isMuted ? 'Attiva audio' : 'Muta'}
          >
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
            className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white"
            style={{
              background: `linear-gradient(to right, white 0%, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`,
            }}
          />
        </div>
      </div>

      {/* Live Subtitles - Always visible when playing */}
      {currentTrack && currentTrack.lyricsUrl && (
        <SubtitleLyrics
          lyricsUrl={currentTrack.lyricsUrl}
          currentTime={currentTime}
          isPlaying={isPlaying}
          onClick={() => setShowFullLyrics(true)}
        />
      )}

      {/* Full Lyrics Modal */}
      <FullLyricsModal
        isOpen={showFullLyrics}
        onClose={() => setShowFullLyrics(false)}
        lyricsUrl={currentTrack?.lyricsUrl}
        currentTime={currentTime}
        trackTitle={currentTrack?.title}
        albumTitle={albumTitle}
      />

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('tracks')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'tracks'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Brani
        </button>
        <button
          onClick={() => setActiveTab('lyrics')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'lyrics'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Testo completo
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'tracks' ? (
          /* Track List */
          <div className="px-4 md:px-8 py-4">
            <div className="space-y-1">
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg transition-colors ${
                    currentTrack?.id === track.id
                      ? 'bg-white/10 text-orange-500'
                      : 'hover:bg-white/5 text-white/80 hover:text-white'
                  }`}
                >
                  {/* Track Number or Playing Animation */}
                  <div className="w-6 text-center flex-shrink-0">
                    {currentTrack?.id === track.id && isPlaying ? (
                      <div className="flex items-end justify-center gap-0.5 h-4">
                        <span className="w-1 bg-orange-500 animate-[equalizer_0.5s_ease-in-out_infinite]" style={{ height: '60%' }} />
                        <span className="w-1 bg-orange-500 animate-[equalizer_0.5s_ease-in-out_infinite_0.1s]" style={{ height: '100%' }} />
                        <span className="w-1 bg-orange-500 animate-[equalizer_0.5s_ease-in-out_infinite_0.2s]" style={{ height: '40%' }} />
                      </div>
                    ) : (
                      <span className="text-sm text-white/40">{index + 1}</span>
                    )}
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 text-left min-w-0">
                    <p className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-orange-500' : ''}`}>
                      {track.title}
                    </p>
                    <p className="text-sm text-white/50 truncate">{track.artist}</p>
                  </div>

                  {/* Lyrics indicator */}
                  {track.lyricsUrl && (
                    <span className="text-xs text-white/40 px-2 py-1 bg-white/5 rounded">
                      Testo
                    </span>
                  )}

                  {/* Play Count */}
                  <span className="text-xs text-white/40 flex-shrink-0" title="Riproduzioni">
                    <span className="inline-flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      {getPlayCount(track.id)}
                    </span>
                  </span>

                  {/* Duration */}
                  <span className="text-sm text-white/40 flex-shrink-0">
                    {formatTime(track.duration)}
                  </span>

                  {/* Vote Buttons */}
                  <VoteButtons
                    trackId={track.id}
                    currentVote={getVote(track.id)}
                    onVote={vote}
                    likes={getCounts(track.id).likes}
                    dislikes={getCounts(track.id).dislikes}
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Lyrics View */
          <div className="py-4">
            {currentTrack ? (
              <SyncedLyrics
                lyricsUrl={currentTrack.lyricsUrl}
                currentTime={currentTime}
                isPlaying={isPlaying}
              />
            ) : (
              <div className="flex items-center justify-center h-64 text-white/30">
                Seleziona un brano per vedere il testo
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
