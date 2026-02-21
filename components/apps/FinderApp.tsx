'use client';
import { useState } from 'react';

type FileNode = { name: string; icon: string; children?: FileNode[]; content?: string };

const tree: FileNode[] = [{
  name: 'Home', icon: '🏠', children: [
    { name: 'Documents', icon: '📁', children: [
      { name: 'resume.pdf', icon: '📄', content: 'Ken Lu — Full Stack Developer & AI Builder\n\nSpecialty: AI/LLM, Next.js, TypeScript\nFocus: Agentic AI, Tool Calling, MCP' },
      { name: 'cover_letter.md', icon: '📝', content: 'I build AI-powered products.\nThis portfolio is proof.' },
    ]},
    { name: 'Projects', icon: '💼', children: [
      { name: 'agent-os/', icon: '🤖', content: 'AI-powered portfolio OS — you are inside it right now 🤯' },
      { name: 'agentic-ads/', icon: '📊', content: 'Autonomous ad execution platform' },
      { name: 'deep-research/', icon: '🔬', content: 'Multi-step research agent' },
    ]},
    { name: '.secret', icon: '🕵️', children: [
      { name: 'easter_egg.txt', icon: '🥚', content: '🎉 You found it!\n\nCongrats on your curiosity.\nTry asking the AI Agent about me.\n\n🍪' },
    ]},
  ],
}];

export default function FinderApp() {
  const [path, setPath] = useState<FileNode[]>([tree[0]]);
  const [preview, setPreview] = useState<string | null>(null);
  const current = path[path.length - 1];

  return (
    <div className="flex h-full font-mono text-xs" style={{ color: '#e2e8f0' }}>
      <div className="w-32 shrink-0 p-3 space-y-1" style={{ background: '#0d0d15', borderRight: '1px solid #1e1e2e' }}>
        <p className="text-slate-500 text-xs mb-2">Favorites</p>
        {['Home', 'Projects'].map(name => (
          <button key={name} className="w-full flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer hover:bg-white/5 text-slate-400 text-left" onClick={() => {
            if (name === 'Home') { setPath([tree[0]]); return; }
            const node = tree[0].children?.find(c => c.name === name);
            if (node) setPath([tree[0], node]);
          }}>
            <span>📁</span><span>{name}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-1 px-4 py-2 text-xs text-slate-500" style={{ borderBottom: '1px solid #1e1e2e' }}>
          {path.map((p, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span>/</span>}
              <button className="hover:text-cyan-400 transition-colors" onClick={() => setPath(prev => prev.slice(0, i + 1))}>{p.name}</button>
            </span>
          ))}
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-3 overflow-auto">
            <div className="grid grid-cols-3 gap-2">
              {current.children?.map(node => (
                <button key={node.name} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors text-center"
                  onDoubleClick={() => { if (node.children) setPath(p => [...p, node]); else setPreview(node.content ?? ''); }}
                  onClick={() => !node.children && setPreview(node.content ?? '')}>
                  <span className="text-2xl">{node.icon}</span>
                  <span className="text-xs text-slate-400 break-all leading-tight">{node.name}</span>
                </button>
              ))}
            </div>
          </div>
          {preview !== null && (
            <div className="w-48 p-3 text-xs text-slate-400 overflow-auto" style={{ borderLeft: '1px solid #1e1e2e', background: '#0a0a0f' }}>
              <p className="text-slate-500 mb-2">Preview:</p>
              <pre className="whitespace-pre-wrap leading-relaxed">{preview}</pre>
              <button className="mt-3 text-cyan-400 hover:text-cyan-300" onClick={() => setPreview(null)}>✕ close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
