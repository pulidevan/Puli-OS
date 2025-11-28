import React from 'react';

interface DesktopIconProps {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon: Icon, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group flex flex-col items-center gap-1 w-24 p-2 cursor-pointer hover:bg-black/5 active:bg-black/10 border border-transparent hover:border-black hover:border-dashed transition-colors select-none"
    >
      <div className="bg-white p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-active:translate-x-[2px] group-active:translate-y-[2px] group-active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
        <Icon size={32} className="text-black" strokeWidth={1.5} />
      </div>
      <span className="text-sm font-bold bg-white px-1 border border-transparent group-hover:border-black shadow-none group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {label}
      </span>
    </div>
  );
};
