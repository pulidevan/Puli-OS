import React, { useState, useEffect } from 'react';
import { WindowId } from '../types';
import { Power, Menu } from 'lucide-react';

interface TaskbarProps {
  openWindows: WindowId[];
  activeWindow: WindowId | null;
  onWindowClick: (id: WindowId) => void;
  onStartClick: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ openWindows, activeWindow, onWindowClick, onStartClick }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 md:h-12 bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 shadow-[inset_0_1px_0_white] z-50 select-none">
      <button 
        onClick={onStartClick}
        className="flex items-center gap-2 px-3 py-2 md:py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black shadow-[1px_1px_0_black] active:border-t-black active:border-l-black active:border-b-white active:border-r-white active:shadow-none mr-2 font-bold shrink-0"
        aria-label="Start Menu"
      >
        <div className="bg-black text-white p-[2px] md:p-[1px]">
             <Power size={16} />
        </div>
        <span className="hidden md:inline">START</span>
      </button>

      <div className="w-[2px] h-8 bg-gray-400 border-r border-white mx-1 shrink-0"></div>

      <div className="flex-grow flex gap-1 overflow-x-auto px-1 no-scrollbar">
        {openWindows.map(id => (
          <button
            key={id}
            onClick={() => onWindowClick(id)}
            className={`
                px-3 py-2 md:px-4 md:py-1 flex items-center gap-2 text-sm font-bold min-w-[80px] max-w-[150px] md:max-w-[200px] truncate shrink-0
                ${activeWindow === id 
                    ? 'bg-[#e0e0e0] border-t-2 border-l-2 border-black border-b-2 border-r-2 border-white shadow-[inset_1px_1px_0_black] bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPgo8cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=")]' 
                    : 'bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black'
                }
            `}
          >
            <span className="truncate capitalize w-full text-left">{id}</span>
          </button>
        ))}
      </div>

      <div className="w-[2px] h-8 bg-gray-400 border-r border-white mx-1 shrink-0"></div>

      <div className="hidden sm:flex px-4 py-1 bg-[#c0c0c0] border-t-2 border-l-2 border-gray-400 border-b-2 border-r-2 border-white shadow-[inset_2px_2px_0_gray] font-mono text-sm ml-auto items-center gap-3 shrink-0">
        <span className="hidden md:inline text-xs text-gray-600">v.1.0.4</span>
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};