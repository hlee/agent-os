'use client';

const projects = [
  {
    name: 'AgentOS',
    desc: 'This portfolio. An AI-powered desktop OS where an LLM agent can navigate, open apps, and answer questions using tool calling.',
    stack: ['Next.js', 'Vercel AI SDK', 'OpenAI', 'Tailwind'],
    stars: 0,
    status: '🟢 Live',
    emoji: '🤖',
  },
  {
    name: 'Agentic Ads Executor',
    desc: 'AI-powered mobile advertising execution platform with autonomous campaign management and optimization.',
    stack: ['Next.js', 'TypeScript', 'AI Agents', 'Vercel'],
    stars: 0,
    status: '🟢 Live',
    emoji: '📊',
  },
  {
    name: 'DevOS',
    desc: 'Interactive developer portfolio simulating a desktop OS. The predecessor to AgentOS.',
    stack: ['Next.js', 'Framer Motion', 'Tailwind', 'TypeScript'],
    stars: 0,
    status: '🟢 Live',
    emoji: '💻',
  },
  {
    name: 'Deep Research Agent',
    desc: 'Autonomous research agent that performs multi-step web research, analysis, and report generation.',
    stack: ['Python', 'LangChain', 'OpenAI', 'MCP'],
    stars: 0,
    status: '🟡 Beta',
    emoji: '🔬',
  },
];

export default function ProjectsApp() {
  return (
    <div className="p-4 font-mono text-sm overflow-auto h-full" style={{ color: '#e2e8f0' }}>
      <p className="text-xs text-slate-500 mb-4">$ ls -la ~/projects/ | sort -k5 -rn</p>
      <div className="grid gap-3">
        {projects.map(p => (
          <div key={p.name} className="rounded-lg p-4 transition-all hover:border-cyan-500/40" style={{ background: '#0a0a0f', border: '1px solid #1e1e2e' }}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{p.emoji}</span>
                <span className="font-bold" style={{ color: '#00D4FF' }}>{p.name}</span>
                <span className="text-xs text-slate-500">{p.status}</span>
              </div>
              {p.stars > 0 && <div className="flex items-center gap-1 text-xs text-slate-500"><span>⭐</span><span>{p.stars}</span></div>}
            </div>
            <p className="text-slate-400 text-xs mb-3 leading-relaxed">{p.desc}</p>
            <div className="flex gap-1 flex-wrap">
              {p.stack.map(t => (
                <span key={t} className="px-1.5 py-0.5 rounded text-xs" style={{ background: '#7c3aed15', border: '1px solid #7c3aed44', color: '#a78bfa' }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
