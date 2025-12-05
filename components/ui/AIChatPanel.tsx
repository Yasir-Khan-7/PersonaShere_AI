"use client";

import { FormEvent, useState } from "react";
import SurfaceCard from "./SurfaceCard";
import { ChatMessage, useMockAI } from "@/lib/useMockAI";
import { Role } from "@/lib/mockAuth";

type Props = {
  role: Role | null;
  starter?: string;
};

function MessageBubble({ message }: { message: ChatMessage }) {
  const isAI = message.role === "ai";
  return (
    <div
      className={`rounded-2xl px-4 py-3 text-sm ${
        isAI
          ? "bg-white/5 border border-[color:var(--color-border)]/70 text-white"
          : "bg-cyan-500/20 border border-cyan-400/50 text-white"
      }`}
    >
      <p className="text-[color:var(--color-muted)] text-xs mb-1 uppercase tracking-wide">
        {isAI ? "Groq (mock)" : "You"}
      </p>
      <p className="whitespace-pre-line">{message.content}</p>
    </div>
  );
}

export default function AIChatPanel({ role, starter }: Props) {
  const { messages, loading, error, send } = useMockAI(role);
  const [prompt, setPrompt] = useState(starter ?? "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(prompt);
    setPrompt("");
  };

  return (
    <SurfaceCard
      title="AI Console"
      action={<span className="text-xs text-[color:var(--color-muted)]">Groq Cloud mock</span>}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
          {messages.length === 0 ? (
            <p className="text-sm text-[color:var(--color-muted)]">
              Try a prompt to see how Groq-backed responses will render here. Responses are mocked for
              this prototype.
            </p>
          ) : (
            messages.map((m) => <MessageBubble key={m.id} message={m} />)
          )}
          {loading ? <p className="text-xs text-cyan-300">Thinking...</p> : null}
          {error ? <p className="text-xs text-rose-400">Error: {error}</p> : null}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask for a summary, forecast, or insight…"
            className="min-h-[88px] w-full rounded-xl border border-[color:var(--color-border)]/70 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/70"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-[color:var(--color-muted)]">
              Role context: {role ?? "not selected"}
            </span>
            <button
              type="submit"
              disabled={loading || !role}
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-glow disabled:opacity-50"
            >
              {loading ? "Generating…" : "Send to AI"}
            </button>
          </div>
        </form>
      </div>
    </SurfaceCard>
  );
}

