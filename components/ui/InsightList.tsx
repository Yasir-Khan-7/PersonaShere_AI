import SurfaceCard from "./SurfaceCard";
import { Insight } from "@/lib/mockData";

type Props = {
  insights: Insight[];
};

export default function InsightList({ insights }: Props) {
  return (
    <SurfaceCard title="AI Insights">
      <ul className="space-y-3">
        {insights.map((insight) => (
          <li
            key={insight.title}
            className="rounded-xl border border-[color:var(--color-border)]/70 bg-white/5 px-4 py-3 text-white"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
                {insight.tag ?? "insight"}
              </span>
            </div>
            <p className="text-sm font-semibold">{insight.title}</p>
            <p className="text-sm text-[color:var(--color-muted)]">{insight.detail}</p>
          </li>
        ))}
      </ul>
    </SurfaceCard>
  );
}

