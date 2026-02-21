import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AgentOS — AI-Powered Developer Portfolio',
  description: 'An interactive developer portfolio powered by an AI agent. Built with Next.js, Vercel AI SDK, and agentic tool-calling patterns.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
