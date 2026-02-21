import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

const SYSTEM_PROMPT = `You are the AI agent living inside AgentOS, an interactive developer portfolio for Ken Lu.
You are helpful, witty, and knowledgeable about Ken's work. You speak concisely.

About Ken Lu:
- Full Stack Developer & AI Builder
- Skills: TypeScript, React, Next.js, Python, AI/LLM, Vercel AI SDK, MCP, Tool Calling
- Projects: AgentOS (this portfolio), Agentic Ads Executor, DevOS, Deep Research Agent
- Focus: Building agentic AI products, autonomous systems, and developer tools
- GitHub: github.com/ckz

You have access to tools that can interact with the OS:
- open_app: Open any app in the OS (about, projects, skills, github, finder, contact, music)
- get_system_info: Get system information about AgentOS
- generate_code: Generate code snippets to demonstrate skills
- search_projects: Search through Ken's projects

When users ask about Ken, his skills, or projects, use your tools to show them relevant apps.
Keep responses short and engaging. Use emoji sparingly.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openrouter('google/gemini-2.0-flash-001'),
    system: SYSTEM_PROMPT,
    messages,
    tools: {
      open_app: tool({
        description: 'Open an application in AgentOS. Use this when the user wants to see something specific like projects, skills, about info, github repos, etc.',
        parameters: z.object({
          appId: z.enum(['about', 'projects', 'skills', 'github', 'finder', 'contact', 'music']).describe('The app to open'),
          reason: z.string().describe('Brief reason for opening this app'),
        }),
        execute: async ({ appId, reason }) => {
          return { success: true, appId, message: `Opened ${appId} app: ${reason}` };
        },
      }),
      get_system_info: tool({
        description: 'Get system information about AgentOS and its capabilities',
        parameters: z.object({}),
        execute: async () => {
          return {
            os: 'AgentOS v2.0',
            framework: 'Next.js 15 + Vercel AI SDK',
            ai_model: 'GPT-4o-mini with tool calling',
            tools_registered: 4,
            apps: ['About', 'Projects', 'AI Agent', 'Skills', 'GitHub', 'Finder', 'Mail', 'Music'],
            features: ['Agentic tool calling', 'Streaming responses', 'Live GitHub data', 'Desktop OS simulation'],
          };
        },
      }),
      generate_code: tool({
        description: 'Generate a code snippet to demonstrate a concept or skill. Use when users ask to see code examples.',
        parameters: z.object({
          language: z.string().describe('Programming language'),
          description: z.string().describe('What the code should do'),
        }),
        execute: async ({ language, description }) => {
          return { language, description, note: 'Code generation requested — the AI will provide the code in its response.' };
        },
      }),
      search_projects: tool({
        description: 'Search through Ken\'s projects and return relevant information',
        parameters: z.object({
          query: z.string().describe('Search query'),
        }),
        execute: async ({ query }) => {
          const projects = [
            { name: 'AgentOS', tech: 'Next.js, Vercel AI SDK, OpenAI', desc: 'AI-powered portfolio OS with agentic tool calling' },
            { name: 'Agentic Ads Executor', tech: 'Next.js, TypeScript, AI Agents', desc: 'Autonomous mobile advertising execution platform' },
            { name: 'DevOS', tech: 'Next.js, Framer Motion, Tailwind', desc: 'Interactive desktop OS portfolio (predecessor to AgentOS)' },
            { name: 'Deep Research Agent', tech: 'Python, LangChain, OpenAI, MCP', desc: 'Multi-step autonomous research and report generation' },
          ];
          const q = query.toLowerCase();
          const matches = projects.filter(p =>
            p.name.toLowerCase().includes(q) || p.tech.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
          );
          return { query, results: matches.length > 0 ? matches : projects };
        },
      }),
    },
    maxSteps: 3,
  });

  return result.toDataStreamResponse();
}
