import React, { useState } from 'react';
import { User, Activity, Terminal, Film, Info, Folder, Power, Gamepad2, FileText, Mail, Inbox } from 'lucide-react';
import { WindowId, WindowState } from './types';
import { Window } from './components/Window';
import { Taskbar } from './components/Taskbar';
import { DesktopIcon } from './components/DesktopIcon';
import { ProfileApp } from './components/apps/ProfileApp';
import { StatsApp } from './components/apps/StatsApp';
import { TerminalApp } from './components/apps/TerminalApp';
import { MediaApp } from './components/apps/MediaApp';
import { SnakeApp } from './components/apps/SnakeApp';
import { ResumeApp } from './components/apps/ResumeApp';
import { ContactApp } from './components/apps/ContactApp';
import { InboxApp } from './components/apps/InboxApp';

const INITIAL_WINDOWS: Record<WindowId, WindowState> = {
  [WindowId.PROFILE]: {
    id: WindowId.PROFILE,
    title: 'Profile.exe',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    icon: User,
    position: { x: 20, y: 80 },
  },
  [WindowId.STATS]: {
    id: WindowId.STATS,
    title: 'Metrics.xls',
    isOpen: false,
    isMinimized: false,
    zIndex: 2,
    icon: Activity,
    position: { x: 40, y: 120 },
  },
  [WindowId.TERMINAL]: {
    id: WindowId.TERMINAL,
    title: 'CMD_Prompt',
    isOpen: false,
    isMinimized: false,
    zIndex: 3,
    icon: Terminal,
    position: { x: 30, y: 150 },
  },
  [WindowId.MEDIA]: {
    id: WindowId.MEDIA,
    title: 'Drone_Reel.mp4',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    icon: Film,
    position: { x: 50, y: 200 },
  },
  [WindowId.GAME]: {
    id: WindowId.GAME,
    title: 'Snake_97.exe',
    isOpen: false,
    isMinimized: false,
    zIndex: 2,
    icon: Gamepad2,
    position: { x: 60, y: 60 },
  },
  [WindowId.RESUME]: {
    id: WindowId.RESUME,
    title: 'Resume.pdf',
    isOpen: false,
    isMinimized: false,
    zIndex: 5,
    icon: FileText,
    position: { x: 10, y: 10 },
  },
  [WindowId.CONTACT]: {
    id: WindowId.CONTACT,
    title: 'Send Enquiry',
    isOpen: false,
    isMinimized: false,
    zIndex: 5,
    icon: Mail,
    position: { x: 70, y: 70 },
  },
  [WindowId.INBOX]: {
    id: WindowId.INBOX,
    title: 'Inbox.sec',
    isOpen: false,
    isMinimized: false,
    zIndex: 6,
    icon: Inbox,
    position: { x: 90, y: 90 },
  },
  [WindowId.ABOUT]: {
    id: WindowId.ABOUT,
    title: 'System_Info',
    isOpen: false,
    isMinimized: false,
    zIndex: 4,
    icon: Info,
    position: { x: 60, y: 100 },
  },
  [WindowId.PROJECTS]: {
    id: WindowId.PROJECTS,
    title: 'Projects',
    isOpen: false,
    isMinimized: false,
    zIndex: 4,
    icon: Folder,
    position: { x: 80, y: 180 },
  },
};

const App: React.FC = () => {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const handleOpenWindow = (id: WindowId) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZIndex
      }
    }));
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id);
    setStartMenuOpen(false);
  };

  const handleCloseWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id as WindowId], isOpen: false }
    }));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const handleMinimizeWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id as WindowId], isMinimized: true }
    }));
    setActiveWindowId(null);
  };

  const handleFocusWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id as WindowId], zIndex: nextZIndex }
    }));
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id as WindowId);
  };

  const toggleWindowFromTaskbar = (id: WindowId) => {
    const win = windows[id];
    if (win.isMinimized || activeWindowId !== id) {
        // Restore and focus
        setWindows(prev => ({
            ...prev,
            [id]: { ...prev[id], isMinimized: false, zIndex: nextZIndex }
        }));
        setNextZIndex(prev => prev + 1);
        setActiveWindowId(id);
    } else {
        // Minimize
        handleMinimizeWindow(id);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#e0e0e0] text-black overflow-hidden relative selection:bg-black selection:text-white touch-none">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-4 z-0 flex-wrap h-[90vh] content-start">
        <DesktopIcon label="Profile" icon={User} onClick={() => handleOpenWindow(WindowId.PROFILE)} />
        <DesktopIcon label="Metrics" icon={Activity} onClick={() => handleOpenWindow(WindowId.STATS)} />
        <DesktopIcon label="Resume.pdf" icon={FileText} onClick={() => handleOpenWindow(WindowId.RESUME)} />
        <DesktopIcon label="Send Enquiry" icon={Mail} onClick={() => handleOpenWindow(WindowId.CONTACT)} />
        <DesktopIcon label="Snake" icon={Gamepad2} onClick={() => handleOpenWindow(WindowId.GAME)} />
        <DesktopIcon label="Terminal" icon={Terminal} onClick={() => handleOpenWindow(WindowId.TERMINAL)} />
        <DesktopIcon label="Projects" icon={Folder} onClick={() => handleOpenWindow(WindowId.PROJECTS)} />
        <DesktopIcon label="Drone Reel" icon={Film} onClick={() => handleOpenWindow(WindowId.MEDIA)} />
      </div>

      {/* Windows Layer */}
      {(Object.values(windows) as WindowState[]).map(win => (
        <Window 
            key={win.id} 
            windowState={win} 
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={handleFocusWindow}
        >
            {win.id === WindowId.PROFILE && <ProfileApp />}
            {win.id === WindowId.STATS && <StatsApp />}
            {win.id === WindowId.TERMINAL && <TerminalApp />}
            {win.id === WindowId.MEDIA && <MediaApp />}
            {win.id === WindowId.GAME && <SnakeApp />}
            {win.id === WindowId.RESUME && <ResumeApp />}
            {win.id === WindowId.CONTACT && <ContactApp onOpenWindow={handleOpenWindow} />}
            {win.id === WindowId.INBOX && <InboxApp />}
            {win.id === WindowId.PROJECTS && (
                <div className="p-4 bg-yellow-50 text-center border border-black border-dashed">
                    <h3 className="font-bold text-xl mb-2">Projects Directory</h3>
                    <p>Coming Soon...</p>
                    <p className="text-xs text-gray-500 mt-2">Double-click to mount drive.</p>
                </div>
            )}
            {win.id === WindowId.ABOUT && (
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold mb-4">PulidevanOS</h2>
                    <p>"Smarter machines are controlled by curious machines"</p>
                    <div className="mt-4 border-t border-black pt-4 text-xs">
                        System Integrity: 100%<br/>
                        Memory: 64TB<br/>
                        Coffee Level: CRITICAL
                    </div>
                </div>
            )}
        </Window>
      ))}

      {/* Start Menu Overlay */}
      {startMenuOpen && (
        <div className="absolute bottom-12 left-0 w-64 max-w-[90vw] bg-[#c0c0c0] border-2 border-white border-b-black border-r-black shadow-xl z-[60] flex flex-col p-1">
            <div className="bg-black text-white px-2 py-2 font-bold mb-1 flex items-center justify-between">
                <span>PulidevanOS</span>
                <span className="text-xs text-gray-400">Pro</span>
            </div>
            <button onClick={() => handleOpenWindow(WindowId.PROFILE)} className="px-2 py-3 hover:bg-black hover:text-white text-left font-bold flex items-center gap-2">
                <User size={18}/> Profile
            </button>
            <button onClick={() => handleOpenWindow(WindowId.INBOX)} className="px-2 py-3 hover:bg-black hover:text-white text-left font-bold flex items-center gap-2">
                <Inbox size={18}/> Inbox
            </button>
            <button onClick={() => handleOpenWindow(WindowId.CONTACT)} className="px-2 py-3 hover:bg-black hover:text-white text-left font-bold flex items-center gap-2">
                <Mail size={18}/> Send Enquiry
            </button>
            <button onClick={() => handleOpenWindow(WindowId.RESUME)} className="px-2 py-3 hover:bg-black hover:text-white text-left font-bold flex items-center gap-2">
                <FileText size={18}/> Resume
            </button>
            <button onClick={() => handleOpenWindow(WindowId.GAME)} className="px-2 py-3 hover:bg-black hover:text-white text-left font-bold flex items-center gap-2">
                <Gamepad2 size={18}/> Games
            </button>
            <button onClick={() => handleOpenWindow(WindowId.PROJECTS)} className="px-2 py-3 hover:bg-black hover:text-white text-left font-bold flex items-center gap-2">
                <Folder size={18}/> Projects
            </button>
            <button onClick={() => handleOpenWindow(WindowId.ABOUT)} className="px-2 py-3 hover:bg-black hover:text-white text-left font-bold flex items-center gap-2">
                <Info size={18}/> System Info
            </button>
             <div className="h-[1px] bg-gray-500 my-1"></div>
             <button onClick={() => window.location.reload()} className="px-2 py-3 hover:bg-black hover:text-white text-left font-bold flex items-center gap-2">
                <Power size={18}/> Shut Down
            </button>
        </div>
      )}

      {/* Taskbar */}
      <Taskbar 
        openWindows={(Object.values(windows) as WindowState[]).filter(w => w.isOpen).map(w => w.id)} 
        activeWindow={activeWindowId}
        onWindowClick={toggleWindowFromTaskbar}
        onStartClick={() => setStartMenuOpen(!startMenuOpen)}
      />
    </div>
  );
};

export default App;