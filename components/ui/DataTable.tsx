import SurfaceCard from "./SurfaceCard";
import { TableRow } from "@/lib/mockData";

type Props = {
  rows: TableRow[];
  title?: string;
};

export default function DataTable({ rows, title = "Dashboard Signals" }: Props) {
  return (
    <SurfaceCard title={title}>
      <div className="overflow-hidden rounded-xl border border-[color:var(--color-border)]/70">
        <table className="w-full text-sm text-left">
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-[color:var(--color-border)]/50 last:border-none">
                <td className="px-4 py-3 font-medium text-white">{row.name}</td>
                <td className="px-4 py-3 text-[color:var(--color-muted)]">{row.value}</td>
                <td className="px-4 py-3 text-right text-xs text-emerald-300">{row.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SurfaceCard>
  );
}

