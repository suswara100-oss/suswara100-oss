/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from "react";
import { Track } from "../types";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MusicPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div id="music-player" className="w-full max-w-md bg-black border-2 border-white/20 rounded-none p-6 shadow-[10px_10px_0px_rgba(255,0,230,0.5)] overflow-hidden relative group">
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
      />
      
      {/* Jarring Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 opacity-50 group-hover:animate-pulse" />
      <div className="absolute bottom-0 right-0 w-full h-[2px] bg-pink-500 opacity-50 group-hover:animate-pulse" />

      <div className="flex flex-col items-center gap-6 relative z-10">
        <div className="relative">
          <motion.div
            key={currentTrack.id}
            initial={{ scale: 0.8, opacity: 0, x: -10 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            className="w-48 h-48 rounded-none overflow-hidden border-4 border-white/10"
          >
            <img 
              src={currentTrack.coverUrl} 
              alt={currentTrack.title} 
              className="w-full h-full object-cover grayscale brightness-125 contrast-125 hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {isPlaying && (
            <div className="absolute -inset-2 border-2 border-cyan-400/30 animate-[ping_2s_infinite] pointer-events-none" />
          )}
        </div>

        <div className="text-center w-full">
          <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-1 glitch-text">
            {currentTrack.title}
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gray-700" />
            <p className="text-[10px] text-pink-500 font-mono uppercase tracking-[0.3em] font-bold">
              {currentTrack.artist}
            </p>
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gray-700" />
          </div>
        </div>

        {/* Binary Progress Bar */}
        <div className="w-full space-y-2">
          <div className="h-1 w-full bg-gray-900 rounded-none overflow-hidden border border-white/5">
            <motion.div 
              className="h-full bg-cyan-400 shadow-[0_0_10px_#00f2ff]"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-[8px] font-mono text-gray-600 uppercase tracking-tighter">
            <span>BIT_START</span>
            <span>EOF_TERMINAL</span>
          </div>
        </div>

        {/* Industrial Controls */}
        <div className="flex items-center gap-10">
          <button 
            id="prev-track"
            onClick={onPrev}
            className="text-gray-500 hover:text-cyan-400 transition-colors uppercase font-mono text-[10px] tracking-widest"
          >
            [ PREV ]
          </button>
          
          <button 
            id="play-pause"
            onClick={onPlayPause}
            className="w-16 h-16 flex items-center justify-center rounded-none border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-all shadow-[5px_5px_0px_#00f2ff] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>

          <button 
            id="next-track"
            onClick={onNext}
            className="text-gray-500 hover:text-pink-500 transition-colors uppercase font-mono text-[10px] tracking-widest"
          >
            [ NEXT ]
          </button>
        </div>

        <div className="w-full px-8 opacity-30">
          <div className="h-[1px] w-full bg-white/20" />
        </div>
      </div>
    </div>
  );
};
