export type AppId = 'about' | 'projects' | 'agent' | 'skills' | 'finder' | 'contact' | 'github' | 'music';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  restoreRect?: { x: number; y: number; width: number; height: number };
}

export interface DevosWindowBridge {
  __devos_openApp?: (id: AppId) => void;
  __devos_restoreApp?: (id: AppId) => void;
  __devos_closeApp?: (id: AppId) => void;
  __devos_minimized?: WindowState[];
}
