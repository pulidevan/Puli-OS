import React from 'react';
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react';

export const MediaApp: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-video bg-black relative flex items-center justify-center border-2 border-black group cursor-pointer overflow-hidden">
        {/* Placeholder for video */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://picsum.photos/seed/drone/800/450')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700"></div>
        <div className="relative z-10 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-black/50 backdrop-blur-sm group-hover:bg-white/20 transition-all">
            <Play fill="white" className="ml-1 text-white" />
        </div>
        <div className="absolute bottom-2 left-2 text-white text-xs font-bold bg-black px-2">
            DRONE_REEL_FINAL.MP4
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between bg-gray-200 p-2 border-2 border-black flex-wrap gap-2">
        <div className="flex gap-4 md:gap-2">
            <button className="p-2 border border-black bg-white hover:bg-black hover:text-white transition-colors" aria-label="Play"><Play size={16}/></button>
            <button className="p-2 border border-black bg-white hover:bg-black hover:text-white transition-colors" aria-label="Pause"><Pause size={16}/></button>
            <button className="p-2 border border-black bg-white hover:bg-black hover:text-white transition-colors" aria-label="Skip"><SkipForward size={16}/></button>
        </div>
        <div className="flex items-center gap-3 bg-white border border-black px-2 py-1">
            <input type="range" className="w-20 h-2 bg-gray-300 appearance-none cursor-pointer" aria-label="Volume" />
            <Volume2 size={16} />
        </div>
      </div>
      
      <div className="text-xs font-mono text-gray-500 text-center md:text-left">
        Status: Loaded • Codec: H.264 • Res: 4K
      </div>
    </div>
  );
};