'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { AppId, DevosWindowBridge, WindowState } from './types';
import Window from './Window';
import AboutApp from './apps/AboutApp';
import ProjectsApp from './apps/ProjectsApp';
import AgentApp from './apps/AgentApp';
import SkillsApp from './apps/SkillsApp';
import FinderApp from './apps/FinderApp';
import ContactApp from './apps/ContactApp';
import GitHubApp from './apps/GitHubApp';
import MusicApp from './apps/MusicApp';

const APP_CONTENT: Record<AppId, React.ReactNode> = {
  about: <AboutApp />,
  projects: <ProjectsApp />,
  agent: <AgentApp />,
  skills: <SkillsApp />,
  finder: <FinderApp />,
  contact: <ContactApp />,
  github: <GitHubApp />,
  music: <MusicApp />,
};

const DEFAULT_WINDOWS: WindowState[] = [
  { id: 'about',    title: 'About.app',      isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 80,  y: 60,  width: 560, height: 420 },
  { id: 'projects', title: 'Projects.app',    isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 120, y: 80,  width: 680, height: 500 },
  { id: 'agent',    title: '🤖 AI Agent',     isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 100, y: 50,  width: 700, height: 520 },
  { id: 'skills',   title: 'Skills.app',      isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 200, y: 120, width: 560, height: 460 },
  { id: 'finder',   title: 'Finder.app',      isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 240, y: 140, width: 600, height: 400 },
  { id: 'contact',  title: 'Mail.app',        isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 280, y: 160, width: 540, height: 440 },
  { id: 'github',   title: 'GitHub.app',      isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 160, y: 100, width: 640, height: 480 },
  { id: 'music',    title: 'Music.app',       isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 320, y: 180, width: 340, height: 280 },
];

export default function WindowManager() {
  const [windows, setWindows] = useState<WindowState[]>(DEFAULT_WINDOWS);
  const topZRef = useRef(20);
  const nextZ = useCallback(() => { topZRef.current += 1; return topZRef.current; }, []);

  const openApp = useCallback((id: AppId) => {
    const z = nextZ();
    setWindows(ws => ws.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: z } : w));
  }, [nextZ]);

  const closeApp = useCallback((id: AppId) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, isOpen: false } : w));
  }, []);

  const minimizeApp = useCallback((id: AppId) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  }, []);

  const focusApp = useCallback((id: AppId) => {
    const z = nextZ();
    setWindows(ws => ws.map(w => w.id === id ? { ...w, zIndex: z } : w));
  }, [nextZ]);

  const updatePosition = useCallback((id: AppId, x: number, y: number) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, x, y } : w));
  }, []);

  const updateSize = useCallback((id: AppId, width: number, height: number) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, width, height } : w));
  }, []);

  const toggleMaximize = useCallback((id: AppId) => {
    const z = nextZ();
    setWindows(ws => ws.map(w => {
      if (w.id !== id) return w;
      if (!w.isMaximized) {
        return { ...w, isMaximized: true, zIndex: z, restoreRect: { x: w.x, y: w.y, width: w.width, height: w.height }, x: 12, y: 36, width: Math.max(520, window.innerWidth - 24), height: Math.max(320, window.innerHeight - 120) };
      }
      const rect = w.restoreRect ?? { x: 80, y: 60, width: 560, height: 420 };
      return { ...w, isMaximized: false, zIndex: z, ...rect };
    }));
  }, [nextZ]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { id } = (e as CustomEvent<{ id: AppId }>).detail;
      if (id) closeApp(id);
    };
    window.addEventListener('devos:close-app', handler as EventListener);
    return () => window.removeEventListener('devos:close-app', handler as EventListener);
  }, [closeApp]);

  // Listen for agent opening apps
  useEffect(() => {
    const handler = (e: Event) => {
      const { id } = (e as CustomEvent<{ id: AppId }>).detail;
      if (id) openApp(id);
    };
    window.addEventListener('devos:open-app', handler as EventListener);
    return () => window.removeEventListener('devos:open-app', handler as EventListener);
  }, [openApp]);

  return (
    <>
      {windows.map(win => win.isOpen && !win.isMinimized ? (
        <Window key={win.id} state={win} onClose={() => closeApp(win.id)} onMinimize={() => minimizeApp(win.id)} onToggleMaximize={() => toggleMaximize(win.id)} onFocus={() => focusApp(win.id)} onMove={(x, y) => updatePosition(win.id, x, y)} onResize={(w, h) => updateSize(win.id, w, h)}>
          {APP_CONTENT[win.id]}
        </Window>
      ) : null)}
      <BridgeListener onOpen={openApp} onClose={closeApp} minimized={windows.filter(w => w.isMinimized)} onRestore={openApp} />
    </>
  );
}

function BridgeListener({ onOpen, onClose, minimized, onRestore }: { onOpen: (id: AppId) => void; onClose: (id: AppId) => void; minimized: WindowState[]; onRestore: (id: AppId) => void }) {
  useEffect(() => {
    const bridge = window as Window & DevosWindowBridge;
    bridge.__devos_openApp = onOpen;
    bridge.__devos_closeApp = onClose;
    bridge.__devos_minimized = minimized;
    bridge.__devos_restoreApp = onRestore;
  }, [minimized, onClose, onOpen, onRestore]);
  return null;
}
