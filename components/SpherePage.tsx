"use client";

import { ROLE_LABELS, Role } from "@/lib/mockAuth";
import { sphereData } from "@/lib/mockData";
import { Shell } from "./layout/Shell";
import MetricGrid from "./ui/MetricGrid";
import InsightList from "./ui/InsightList";
import DataTable from "./ui/DataTable";
import PromptList from "./ui/PromptList";
import AIChatPanel from "./ui/AIChatPanel";

type Props = {
  role: Role;
};

export default function SpherePage({ role }: Props) {
  const data = sphereData[role];

  if (!data) return null;

  return (
    <Shell title={`${ROLE_LABELS[role]} Sphere`} subtitle={data.hero}>
      <div className="flex flex-col gap-4 rounded-2xl border border-[color:var(--color-border)]/70 bg-white/5 p-6 shadow-glow">
        <p className="text-lg font-semibold text-white">{data.hero}</p>
        <p className="text-sm text-[color:var(--color-muted)]">
          Widgets, insights, and AI console are mocked. Replace data sources with Supabase tables and
          Groq endpoints to activate production flows.
        </p>
      </div>

      <MetricGrid metrics={data.metrics} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <InsightList insights={data.insights} />
          <DataTable rows={data.table} />
        </div>
        <AIChatPanel role={role} starter={data.prompts[0]} />
      </div>

      <PromptList prompts={data.prompts} />
    </Shell>
  );
}

