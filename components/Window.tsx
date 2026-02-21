'use client';
import { Rnd } from 'react-rnd';
import { WindowState } from './types';

interface Props {
  state: WindowState;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (w: number, h: number) => void;
}

export default function Window({ state, children, onClose, onMinimize, onToggleMaximize, onFocus, onMove, onResize }: Props) {
  return (
    <Rnd
      size={{ width: state.width, height: state.height }}
      position={{ x: state.x, y: state.y }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-titlebar"
      style={{ zIndex: state.zIndex, position: 'absolute' }}
      disableDragging={state.isMaximized}
      enableResizing={!state.isMaximized}
      onMouseDown={onFocus}
      onDragStop={(_, d) => onMove(d.x, d.y)}
      onResizeStop={(_, __, ref, ___, pos) => {
        onResize(parseInt(ref.style.width), parseInt(ref.style.height));
        onMove(pos.x, pos.y);
      }}
    >
      <div
        className="flex flex-col h-full rounded-xl overflow-hidden shadow-2xl"
        style={{ background: '#111118', border: '1px solid #1e1e2e', boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,212,255,0.05)' }}
      >
        <div className="window-titlebar flex items-center gap-2 px-4 py-3 shrink-0" style={{ background: '#0d0d15', borderBottom: '1px solid #1e1e2e' }}>
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" title="Close" />
          <button onClick={onMinimize} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" title="Minimize" />
          <button onClick={onToggleMaximize} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" title={state.isMaximized ? 'Restore' : 'Maximize'} />
          <span className="ml-3 text-xs text-slate-400 font-mono">{state.title}</span>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </Rnd>
  );
}
