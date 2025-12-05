"use client";

import { useState } from "react";
import { Role } from "./mockAuth";

export type ChatMessage = { id: string; role: "user" | "ai"; content: string };

export function useMockAI(role: Role | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (prompt: string) => {
    if (!prompt.trim() || !role) return;
    setError(null);
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    try {
      const res = await fetch("/api/mock/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, role }),
      });
      if (!res.ok) throw new Error("Mock AI error");
      const data = (await res.json()) as { reply: string };
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "ai",
        content: data.reply,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, send };
}

