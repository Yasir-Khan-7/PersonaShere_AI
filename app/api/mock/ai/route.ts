import { NextResponse } from "next/server";
import { ROLE_LABELS, Role } from "@/lib/mockAuth";

const roleVoices: Record<Role, string[]> = {
  finance: [
    "Cash variance within 2% of plan; infra spend is the main lever.",
    "Board-ready summary generated with burn, runway, and top risks.",
  ],
  hr: [
    "Retention risk isolated to backend guild; run stay interviews.",
    "Hiring velocity improved after panel simplification.",
  ],
  operations: [
    "SLA dip correlates to dependency X; propose guardrail rollout.",
    "Automation saved ~486 mins/day across queues.",
  ],
  admin: [
    "RLS policies stubbed; map Clerk session to Supabase claims.",
    "Audit events captured for AI requests in mock log.",
  ],
};

export async function POST(req: Request) {
  const body = (await req.json()) as { prompt?: string; role?: Role };
  const prompt = body.prompt ?? "";
  const role = body.role ?? "finance";

  const snippets = roleVoices[role] ?? [];
  const detail = snippets[Math.floor(Math.random() * snippets.length)] ?? "Mock response ready.";

  const reply = [
    `Role: ${ROLE_LABELS[role]} | Prompt: ${prompt || "No prompt provided"}`,
    detail,
    "Next: connect to Groq Cloud here; add streaming + audit log.",
  ].join("\n\n");

  await new Promise((resolve) => setTimeout(resolve, 400));

  return NextResponse.json({ reply });
}

