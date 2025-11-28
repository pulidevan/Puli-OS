import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { WindowState } from '../types';

interface WindowProps {
  windowState: WindowState;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ windowState, onClose, onMinimize, onFocus, children }) => {
  const constraintsRef = useRef(null);

  if (!windowState.isOpen || windowState.isMinimized) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ 
        scale: 0.9, 
        opacity: 0, 
        x: windowState.position?.x || 0,
        y: windowState.position?.y || 0 
      }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onPointerDown={() => onFocus(windowState.id)}
      style={{ 
        zIndex: windowState.zIndex,
        position: 'absolute',
        // Default positioning logic
        left: windowState.position ? 0 : '5%', 
        top: windowState.position ? 0 : '5%',
      }}
      className="flex flex-col bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-[94vw] md:w-auto md:min-w-[500px] md:max-w-xl max-h-[85vh] md:max-h-[80vh]"
    >
      {/* Title Bar - Increased height and padding for better touch dragging */}
      <div className="flex items-center justify-between bg-black text-white px-3 py-2 md:py-1 cursor-grab active:cursor-grabbing select-none border-b-2 border-black touch-none">
        <div className="flex items-center gap-2">
          {windowState.icon && <windowState.icon size={18} />}
          <span className="font-bold text-sm tracking-wider uppercase truncate max-w-[150px] md:max-w-none">{windowState.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Increased touch targets for buttons */}
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(windowState.id); }}
            className="p-2 md:p-1 hover:bg-white hover:text-black transition-colors border border-transparent hover:border-black focus:outline-none focus:bg-white focus:text-black"
            aria-label="Minimize"
          >
            <Minus size={16} />
          </button>
          <button 
            className="p-2 md:p-1 hover:bg-white hover:text-black transition-colors border border-transparent hover:border-black focus:outline-none focus:bg-white focus:text-black hidden md:block"
            aria-label="Maximize"
          >
            <Maximize2 size={16} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(windowState.id); }}
            className="p-2 md:p-1 hover:bg-red-500 hover:text-white transition-colors border border-transparent hover:border-black ml-1 focus:outline-none focus:bg-red-500 focus:text-white"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 overflow-y-auto overflow-x-hidden relative flex-grow">
        {children}
      </div>
    </motion.div>
  );
};