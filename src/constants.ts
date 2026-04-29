/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Track } from "./types";

export const GRID_SIZE = 20;
export const CELL_SIZE = 20;
export const INITIAL_SPEED = 150;
export const MIN_SPEED = 50;
export const SPEED_INCREMENT = 2;

export const NEON_COLORS = {
  cyan: "#00f2ff",
  pink: "#ff00e6",
  green: "#39ff14",
  purple: "#bc13fe",
  orange: "#ff8c00",
};

export const TRACKS: Track[] = [
  {
    id: "1",
    title: "Neon Horizon",
    artist: "SynthAura X",
    coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: NEON_COLORS.cyan,
  },
  {
    id: "2",
    title: "Data Pulse",
    artist: "Binary Beats",
    coverUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: NEON_COLORS.pink,
  },
  {
    id: "3",
    title: "Cyber Rush",
    artist: "Neural Network",
    coverUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: NEON_COLORS.green,
  },
];
