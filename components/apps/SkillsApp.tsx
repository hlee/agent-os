'use client';
import { motion } from 'framer-motion';

const skills = [
  { name: 'TypeScript',       level: 95, color: '#3178c6' },
  { name: 'React / Next.js',  level: 92, color: '#61dafb' },
  { name: 'AI / LLM',         level: 90, color: '#00D4FF' },
  { name: 'Node.js',          level: 88, color: '#68a063' },
  { name: 'Python',           level: 85, color: '#ffd43b' },
  { name: 'Vercel AI SDK',    level: 82, color: '#ffffff' },
  { name: 'PostgreSQL',       level: 78, color: '#336791' },
  { name: 'Docker / DevOps',  level: 74, color: '#2496ed' },
];

const badges = ['MCP', 'Tool Calling', 'RAG', 'LangChain', 'Git', 'CI/CD', 'REST APIs', 'GraphQL', 'Redis', 'AWS', 'Figma', 'Linux'];

export default function SkillsApp() {
  return (
    <div className="p-6 font-mono text-sm h-full overflow-auto" style={{ color: '#e2e8f0' }}>
      <p className="text-xs text-slate-500 mb-4">$ cat ~/.skills | sort -rn</p>
      <div className="space-y-3 mb-6">
        {skills.map((s, i) => (
          <div key={s.name}>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: s.color }}>{s.name}</span>
              <span className="text-slate-500">{s.level}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: '#1e1e2e' }}>
              <motion.div className="h-full rounded-full" style={{ background: s.color }} initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }} />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg p-4" style={{ background: '#0a0a0f', border: '1px solid #1e1e2e' }}>
        <p className="text-xs text-slate-500 mb-3">Also familiar with:</p>
        <div className="flex flex-wrap gap-2">
          {badges.map(b => (
            <span key={b} className="px-2 py-1 rounded text-xs" style={{ background: '#00D4FF10', border: '1px solid #00D4FF30', color: '#00D4FF' }}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
