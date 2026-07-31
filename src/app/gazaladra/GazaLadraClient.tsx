'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FixedSubtitleBar } from '@/components/FixedSubtitleBar';
import { FullLyricsModal } from '@/components/FullLyricsModal';
import { gazaLadraAlbum } from '@/data/albums';
import { useMusicPlayer } from '@/hooks/useMusicPlayer';
import { usePlayCounts } from '@/hooks/usePlayCounts';
import { Track } from '@/types';

export function GazaLadraClient() {
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const [extraTracks, setExtraTracks] = useState<Track[]>([]);
  const { increment, getPlayCount } = usePlayCounts();

  useEffect(() => {
    fetch('/api/tracks')
      .then((r) => r.json())
      .then((all: Track[]) => setExtraTracks(all.filter((t) => (t as Track & { albumId?: string }).albumId === 'gazaladra')))
      .catch(() => {});
  }, []);

  const allTracks = [...gazaLadraAlbum.tracks, ...extraTracks];

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
  } = useMusicPlayer(allTracks, increment);

  useEffect(() => {
    setPlaylist(allTracks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extraTracks, setPlaylist]);

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
              tracks={allTracks}
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

            {/* Nota d'autore */}
            <div className="mt-16 border-t border-white/10 pt-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                Gaza ladra <span className="text-white/50 font-normal text-xl">(nota d&apos;autore)</span>
              </h2>
              <div className="space-y-6 text-white/75 text-lg leading-relaxed max-w-3xl">
                <p>
                  L&apos;album raccoglie i segni dell&apos;attuale inconsistenza degli eventi, nella sovra comunicazione di immagini e media.
                </p>
                <p>
                  Una riproduzione d&apos;oltre misura che ne depotenzia i significati simbolici e la sostanza concreta della loro drammaticità. In un loop che dissolve la permanenza del carico empatico e la conseguente elaborazione critica necessaria alla consistenza del senso di commozione partecipata.
                </p>
                <p>
                  E la guerra, che maciulla il corpo e i corpi della vita, è dispositivo emblematico del meccanismo abortivo del consumo per lo sviluppo dei sentimenti, dell&apos;immaginazione, dei sogni.
                </p>
                <p>
                  Non a caso gli scenari e le aree si dicono &quot;teatri&quot; di guerra. A maggior ragione per quella che oggi a Gaza vede quali primi attori - a dispetto di dramma e tragedia dei veri protagonisti – capocomici capaci di recitare banali e ancorché applaudite battute da farsa.
                </p>
                <p>
                  I testi della raccolta di poesong &quot;Gaza ladra&quot;, vorrebbero restituire i ritmi e i tempi delle giuste battute di scena, che nell&apos;ironia cogente dei significanti musicati con l&apos;AI, cercano possibile verità.
                </p>
              </div>
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
              playCount={getPlayCount(track.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Track row component for the track listing
function TrackRow({ track, index, isCurrentTrack, isPlaying, onPlay, playCount }: {
  track: Track;
  index: number;
  isCurrentTrack: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  playCount: number;
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
              <div className="border-t border-white/10 my-2" />
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
