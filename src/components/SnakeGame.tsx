/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { Point, Direction } from "../types";
import { CELL_SIZE, GRID_SIZE, NEON_COLORS } from "../constants";

interface SnakeGameProps {
  snake: Point[];
  food: Point;
  status: string;
  score: number;
}

export const SnakeGame: React.FC<SnakeGameProps> = ({
  snake,
  food,
  status,
  score,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#0a0a0f"; // Darker background for depth
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid (Subtle)
    ctx.strokeStyle = "rgba(0, 242, 255, 0.05)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(canvas.width, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw Food
    const glowColor = NEON_COLORS.pink;
    ctx.shadowBlur = 15;
    ctx.shadowColor = glowColor;
    ctx.fillStyle = glowColor;
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw Snake
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      const segmentColor = isHead ? NEON_COLORS.cyan : NEON_COLORS.purple;
      
      ctx.shadowBlur = isHead ? 20 : 10;
      ctx.shadowColor = segmentColor;
      ctx.fillStyle = segmentColor;

      // Draw rounded rectangle for snake body
      const padding = 1;
      const x = segment.x * CELL_SIZE + padding;
      const y = segment.y * CELL_SIZE + padding;
      const size = CELL_SIZE - padding * 2;
      const radius = 4;

      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + size - radius, y);
      ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
      ctx.lineTo(x + size, y + size - radius);
      ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
      ctx.lineTo(x + radius, y + size);
      ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();

      // Eye for the head
      if (isHead) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x + size / 4, y + size / 3, 2, 0, Math.PI * 2);
        ctx.arc(x + (size * 3) / 4, y + size / 3, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Game Over Overlay
    if (status === "GAME_OVER") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 20;
      ctx.shadowColor = NEON_COLORS.pink;
      ctx.fillStyle = NEON_COLORS.pink;
      ctx.font = "bold 32px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("SYSTEM FAILURE", canvas.width / 2, canvas.height / 2 - 20);
      ctx.font = "16px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#fff";
      ctx.fillText(`SCORE: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
      ctx.fillText("PRESS ANY KEY TO REBOOT", canvas.width / 2, canvas.height / 2 + 50);
    }

    if (status === "START") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 10;
      ctx.shadowColor = NEON_COLORS.cyan;
      ctx.fillStyle = NEON_COLORS.cyan;
      ctx.font = "bold 24px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("NEON RHYTHM SNAKE", canvas.width / 2, canvas.height / 2 - 20);
      ctx.font = "14px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#fff";
      ctx.fillText("USE ARROW KEYS TO PLAY", canvas.width / 2, canvas.height / 2 + 20);
    }
  }, [snake, food, status, score]);

  return (
    <div id="game-container" className="relative group p-2 rounded-xl bg-black/40 border border-white/10 ring-1 ring-cyan-400/20 shadow-[0_0_50px_-12px_rgba(34,211,238,0.5)]">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="block rounded-lg"
      />
    </div>
  );
};
