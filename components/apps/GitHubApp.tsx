'use client';
import { useState, useEffect } from 'react';

interface Repo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
  fork: boolean;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
}

export default function GitHubApp() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('/api/github?type=user'),
          fetch('/api/github?type=repos'),
        ]);
        if (userRes.ok) setUser(await userRes.json());
        if (reposRes.ok) {
          const data: Repo[] = await reposRes.json();
          setRepos(data.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 8));
        }
      } catch { /* fallback to empty */ }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full font-mono text-sm text-slate-500">
        <span>Fetching from GitHub API...</span>
      </div>
    );
  }

  return (
    <div className="p-4 font-mono text-xs h-full overflow-auto" style={{ color: '#e2e8f0' }}>
      {user && (
        <div className="flex items-center gap-4 mb-4 p-3 rounded-lg" style={{ background: '#0a0a0f', border: '1px solid #1e1e2e' }}>
          <img src={user.avatar_url} alt="" className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-bold" style={{ color: '#00D4FF' }}>@{user.login}</p>
            <p className="text-slate-400">{user.bio || 'No bio'}</p>
            <div className="flex gap-3 mt-1 text-slate-500">
              <span>{user.public_repos} repos</span>
              <span>{user.followers} followers</span>
            </div>
          </div>
        </div>
      )}
      <p className="text-slate-500 mb-3">$ gh repo list --sort stars</p>
      <div className="space-y-2">
        {repos.map(r => (
          <a key={r.name} href={r.html_url} target="_blank" rel="noreferrer" className="block p-3 rounded-lg transition-all hover:border-cyan-500/40" style={{ background: '#0a0a0f', border: '1px solid #1e1e2e' }}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm" style={{ color: '#00D4FF' }}>{r.name}</span>
              <div className="flex items-center gap-2 text-slate-500">
                {r.language && <span className="px-1.5 py-0.5 rounded" style={{ background: '#7c3aed15', border: '1px solid #7c3aed44', color: '#a78bfa' }}>{r.language}</span>}
                {r.stargazers_count > 0 && <span>⭐ {r.stargazers_count}</span>}
              </div>
            </div>
            <p className="text-slate-400 truncate">{r.description || 'No description'}</p>
          </a>
        ))}
        {repos.length === 0 && <p className="text-slate-500">No repos found. Set GITHUB_USERNAME in .env.local</p>}
      </div>
    </div>
  );
}
