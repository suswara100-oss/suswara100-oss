/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useSnakeGame } from './hooks/useSnakeGame';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { TRACKS } from './constants';
import { Trophy, Activity, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const gameState = useSnakeGame();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = TRACKS[currentTrackIndex];

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      </div>

      <main className="relative z-10 container mx-auto h-screen flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 px-6 py-12">
        
        {/* Left Section: Stats & Title */}
        <div className="hidden lg:flex flex-col gap-8 w-64 h-full py-12 justify-between border-r border-white/10 pr-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-none bg-cyan-500/20 flex items-center justify-center border border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.3)] glitch-border">
                <Layout className="text-cyan-400" size={20} />
              </div>
              <h1 className="text-2xl font-black tracking-tighter uppercase leading-none italic glitch-text">
                NEON<br/><span className="text-cyan-400">RHYTHM</span>
              </h1>
            </motion.div>

            <p className="text-[10px] text-gray-500 leading-relaxed font-mono uppercase tracking-[0.1em]">
              {`>> SYS_ARCH: SYNTHETIC_RESONANCE`}
              <br/>
              {`>> DATA_FLOW: ENCRYPTED`}
            </p>
          </div>

          <div className="space-y-6">
            <div id="score-display" className="space-y-2 border-l-2 border-pink-500 pl-4">
              <span className="text-[10px] font-mono text-pink-500 uppercase tracking-widest flex items-center gap-2">
                <Activity size={12} /> N_S_INDEX
              </span>
              <div className="text-5xl font-black tabular-nums tracking-tighter text-white">
                {gameState.score.toString().padStart(4, '0')}
              </div>
            </div>

            <div id="highscore-display" className="space-y-2 border-l-2 border-cyan-500 pl-4">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Trophy size={12} /> PEAK_RESONANCE
              </span>
              <div className="text-3xl font-bold text-white tabular-nums tracking-tighter">
                {gameState.highScore.toString().padStart(4, '0')}
              </div>
            </div>
          </div>

          <div id="status-display" className="p-4 rounded-none bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 opacity-20"><Activity size={10} /></div>
            <div className="text-[10px] font-mono text-gray-500 uppercase mb-2">IO_BUFFER_STATE</div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-none rotate-45 ${gameState.status === 'PLAYING' ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse' : 'bg-pink-500'}`} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-300">
                {`[ ${gameState.status} ]`}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Snake Game */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8 relative">
          <div className="scanline" />
          
          <div className="lg:hidden w-full flex justify-between items-center px-4 mb-4 font-mono">
            <h1 className="text-sm font-black italic glitch-text">SYS.RHYTHM</h1>
            <div className="text-xl font-black tabular-nums tracking-tighter text-cyan-400">
              {gameState.score.toString().padStart(4, '0')}
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-1 bg-gradient-to-br from-cyan-400 via-transparent to-pink-500"
          >
            <SnakeGame 
              snake={gameState.snake} 
              food={gameState.food} 
              status={gameState.status} 
              score={gameState.score}
            />
          </motion.div>

          <div className="text-center font-mono space-y-1">
            <p className="text-[10px] text-cyan-500 uppercase tracking-[0.3em] glitch-text">
              [ TERMINAL_ACCESS_GRANTED ]
            </p>
            <p className="text-[8px] text-gray-600 uppercase tracking-[0.5em]">
              V_MOD_24.SR_01
            </p>
          </div>
        </div>

        {/* Right Section: Music Player */}
        <div className="w-full md:w-auto lg:w-96 flex flex-col items-center gap-8 justify-center h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="w-full"
            >
              <MusicPlayer 
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayPause={togglePlay}
                onNext={handleNextTrack}
                onPrev={handlePrevTrack}
              />
            </motion.div>
          </AnimatePresence>

          <div className="w-full max-w-md hidden md:block">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-4">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                Next in Queue
              </h3>
              <div className="space-y-2">
                {TRACKS.map((track, idx) => (
                  <div 
                    key={track.id}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer ${idx === currentTrackIndex ? 'bg-white/10' : 'hover:bg-white/5'}`}
                    onClick={() => setCurrentTrackIndex(idx)}
                  >
                    <img src={track.coverUrl} className="w-10 h-10 rounded-md object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-bold truncate ${idx === currentTrackIndex ? 'text-white' : 'text-gray-400'}`}>
                        {track.title}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate">{track.artist}</div>
                    </div>
                    {idx === currentTrackIndex && isPlaying && (
                      <div className="flex items-end gap-[2px] h-3">
                        <motion.div animate={{ height: [4, 12, 6] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-cyan-400" />
                        <motion.div animate={{ height: [8, 4, 10] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-cyan-400" />
                        <motion.div animate={{ height: [6, 10, 4] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-1 bg-cyan-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,.03),rgba(0,255,0,.01),rgba(0,0,255,.03))] bg-[length:100%_4px,3px_100%] z-50 opacity-20" />
    </div>
  );
}
