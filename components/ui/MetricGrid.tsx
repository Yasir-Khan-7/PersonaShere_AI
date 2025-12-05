import SurfaceCard from "./SurfaceCard";
import { Metric } from "@/lib/mockData";

type Props = {
  metrics: Metric[];
};

const TREND_COLORS: Record<Metric["trend"], string> = {
  up: "text-emerald-400",
  down: "text-rose-400",
  flat: "text-amber-300",
};

export default function MetricGrid({ metrics }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <SurfaceCard key={metric.label}>
          <div className="flex items-start justify-between">
            <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
              {metric.label}
            </p>
            {metric.delta ? (
              <span className={`text-xs font-semibold ${metric.trend ? TREND_COLORS[metric.trend] : ""}`}>
                {metric.delta}
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
        </SurfaceCard>
      ))}
    </div>
  );
}

