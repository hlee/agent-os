'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  'Initializing AgentOS kernel v2.0...',
  'Loading neural network modules...',
  'Mounting /dev/brain (LLM-enhanced)...',
  'Starting ai-agent.service... [OK]',
  'Loading React 19 components...',
  'Compiling TypeScript... [OK]',
  'Connecting to OpenAI API...',
  'Initializing tool registry (7 tools)...',
  'Deploying to Vercel... [OK]',
  'AI Agent ready. Welcome, visitor.',
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines(l => [...l, BOOT_LINES[i]]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setDone(true), 400);
        setTimeout(() => onDone(), 900);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-[9998]"
          style={{ background: '#050508' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🤖</div>
            <h1 className="text-3xl font-bold font-mono" style={{ color: '#00D4FF' }}>AgentOS</h1>
            <p className="text-slate-500 text-sm font-mono mt-1">v2.0.0 — AI-Powered Portfolio</p>
          </div>
          <div className="w-96 font-mono text-xs space-y-1 mb-6 text-left">
            {lines.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-slate-400">
                <span style={{ color: '#00D4FF' }}>[{String(i + 1).padStart(2, '0')}]</span> {l}
              </motion.div>
            ))}
          </div>
          <div className="w-96 h-1 rounded-full" style={{ background: '#1e1e2e' }}>
            <motion.div className="h-full rounded-full" style={{ background: '#00D4FF' }} animate={{ width: `${progress}%` }} transition={{ duration: 0.2 }} />
          </div>
          <p className="text-slate-600 text-xs font-mono mt-2">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
