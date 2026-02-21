# 🤖 AgentOS — AI-Powered Developer Portfolio

An interactive developer portfolio that simulates a desktop OS, powered by a real AI agent with agentic tool-calling capabilities.

**[Live Demo →](https://agent-os.vercel.app)**

## What Makes This Special

This isn't just a portfolio — it's a working AI agent demo. The AI assistant living inside the OS can:

- **Navigate the OS autonomously** — it opens apps, shows projects, and navigates to relevant sections using tool calling
- **Answer questions** about the developer's skills, projects, and experience
- **Generate code snippets** on demand to demonstrate technical ability
- **Fetch live GitHub data** — real repos, stars, and profile info via the GitHub API

## Tech Stack

- **Next.js 15** (App Router)
- **Vercel AI SDK** — streaming responses + tool calling
- **OpenAI GPT-4o-mini** — the brain behind the agent
- **Framer Motion** — smooth animations
- **Tailwind CSS v4** — styling
- **TypeScript** — end to end

## Architecture

```
┌─────────────────────────────────────────┐
│              AgentOS Desktop             │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ │
│  │ About   │ │ Projects │ │ AI Agent │ │
│  │         │ │          │ │ (Chat)   │ │
│  └─────────┘ └──────────┘ └──────────┘ │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ │
│  │ Skills  │ │ GitHub   │ │ Finder   │ │
│  │         │ │ (Live)   │ │          │ │
│  └─────────┘ └──────────┘ └──────────┘ │
└─────────────────────────────────────────┘
                    │
         ┌──────────┴──────────┐
         │   Vercel AI SDK     │
         │   Tool Calling      │
         │   ┌──────────────┐  │
         │   │ open_app     │  │
         │   │ system_info  │  │
         │   │ generate_code│  │
         │   │ search_proj  │  │
         │   └──────────────┘  │
         └─────────────────────┘
```

## Getting Started

```bash
npm install
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key for the AI agent |
| `GITHUB_USERNAME` | No | GitHub username for live data |
| `GITHUB_TOKEN` | No | GitHub PAT (increases rate limit) |

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ckz/agent-os)

## License

MIT
