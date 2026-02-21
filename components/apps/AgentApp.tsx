'use client';
import { useChat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import { AppId } from '../types';

const SUGGESTIONS = [
  'Tell me about Ken',
  'What projects has Ken built?',
  'Show me Ken\'s skills',
  'What tech stack is this built with?',
  'Open the GitHub app',
  'Generate a React hook example',
];

export default function AgentApp() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    onToolCall: ({ toolCall }) => {
      if (toolCall.toolName === 'open_app') {
        const args = toolCall.args as { appId: string };
        if (args.appId) {
          window.dispatchEvent(new CustomEvent<{ id: AppId }>('devos:open-app', { detail: { id: args.appId as AppId } }));
        }
      }
    },
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    handleInputChange({ target: { value: text } } as React.ChangeEvent<HTMLInputElement>);
    setTimeout(() => {
      const form = inputRef.current?.closest('form');
      form?.requestSubmit();
    }, 50);
  };

  return (
    <div className="flex flex-col h-full font-mono text-sm" style={{ color: '#e2e8f0' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-2 shrink-0" style={{ background: '#0d0d15', borderBottom: '1px solid #1e1e2e' }}>
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-slate-400">AI Agent — powered by GPT-4o-mini + Tool Calling</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="text-center py-6">
              <div className="text-4xl mb-3">🤖</div>
              <p className="text-slate-300 text-sm font-bold">AgentOS AI Assistant</p>
              <p className="text-slate-500 text-xs mt-1">I can navigate this OS, show you projects, generate code, and more.</p>
              <p className="text-slate-600 text-xs mt-1">I use agentic tool calling — watch me open apps autonomously.</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left px-3 py-2 rounded-lg text-xs transition-all hover:border-cyan-500/40"
                  style={{ background: '#0a0a0f', border: '1px solid #1e1e2e', color: '#94a3b8' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${m.role === 'user' ? 'text-white' : 'text-slate-300'}`}
              style={{
                background: m.role === 'user' ? '#00D4FF20' : '#0a0a0f',
                border: `1px solid ${m.role === 'user' ? '#00D4FF44' : '#1e1e2e'}`,
              }}
            >
              {m.role === 'assistant' && <span className="text-cyan-400 font-bold">🤖 Agent: </span>}

              {/* Render tool invocations */}
              {m.parts?.map((part, i) => {
                if (part.type === 'text' && part.text) {
                  return <span key={i}>{part.text}</span>;
                }
                if (part.type === 'tool-invocation') {
                  const inv = part as unknown as { toolInvocation: { toolName: string; args: Record<string, string>; state: string } };
                  const ti = inv.toolInvocation;
                  return (
                    <div key={i} className="my-2 px-2 py-1.5 rounded text-xs" style={{ background: '#7c3aed15', border: '1px solid #7c3aed44' }}>
                      <span className="text-purple-400">⚡ Tool: </span>
                      <span className="text-purple-300">{ti.toolName}</span>
                      {ti.args && Object.keys(ti.args).length > 0 && (
                        <span className="text-slate-500"> ({Object.entries(ti.args).map(([k, v]) => `${k}: ${v}`).join(', ')})</span>
                      )}
                      {ti.state === 'result' && <span className="text-green-400 ml-2">✓</span>}
                    </div>
                  );
                }
                return null;
              })}

              {/* Fallback for messages without parts */}
              {!m.parts?.some(p => p.type === 'text' || p.type === 'tool-invocation') && m.content && (
                <span>{m.content}</span>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg px-3 py-2 text-xs" style={{ background: '#0a0a0f', border: '1px solid #1e1e2e' }}>
              <span className="text-cyan-400">🤖 </span>
              <span className="typing-dot-1">●</span>
              <span className="typing-dot-2">●</span>
              <span className="typing-dot-3">●</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="shrink-0 flex items-center gap-2 px-4 py-3" style={{ borderTop: '1px solid #1e1e2e', background: '#0d0d15' }}>
        <input
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          placeholder="Ask the AI agent anything..."
          className="flex-1 bg-transparent outline-none text-white text-xs font-mono"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-3 py-1.5 rounded text-xs font-bold transition-all hover:opacity-80 disabled:opacity-30"
          style={{ background: '#00D4FF', color: '#0a0a0f' }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
