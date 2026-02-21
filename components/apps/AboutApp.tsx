'use client';

const specs = [
  { label: 'CPU',       value: 'Brain™ v2.0 @ 3.2 GHz (LLM-Enhanced)' },
  { label: 'RAM',       value: '∞ GB (Context Window Cache)' },
  { label: 'Storage',   value: '1 TB GitHub Repos + Vector DB' },
  { label: 'OS',        value: 'AgentOS 2.0 (AI-Powered)' },
  { label: 'AI Model',  value: 'GPT-4o + Tool Calling' },
  { label: 'Location',  value: 'Earth, Milky Way (remote)' },
  { label: 'Status',    value: '🟢 Available for hire' },
  { label: 'Agents',    value: '7 tools registered' },
];

export default function AboutApp() {
  return (
    <div className="p-6 h-full font-mono text-sm" style={{ color: '#e2e8f0' }}>
      <div className="flex gap-6 mb-6">
        <div className="shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center text-5xl" style={{ background: 'linear-gradient(135deg, #00D4FF22, #7c3aed22)', border: '1px solid #00D4FF44' }}>
          👨‍💻
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#00D4FF' }}>Ken Lu</h1>
          <p className="text-slate-400 mt-1">Full Stack Developer & AI Builder</p>
          <p className="text-slate-500 text-xs mt-1">Building agentic AI products · Open to opportunities</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {['Next.js', 'TypeScript', 'AI/LLM', 'Vercel AI SDK', 'Python'].map(t => (
              <span key={t} className="px-2 py-0.5 rounded text-xs" style={{ background: '#00D4FF15', border: '1px solid #00D4FF44', color: '#00D4FF' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-lg p-4" style={{ background: '#0a0a0f', border: '1px solid #1e1e2e' }}>
        <p className="text-xs text-slate-500 mb-3">$ system_profiler SPHardwareDataType</p>
        {specs.map(s => (
          <div key={s.label} className="flex gap-2 text-xs py-0.5">
            <span className="w-24 shrink-0" style={{ color: '#00D4FF' }}>{s.label}:</span>
            <span className="text-slate-300">{s.value}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-slate-400 text-xs leading-relaxed">
        I build AI-powered products and developer tools. This portfolio is itself an AI agent demo —
        open the AI Agent app in the dock and ask it anything. It can navigate this OS, show you my
        projects, and even generate code. Built with Next.js, Vercel AI SDK, and agentic tool-calling patterns.
      </p>
    </div>
  );
}
