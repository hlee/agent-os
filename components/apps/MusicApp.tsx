'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const tracks = [
  { title: 'Midnight Code Session', artist: 'Lofi Dev', duration: '3:42' },
  { title: 'Stack Overflow Blues', artist: 'The Debuggers', duration: '4:15' },
  { title: 'npm install (feat. node_modules)', artist: 'Package.json', duration: '2:58' },
  { title: 'Merge Conflict', artist: 'Git & The Branches', duration: '5:01' },
  { title: 'Production is Down', artist: 'On-Call Anxiety', duration: '3:33' },
];

export default function MusicApp() {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(22);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress(p => (p >= 100 ? 0 : p + 0.5)), 200);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <div className="p-4 font-mono text-xs h-full flex flex-col" style={{ color: '#e2e8f0' }}>
      <div className="flex items-center gap-3 mb-4">
        <motion.div className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl shrink-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #00D4FF)', boxShadow: '0 0 20px #00D4FF44' }} animate={{ rotate: playing ? 360 : 0 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>🎵</motion.div>
        <div>
          <p className="font-bold text-sm text-white">{tracks[current].title}</p>
          <p className="text-slate-400">{tracks[current].artist}</p>
        </div>
      </div>
      <div className="mb-3">
        <div className="h-1 rounded-full mb-1" style={{ background: '#1e1e2e' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: '#00D4FF' }} />
        </div>
        <div className="flex justify-between text-slate-500">
          <span>{Math.floor(progress * 0.042)}:{String(Math.floor((progress * 2.52) % 60)).padStart(2, '0')}</span>
          <span>{tracks[current].duration}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <button onClick={() => setCurrent(c => (c - 1 + tracks.length) % tracks.length)} className="text-slate-400 hover:text-white text-lg">⏮</button>
        <button onClick={() => setPlaying(p => !p)} className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all hover:scale-105" style={{ background: '#00D4FF', color: '#0a0a0f' }}>{playing ? '⏸' : '▶'}</button>
        <button onClick={() => setCurrent(c => (c + 1) % tracks.length)} className="text-slate-400 hover:text-white text-lg">⏭</button>
      </div>
      <div className="flex-1 overflow-auto space-y-1">
        {tracks.map((t, i) => (
          <button key={i} onClick={() => { setCurrent(i); setPlaying(true); setProgress(0); }} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors hover:bg-white/5" style={i === current ? { background: '#00D4FF15', color: '#00D4FF' } : { color: '#94a3b8' }}>
            <span>{i === current && playing ? '▶' : '○'}</span>
            <span className="flex-1 truncate">{t.title}</span>
            <span className="text-slate-500">{t.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
