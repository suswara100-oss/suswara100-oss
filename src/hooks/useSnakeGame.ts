/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { Point, Direction, GameState } from "../types";
import { GRID_SIZE, INITIAL_SPEED, MIN_SPEED, SPEED_INCREMENT } from "../constants";

const getRandomPoint = (): Point => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

export const useSnakeGame = () => {
  const [state, setState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }],
    food: getRandomPoint(),
    direction: "UP",
    score: 0,
    highScore: 0,
    status: "START",
    speed: INITIAL_SPEED,
  });

  const directionRef = useRef<Direction>("UP");

  const resetGame = useCallback(() => {
    setState((s) => ({
      ...s,
      snake: [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }],
      food: getRandomPoint(),
      direction: "UP",
      score: 0,
      status: "PLAYING",
      speed: INITIAL_SPEED,
    }));
    directionRef.current = "UP";
  }, []);

  const moveSnake = useCallback(() => {
    setState((s) => {
      if (s.status !== "PLAYING") return s;

      const head = { ...s.snake[0] };
      switch (directionRef.current) {
        case "UP": head.y -= 1; break;
        case "DOWN": head.y += 1; break;
        case "LEFT": head.x -= 1; break;
        case "RIGHT": head.x += 1; break;
      }

      // Check collisions
      if (
        head.x < 0 || head.x >= GRID_SIZE ||
        head.y < 0 || head.y >= GRID_SIZE ||
        s.snake.some(seg => seg.x === head.x && seg.y === head.y)
      ) {
        return {
          ...s,
          status: "GAME_OVER",
          highScore: Math.max(s.score, s.highScore),
        };
      }

      const newSnake = [head, ...s.snake];

      // Check food
      if (head.x === s.food.x && head.y === s.food.y) {
        const newScore = s.score + 10;
        return {
          ...s,
          snake: newSnake,
          food: getRandomPoint(),
          score: newScore,
          speed: Math.max(MIN_SPEED, s.speed - SPEED_INCREMENT),
        };
      }

      newSnake.pop();
      return { ...s, snake: newSnake };
    });
  }, []);

  useEffect(() => {
    if (state.status === "PLAYING") {
      const interval = setInterval(moveSnake, state.speed);
      return () => clearInterval(interval);
    }
  }, [state.status, state.speed, moveSnake]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.status !== "PLAYING") {
        if (state.status === "START" || state.status === "GAME_OVER") {
          resetGame();
        }
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          if (state.direction !== "DOWN") directionRef.current = "UP";
          break;
        case "ArrowDown":
          if (state.direction !== "UP") directionRef.current = "DOWN";
          break;
        case "ArrowLeft":
          if (state.direction !== "RIGHT") directionRef.current = "LEFT";
          break;
        case "ArrowRight":
          if (state.direction !== "LEFT") directionRef.current = "RIGHT";
          break;
      }
      
      setState(s => ({ ...s, direction: directionRef.current }));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.status, state.direction, resetGame]);

  return state;
};
