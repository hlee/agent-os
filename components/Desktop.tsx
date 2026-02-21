'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootScreen from './BootScreen';
import MenuBar from './MenuBar';
import Dock from './Dock';
import WindowManager from './WindowManager';

const DESKTOP_ICONS = [
  { label: 'README.md', emoji: '📄' },
  { label: 'agents/', emoji: '🤖' },
  { label: 'node_modules', emoji: '📁' },
  { label: 'Trash', emoji: '🗑️' },
];

export default function Desktop() {
  const [booted, setBooted] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 30% 40%, #0d1117 0%, #050508 60%, #0a0a0f 100%)' }}
      onContextMenu={e => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY }); }}
      onClick={() => setContextMenu(null)}
    >
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#1e1e2e 1px, transparent 1px), linear-gradient(90deg, #1e1e2e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <BootScreen onDone={() => setBooted(true)} />
      <AnimatePresence>
        {booted && (
          <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <MenuBar />
            <div className="absolute top-10 right-4 flex flex-col gap-4 pt-4">
              {DESKTOP_ICONS.map(icon => (
                <div key={icon.label} className="flex flex-col items-center gap-1 cursor-pointer group w-16">
                  <div className="text-3xl group-hover:scale-110 transition-transform">{icon.emoji}</div>
                  <span className="text-xs text-slate-400 text-center leading-tight">{icon.label}</span>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 top-7 bottom-20">
              <WindowManager />
            </div>
            <Dock />
            {contextMenu && (
              <div className="absolute z-50 rounded-lg py-1 text-xs font-mono" style={{ left: contextMenu.x, top: contextMenu.y, background: '#111118', border: '1px solid #2e2e3e', boxShadow: '0 8px 24px rgba(0,0,0,0.6)', minWidth: 180 }}>
                {['New File', 'Open AI Agent', '─────────', 'System Info', 'About AgentOS'].map(item => (
                  <div key={item} className={`px-4 py-1.5 ${item.startsWith('─') ? 'text-slate-700 cursor-default' : 'text-slate-300 hover:bg-white/5 cursor-pointer'}`}>{item}</div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
