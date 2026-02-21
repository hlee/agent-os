'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppId, DevosWindowBridge } from './types';

const APPS: { id: AppId; emoji: string; label: string }[] = [
  { id: 'about',    emoji: '👤', label: 'About' },
  { id: 'projects', emoji: '💼', label: 'Projects' },
  { id: 'agent',    emoji: '🤖', label: 'AI Agent' },
  { id: 'skills',   emoji: '🧠', label: 'Skills' },
  { id: 'github',   emoji: '🐙', label: 'GitHub' },
  { id: 'finder',   emoji: '📁', label: 'Finder' },
  { id: 'contact',  emoji: '📧', label: 'Mail' },
  { id: 'music',    emoji: '🎵', label: 'Music' },
];

export default function Dock() {
  const [hovered, setHovered] = useState<AppId | null>(null);

  const open = (id: AppId) => {
    const bridge = window as Window & DevosWindowBridge;
    bridge.__devos_openApp?.(id);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-end gap-2 px-4 py-2 rounded-2xl"
        style={{ background: 'rgba(17,17,24,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
      >
        {APPS.map(app => (
          <div key={app.id} className="relative flex flex-col items-center">
            {hovered === app.id && (
              <div className="absolute -top-8 px-2 py-1 rounded text-xs whitespace-nowrap" style={{ background: '#1e1e2e', color: '#e2e8f0', border: '1px solid #2e2e3e' }}>
                {app.label}
              </div>
            )}
            <motion.button
              className={`text-2xl flex items-center justify-center rounded-xl cursor-pointer ${app.id === 'agent' ? 'ai-glow' : ''}`}
              style={{ width: 48, height: 48, background: app.id === 'agent' ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.05)' }}
              whileHover={{ scale: 1.3, y: -8 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onHoverStart={() => setHovered(app.id)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => open(app.id)}
            >
              {app.emoji}
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
}
