'use client';
import { useState } from 'react';

export default function ContactApp() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ subject: '', body: '' });

  return (
    <div className="flex flex-col h-full font-mono text-sm" style={{ color: '#e2e8f0' }}>
      <div className="flex items-center gap-3 px-4 py-2 text-xs" style={{ background: '#0d0d15', borderBottom: '1px solid #1e1e2e' }}>
        <span className="text-slate-500">📬 New Message</span>
      </div>
      {!sent ? (
        <div className="flex-1 p-4 space-y-3">
          <div className="flex items-center gap-2 pb-2" style={{ borderBottom: '1px solid #1e1e2e' }}>
            <span className="text-slate-500 w-16 text-xs">To:</span>
            <span style={{ color: '#00D4FF' }}>ken@agentos.dev</span>
          </div>
          <div className="flex items-center gap-2 pb-2" style={{ borderBottom: '1px solid #1e1e2e' }}>
            <span className="text-slate-500 w-16 text-xs">Subject:</span>
            <input className="flex-1 bg-transparent outline-none text-white text-xs" placeholder="Hey Ken, I have a project for you..." value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
          </div>
          <textarea className="w-full flex-1 bg-transparent outline-none text-slate-300 text-xs resize-none" style={{ minHeight: '180px' }} placeholder="Write your message here..." value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} />
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-4 text-xs text-slate-500">
              <a href="https://github.com/ckz" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub ↗</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn ↗</a>
            </div>
            <button className="px-4 py-1.5 rounded text-xs font-bold transition-all hover:opacity-80" style={{ background: '#00D4FF', color: '#0a0a0f' }} onClick={() => setSent(true)}>Send ✉️</button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-6">
          <span className="text-4xl">✅</span>
          <p className="text-green-400 font-bold">Message sent!</p>
          <p className="text-slate-400 text-xs">Ken will get back to you within 24 hours.</p>
          <button className="mt-2 text-xs text-cyan-400 hover:text-cyan-300" onClick={() => setSent(false)}>← Compose another</button>
        </div>
      )}
    </div>
  );
}
