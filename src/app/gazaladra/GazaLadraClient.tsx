'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FixedSubtitleBar } from '@/components/FixedSubtitleBar';
import { FullLyricsModal } from '@/components/FullLyricsModal';
import { VoteButtons } from '@/components/VoteButtons';
import { gazaLadraAlbum } from '@/data/albums';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { useVotes, VoteType } from '@/hooks/useVotes';
import { usePlayCounts } from '@/hooks/usePlayCounts';
import { Track } from '@/types';

export function GazaLadraClient() {
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
    playTrack,
    nextTrack,
    previousTrack,
    setPlaylist,
  } = useMusicPlayer(gazaLadraAlbum.tracks, increment);

  useEffect(() => {
    setPlaylist(gazaLadraAlbum.tracks);
  }, [setPlaylist]);

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
                <li className="text-white">Gaza Ladra</li>
              </ol>
            </nav>

            {/* Music Player with shared state */}
            <MusicPlayerWithState
              tracks={gazaLadraAlbum.tracks}
              albumCover={gazaLadraAlbum.coverUrl}
              albumTitle={gazaLadraAlbum.title}
              albumArtist={gazaLadraAlbum.artist}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              isMuted={isMuted}
              toggle={toggle}
              seek={seek}
              setVolume={setVolume}
              toggleMute={toggleMute}
              playTrack={playTrack}
              nextTrack={nextTrack}
              previousTrack={previousTrack}
              getPlayCount={getPlayCount}
            />

            {/* Album Description */}
            <div className="mt-12 text-center">
              <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
                {gazaLadraAlbum.description}
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
        albumTitle={gazaLadraAlbum.title}
      />
    </>
  );
}

// Simplified MusicPlayer that accepts external state
interface MusicPlayerWithStateProps {
  tracks: Track[];
  albumCover?: string;
  albumTitle?: string;
  albumArtist?: string;
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  toggle: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  playTrack: (track: Track) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  getPlayCount: (trackId: string) => number;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds === 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function MusicPlayerWithState({
  tracks,
  albumCover,
  albumTitle,
  albumArtist,
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
  getPlayCount,
}: MusicPlayerWithStateProps) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const [shareTrack, setShareTrack] = useState<Track | null>(null);
  const { vote, getVote, getCounts } = useVotes();

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
      {/* Album Header */}
      <div className="relative p-6 md:p-8 bg-gradient-to-b from-violet-900/50 to-transparent">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
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
        {currentTrack && (
          <div className="text-center mb-4">
            <p className="text-white font-medium">{currentTrack.title}</p>
            <p className="text-white/60 text-sm">{currentTrack.artist}</p>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 md:gap-6">
          <button onClick={previousTrack} className="text-white/70 hover:text-white transition-colors" aria-label="Traccia precedente">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          <button onClick={toggle} className="w-14 h-14 bg-orange-500 hover:bg-orange-400 rounded-full flex items-center justify-center transition-all hover:scale-105" aria-label={isPlaying ? 'Pausa' : 'Riproduci'}>
            {isPlaying ? (
              <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          <button onClick={nextTrack} className="text-white/70 hover:text-white transition-colors" aria-label="Traccia successiva">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          </button>
        </div>

        <div className="flex items-center gap-3 mt-4">
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
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
            ) : volume < 0.5 ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
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

      {/* Track List */}
      <div className="px-4 md:px-8 py-4">
        <div className="space-y-1">
          {tracks.map((track, index) => (
            <TrackRow
              key={track.id}
              track={track}
              index={index}
              isCurrentTrack={currentTrack?.id === track.id}
              isPlaying={isPlaying}
              onPlay={() => playTrack(track)}
              onShare={() => setShareTrack(track)}
              currentVote={getVote(track.id)}
              onVote={vote}
              voteCounts={getCounts(track.id)}
              playCount={getPlayCount(track.id)}
            />
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {shareTrack && (
        <ShareModal
          track={shareTrack}
          onClose={() => setShareTrack(null)}
        />
      )}
    </div>
  );
}

// Track row component for the track listing
function TrackRow({ track, index, isCurrentTrack, isPlaying, onPlay, onShare, currentVote, onVote, voteCounts, playCount }: {
  track: Track;
  index: number;
  isCurrentTrack: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  onShare: () => void;
  currentVote: VoteType;
  onVote: (trackId: string, voteType: VoteType) => void;
  voteCounts: { likes: number; dislikes: number };
  playCount: number;
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare();
    setShowMobileMenu(false);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = track.audioUrl;
    link.download = `${track.artist} - ${track.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowMobileMenu(false);
  };

  const handleDriveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (track.driveUrl) {
      window.open(track.driveUrl, '_blank');
    }
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div
      onClick={onPlay}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group cursor-pointer relative ${
        isCurrentTrack ? 'bg-white/10 text-orange-500' : 'hover:bg-white/5 text-white/80 hover:text-white'
      }`}
    >
      <div className="w-6 md:w-8 text-center flex-shrink-0">
        {isCurrentTrack && isPlaying ? (
          <div className="flex items-center justify-center gap-[2px] h-4">
            <span className="w-[3px] h-full bg-orange-500 rounded-full animate-[equalizer_0.5s_ease-in-out_infinite_alternate]" />
            <span className="w-[3px] h-full bg-orange-500 rounded-full animate-[equalizer_0.5s_ease-in-out_infinite_alternate_0.2s]" />
            <span className="w-[3px] h-full bg-orange-500 rounded-full animate-[equalizer_0.5s_ease-in-out_infinite_alternate_0.4s]" />
          </div>
        ) : (
          <span className={`text-sm ${isCurrentTrack ? 'text-orange-500' : 'text-white/40 group-hover:text-white/70'}`}>
            {index + 1}
          </span>
        )}
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className={`text-sm font-medium truncate ${isCurrentTrack ? 'text-orange-500' : ''}`}>{track.title}</p>
        <p className="text-xs text-white/50 truncate">{track.artist}</p>
      </div>

      {/* Desktop: Action buttons visible */}
      <div className="hidden md:flex items-center gap-1 flex-shrink-0">
        {track.driveUrl && (
          <button
            onClick={handleDriveClick}
            className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Apri su Google Drive"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.71 3.5L1.15 15l4.58 6.5h13.54l4.58-6.5L17.29 3.5H7.71zm.79 1.5h7l4.79 8.25H3.71L8.5 5zm-3.21 9.75h13.42l-2.92 4.75H8.21l-2.92-4.75z"/>
            </svg>
          </button>
        )}
        <button
          onClick={handleDownload}
          className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          title="Scarica MP3"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
        </button>
        <button
          onClick={handleShare}
          className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          title="Condividi"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
          </svg>
        </button>
        <VoteButtons
          trackId={track.id}
          currentVote={currentVote}
          onVote={onVote}
          likes={voteCounts.likes}
          dislikes={voteCounts.dislikes}
        />
        <span className="text-xs text-white/40 flex-shrink-0 ml-2" title="Riproduzioni">
          <span className="inline-flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            {playCount}
          </span>
        </span>
      </div>

      {/* Duration - always visible */}
      <span className="text-xs text-white/40 flex-shrink-0 w-10 text-right">{formatTime(track.duration)}</span>

      {/* Mobile: Three dots menu */}
      <div className="md:hidden relative">
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-orange-400 hover:text-orange-300 transition-colors"
          aria-label="Menu opzioni"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>

        {/* Mobile dropdown menu */}
        {showMobileMenu && (
          <>
            {/* Backdrop to close menu */}
            <div
              className="fixed inset-0 z-40"
              onClick={(e) => {
                e.stopPropagation();
                setShowMobileMenu(false);
              }}
            />
            <div className="absolute right-0 top-full mt-1 z-50 bg-gray-800 rounded-lg shadow-xl border border-white/10 py-2 min-w-[180px]">
              {track.driveUrl && (
                <button
                  onClick={handleDriveClick}
                  className="w-full flex items-center gap-3 px-4 py-2 text-white/80 hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.71 3.5L1.15 15l4.58 6.5h13.54l4.58-6.5L17.29 3.5H7.71zm.79 1.5h7l4.79 8.25H3.71L8.5 5zm-3.21 9.75h13.42l-2.92 4.75H8.21l-2.92-4.75z"/>
                  </svg>
                  Google Drive
                </button>
              )}
              <button
                onClick={handleDownload}
                className="w-full flex items-center gap-3 px-4 py-2 text-white/80 hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
                Scarica MP3
              </button>
              <button
                onClick={handleShare}
                className="w-full flex items-center gap-3 px-4 py-2 text-white/80 hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                </svg>
                Condividi
              </button>
              <div className="border-t border-white/10 my-2" />
              <div className="px-4 py-2 flex items-center justify-between">
                <span className="text-xs text-white/50">Mi piace</span>
                <div onClick={(e) => e.stopPropagation()}>
                  <VoteButtons
                    trackId={track.id}
                    currentVote={currentVote}
                    onVote={onVote}
                    likes={voteCounts.likes}
                    dislikes={voteCounts.dislikes}
                  />
                </div>
              </div>
              <div className="px-4 py-2 flex items-center justify-between">
                <span className="text-xs text-white/50">Riproduzioni</span>
                <span className="text-xs text-white/80">{playCount}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Share Modal component
function ShareModal({ track, onClose }: { track: Track; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/gazaladra?track=${track.id}`;
  const shareText = `Ascolta "${track.title}" di ${track.artist} dall'album Gaza Ladra`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(`${track.title} - ${track.artist}`)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
    sms: `sms:?body=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Condividi traccia</h2>

        {/* Track info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-white/80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <p className="text-xl text-gray-700">"{track.title}"</p>
        </div>

        {/* URL section */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            URL Completo
          </label>
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
            <div className="flex-shrink-0 p-2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent text-gray-600 text-sm outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className="flex-shrink-0 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              {copied ? 'Copiato!' : 'Copia'}
            </button>
          </div>
        </div>

        {/* Social buttons */}
        <div className="flex items-center justify-start gap-4">
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Condividi su Facebook"
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center text-green-500 hover:bg-green-50 rounded-full transition-colors"
            title="Condividi su WhatsApp"
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            title="Condividi su X"
          >
            <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href={shareLinks.email}
            className="w-14 h-14 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
            title="Invia via Email"
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
          <a
            href={shareLinks.sms}
            className="w-14 h-14 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
            title="Invia via SMS"
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9 9H7V9h4v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
