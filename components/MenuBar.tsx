'use client';
import { useState, useEffect } from 'react';

export default function MenuBar() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-7 flex items-center justify-between px-4 text-xs z-50"
      style={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1e1e2e' }}
    >
      <div className="flex items-center gap-4 text-slate-300">
        <span className="font-bold" style={{ color: '#00D4FF' }}>🤖 AgentOS</span>
        <span className="text-slate-500">File</span>
        <span className="text-slate-500">Edit</span>
        <span className="text-slate-500">View</span>
        <span className="text-slate-500">Agent</span>
        <span className="text-slate-500">Help</span>
      </div>
      <div className="flex items-center gap-3 text-slate-400">
        <span className="text-green-400 text-xs">● AI Online</span>
        <span>🔋 98%</span>
        <span>📶</span>
        <span className="text-slate-300">{date}</span>
        <span className="font-bold text-white">{time}</span>
      </div>
    </div>
  );
}
