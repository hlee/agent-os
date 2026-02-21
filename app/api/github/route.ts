import { NextRequest, NextResponse } from 'next/server';

const USERNAME = process.env.GITHUB_USERNAME || 'ckz';
const TOKEN = process.env.GITHUB_TOKEN;

const headers: HeadersInit = {
  'Accept': 'application/vnd.github.v3+json',
  ...(TOKEN ? { 'Authorization': `Bearer ${TOKEN}` } : {}),
};

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type') || 'repos';

  try {
    if (type === 'user') {
      const res = await fetch(`https://api.github.com/users/${USERNAME}`, { headers, next: { revalidate: 3600 } });
      if (!res.ok) return NextResponse.json({ error: 'Failed to fetch user' }, { status: res.status });
      return NextResponse.json(await res.json());
    }

    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=30&sort=updated`, { headers, next: { revalidate: 3600 } });
    if (!res.ok) return NextResponse.json({ error: 'Failed to fetch repos' }, { status: res.status });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ error: 'GitHub API error' }, { status: 500 });
  }
}
