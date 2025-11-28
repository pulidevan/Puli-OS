import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, RotateCcw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const GRID_SIZE = 15;
const SPEED = 150;

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const SnakeApp: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Point>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Use refs for values needed inside the interval to avoid closure staleness
  const directionRef = useRef(direction);
  const snakeRef = useRef(snake);
  const isPlayingRef = useRef(isPlaying);
  const gameOverRef = useRef(gameOver);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  const generateFood = useCallback(() => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Ensure food doesn't spawn on snake
      // eslint-disable-next-line no-loop-func
      const onSnake = snakeRef.current.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake([{ x: 7, y: 7 }]);
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (gameOverRef.current || !isPlayingRef.current) return;

    const head = { ...snakeRef.current[0] };

    switch (directionRef.current) {
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'RIGHT': head.x += 1; break;
    }

    // Check Wall Collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }

    // Check Self Collision
    if (snakeRef.current.some(segment => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }

    const newSnake = [head, ...snakeRef.current];

    // Check Food Collision
    if (head.x === food.x && head.y === food.y) {
      setScore(s => {
        const newScore = s + 10;
        if (newScore > highScore) setHighScore(newScore);
        return newScore;
      });
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [food, generateFood, highScore]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  const handleDirection = (newDir: Direction) => {
    // Prevent 180 degree turns
    const current = directionRef.current;
    if (newDir === 'UP' && current === 'DOWN') return;
    if (newDir === 'DOWN' && current === 'UP') return;
    if (newDir === 'LEFT' && current === 'RIGHT') return;
    if (newDir === 'RIGHT' && current === 'LEFT') return;
    setDirection(newDir);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': handleDirection('UP'); break;
        case 'ArrowDown': case 's': case 'S': handleDirection('DOWN'); break;
        case 'ArrowLeft': case 'a': case 'A': handleDirection('LEFT'); break;
        case 'ArrowRight': case 'd': case 'D': handleDirection('RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-2 bg-[#9fa688] min-h-[400px]">
      <div className="flex justify-between w-full max-w-[300px] border-b-2 border-black pb-2 font-mono font-bold text-black text-xs md:text-sm">
        <span>SCORE: {score.toString().padStart(3, '0')}</span>
        <span>HI: {highScore.toString().padStart(3, '0')}</span>
      </div>

      {/* Game Board */}
      <div 
        className="relative bg-[#8b9376] border-4 border-black shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)]"
        style={{
          width: '300px',
          height: '300px',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white z-10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold font-mono mb-2">GAME OVER</h3>
            <button 
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold border-2 border-white hover:bg-black hover:text-white transition-colors"
            >
              <RotateCcw size={16} /> RESTART
            </button>
          </div>
        )}

        {!isPlaying && !gameOver && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white z-10">
             <button 
               onClick={resetGame}
               className="flex items-center gap-2 px-6 py-3 bg-black text-[#9fa688] border-2 border-[#9fa688] font-bold text-xl hover:bg-[#9fa688] hover:text-black transition-colors"
             >
               <Play size={20} /> START
             </button>
           </div>
        )}

        {/* Grid Cells */}
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
          const x = idx % GRID_SIZE;
          const y = Math.floor(idx / GRID_SIZE);
          const isSnakeHead = snake[0].x === x && snake[0].y === y;
          const isSnakeBody = snake.some((s, i) => i !== 0 && s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div 
              key={idx} 
              className={`
                w-full h-full border-[0.5px] border-black/5
                ${isSnakeHead ? 'bg-black' : ''}
                ${isSnakeBody ? 'bg-black/70' : ''}
                ${isFood ? 'bg-black animate-pulse' : ''}
              `}
            >
               {isFood && <div className="w-full h-full scale-50 bg-black rotate-45"></div>}
            </div>
          );
        })}
      </div>

      {/* Mobile Controls */}
      <div className="grid grid-cols-3 gap-2 w-[200px]">
        <div></div>
        <button 
          className="bg-black text-[#9fa688] p-3 rounded-md active:bg-[#9fa688] active:text-black transition-colors border-b-4 border-r-4 border-gray-800 active:border-none active:translate-y-1"
          onPointerDown={(e) => { e.preventDefault(); handleDirection('UP'); }}
          aria-label="Up"
        >
          <ChevronUp size={24} className="mx-auto" />
        </button>
        <div></div>

        <button 
          className="bg-black text-[#9fa688] p-3 rounded-md active:bg-[#9fa688] active:text-black transition-colors border-b-4 border-r-4 border-gray-800 active:border-none active:translate-y-1"
          onPointerDown={(e) => { e.preventDefault(); handleDirection('LEFT'); }}
          aria-label="Left"
        >
          <ChevronLeft size={24} className="mx-auto" />
        </button>

        <div className="flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-black/20"></div>
        </div>

        <button 
          className="bg-black text-[#9fa688] p-3 rounded-md active:bg-[#9fa688] active:text-black transition-colors border-b-4 border-r-4 border-gray-800 active:border-none active:translate-y-1"
          onPointerDown={(e) => { e.preventDefault(); handleDirection('RIGHT'); }}
          aria-label="Right"
        >
          <ChevronRight size={24} className="mx-auto" />
        </button>

        <div></div>
        <button 
          className="bg-black text-[#9fa688] p-3 rounded-md active:bg-[#9fa688] active:text-black transition-colors border-b-4 border-r-4 border-gray-800 active:border-none active:translate-y-1"
          onPointerDown={(e) => { e.preventDefault(); handleDirection('DOWN'); }}
          aria-label="Down"
        >
          <ChevronDown size={24} className="mx-auto" />
        </button>
        <div></div>
      </div>
      
      <div className="text-[10px] font-mono opacity-50 text-center">
        USE ARROW KEYS OR D-PAD
      </div>
    </div>
  );
};