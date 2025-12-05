import Link from "next/link";
import { ROLE_LABELS } from "@/lib/mockAuth";

const features = [
  "Mocked Clerk login + Supabase org/role selection",
  "Role-based spheres: Finance, HR, Operations, Admin",
  "Groq Cloud style AI console (mocked) with prompt starters",
  "Tailwind UI shell ready for real data wiring",
];

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="glass shadow-glow rounded-3xl border border-[color:var(--color-border)]/70 p-10 text-white">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-cyan-200">
            <span className="rounded-full border border-cyan-400/50 px-3 py-1">PersonaSphere AI</span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              Roles: {Object.values(ROLE_LABELS).join(" · ")}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">Mock prototype</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Role-based AI Spheres for Finance, HR, Ops, and Admin.
          </h1>
          <p className="mt-3 text-lg text-[color:var(--color-muted)]">
            Fully mocked flows for authentication, role routing, dashboards, and Groq-style AI responses.
            Swap mocks for Clerk, Supabase, and Groq Cloud to go live.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold shadow-glow"
            >
              Start mock login
            </Link>
            <Link
              href="/roles"
              className="rounded-xl border border-[color:var(--color-border)]/80 px-5 py-3 text-sm text-[color:var(--color-muted)] hover:border-cyan-400/60"
            >
              Jump to role selection
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature}
              className="glass rounded-2xl border border-[color:var(--color-border)]/70 p-5 text-sm text-[color:var(--color-muted)]"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
