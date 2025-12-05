export type Metric = { label: string; value: string; delta?: string; trend?: "up" | "down" | "flat" };
export type Insight = { title: string; detail: string; tag?: string };
export type TableRow = { name: string; value: string; status?: string; change?: string };

export const sphereData = {
  finance: {
    hero: "AI-driven finance sphere tuned for margin, runway, and variance alerts.",
    metrics: [
      { label: "Runway", value: "14.2 mo", delta: "+1.1 mo", trend: "up" },
      { label: "Burn", value: "$382k", delta: "-6.5%", trend: "down" },
      { label: "MRR", value: "$1.12M", delta: "+8.4%", trend: "up" },
      { label: "Variance", value: "2.1%", delta: "stable", trend: "flat" },
    ],
    insights: [
      { title: "Collections", detail: "DSO dropped to 28 days after ops workflow change.", tag: "cash" },
      { title: "Margins", detail: "Gross margin improved 2.4% MoM driven by infra credits.", tag: "margin" },
      { title: "Forecast", detail: "Runway extends past Q2 2026 if burn stays < $400k.", tag: "forecast" },
    ],
    table: [
      { name: "Top Customer", value: "$312k | Atlas Corp", change: "+6.2%" },
      { name: "Churn Risk", value: "3 logos", change: "-1 this week" },
      { name: "AR Variance", value: "$42k under plan", change: "-8%" },
      { name: "Payables", value: "$189k due <30d", change: "+$12k" },
    ],
    prompts: [
      "Explain the variance between actuals and plan for infra spend.",
      "Draft a board-ready cash flow summary for this month.",
      "What levers reduce burn without hitting roadmap delivery?",
    ],
  },
  hr: {
    hero: "People analytics with talent risk surfacing and hiring velocity tracking.",
    metrics: [
      { label: "Headcount", value: "182", delta: "+6", trend: "up" },
      { label: "Attrition", value: "8.1%", delta: "-0.6%", trend: "down" },
      { label: "Hiring Velocity", value: "24 d", delta: "-3 d", trend: "up" },
      { label: "Engagement", value: "7.9 / 10", delta: "+0.4", trend: "up" },
    ],
    insights: [
      { title: "Risk Pods", detail: "Backend guild shows 2 resignation signals; suggest stay interviews.", tag: "retention" },
      { title: "Hiring", detail: "Data platform role pipeline healthy; design pipeline thin (2 candidates).", tag: "pipeline" },
      { title: "Compliance", detail: "SOC2 training completion at 96%; 5 stragglers auto-reminded.", tag: "compliance" },
    ],
    table: [
      { name: "Team Pulse", value: "Backend 7.2 | Mobile 8.4 | Ops 7.9", change: "+0.3 avg" },
      { name: "Open Roles", value: "12 open", change: "4 in offer" },
      { name: "Time to Fill", value: "24 days median", change: "-3 days" },
      { name: "Diversity", value: "42% women/non-binary", change: "+2%" },
    ],
    prompts: [
      "Summarize exit interview themes and recommend mitigation.",
      "Draft hiring plan for next quarter given current velocity.",
      "Generate talking points for all-hands on engagement uptick.",
    ],
  },
  operations: {
    hero: "Operational sphere with SLA, automation, and incident hygiene.",
    metrics: [
      { label: "SLA", value: "99.2%", delta: "-0.3%", trend: "down" },
      { label: "Incidents", value: "3 open", delta: "-2 WoW", trend: "up" },
      { label: "Automation", value: "61% flows", delta: "+4%", trend: "up" },
      { label: "Tickets", value: "182 in queue", delta: "-18%", trend: "up" },
    ],
    insights: [
      { title: "Bottleneck", detail: "North America queue spikes at 9am PT; stagger handoff to EMEA.", tag: "throughput" },
      { title: "Quality", detail: "KB deflection up 6%; prioritize top 5 missing runbooks.", tag: "kb" },
      { title: "Reliability", detail: "Two Sev-2 incidents relate to same dependency; propose guardrail.", tag: "reliability" },
    ],
    table: [
      { name: "Sev-2 Aging", value: "14h avg", change: "-3h" },
      { name: "Automation Saves", value: "486 mins/day", change: "+42 mins" },
      { name: "NPS", value: "63", change: "+5" },
      { name: "Escalations", value: "2 this week", change: "-1" },
    ],
    prompts: [
      "Summarize incident INC-238 context and blast radius for execs.",
      "Recommend 3 playbooks to improve handoffs and reduce aging.",
      "Draft ops review bullets for tomorrow’s standup.",
    ],
  },
  admin: {
    hero: "Admin control plane for org setup, roles, and policy governance.",
    metrics: [
      { label: "Orgs", value: "2 active", delta: "multi-tenant ready", trend: "flat" },
      { label: "Users", value: "18 mock users", delta: "+2", trend: "up" },
      { label: "Policies", value: "RBAC enforced", delta: "UI + API", trend: "flat" },
      { label: "Audit Trail", value: "Enabled", delta: "mock events", trend: "flat" },
    ],
    insights: [
      { title: "Onboarding", detail: "Add SSO mapping per domain; Clerk hook placeholder wired.", tag: "auth" },
      { title: "Data", detail: "Supabase row-level policies stubbed for demos.", tag: "db" },
      { title: "AI Guardrails", detail: "Groq requests flow through mock route with audit logging.", tag: "ai" },
    ],
    table: [
      { name: "Pending Invites", value: "5", change: "awaiting acceptance" },
      { name: "Role Coverage", value: "Finance/HR/Ops/Admin", change: "4/4 ready" },
      { name: "API Keys", value: "Rotated 3d ago", change: "healthy" },
      { name: "Alerts", value: "0 critical", change: "stable" },
    ],
    prompts: [
      "Outline steps to map Clerk session to Supabase RLS claims.",
      "Draft onboarding checklist for a new organization.",
      "Summarize audit events for last 24h in plain English.",
    ],
  },
};

