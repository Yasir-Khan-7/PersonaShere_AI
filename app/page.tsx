import Link from "next/link";

const badges = ["Secure by Clerk", "Supabase roles", "Groq-ready console"];

const stats = [
  { label: "Roles live", value: "Finance · HR · Ops · Admin" },
  { label: "Auth", value: "Email + password (Clerk)" },
  { label: "Data", value: "Supabase orgs & RLS" },
  { label: "AI", value: "Groq integration ready" },
];

const highlights = [
  {
    title: "Launch-ready hero",
    desc: "Premium, product-first hero with strong CTA and trust cues to mirror top-tier SaaS landings.",
  },
  {
    title: "Guided entry",
    desc: "Email/password sign-up with role selection drops users directly into their Sphere.",
  },
  {
    title: "Enterprise footing",
    desc: "Clerk sessions, Supabase RLS scaffolding, and protected routes as defaults—not add-ons.",
  },
  {
    title: "Upgrade path",
    desc: "Replace mock AI with Groq Cloud, swap demo data for Supabase content without touching UI.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <section className="relative overflow-hidden rounded-3xl border border-[color:var(--color-border)]/60 bg-[color:var(--color-card)]/80 px-8 py-12 shadow-glow">
          <div className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-500/25 via-transparent to-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 -bottom-10 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-500/25 via-transparent to-cyan-500/20 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3 flex flex-col gap-5 text-white">
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.08em] text-cyan-200">
                <span className="rounded-full border border-cyan-400/50 px-3 py-1">PersonaSphere AI</span>
                {badges.map((badge) => (
                  <span key={badge} className="rounded-full border border-white/10 px-3 py-1 text-[color:var(--color-muted)]">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-[color:var(--color-muted)]">Modern SaaS landing</p>
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                  Role-based AI workspaces built on a premium, launch-ready experience.
                </h1>
                <p className="text-lg text-[color:var(--color-muted)] max-w-3xl">
                  Elevate the first impression: crystal-clear value, decisive CTAs, and trust-building detail.
                  Auth, roles, and AI wiring are ready; plug in Groq and Supabase data to go live.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/auth/sign-up"
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-glow"
                >
                  Get started
                </Link>
                <Link
                  href="/auth/sign-in"
                  className="rounded-xl border border-[color:var(--color-border)]/80 px-6 py-3 text-sm text-[color:var(--color-muted)] hover:border-cyan-400/60"
                >
                  Sign in
                </Link>
                <Link
                  href="/roles"
                  className="rounded-xl border border-transparent px-4 py-3 text-sm text-cyan-200 underline-offset-4 hover:underline"
                >
                  View spheres
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--color-border)]/70 bg-white/5 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-[color:var(--color-muted)]">
                    Conversion focus
                  </p>
                  <p className="text-lg font-semibold">Hero + CTA + proof in one fold</p>
                </div>
                <div className="rounded-2xl border border-[color:var(--color-border)]/70 bg-white/5 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-[color:var(--color-muted)]">
                    Production footing
                  </p>
                  <p className="text-lg font-semibold">Clerk auth · Supabase RLS · Groq-ready</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="relative h-full overflow-hidden rounded-2xl border border-[color:var(--color-border)]/70 bg-white/5 p-6">
                <div className="pointer-events-none absolute -right-12 -top-8 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 blur-2xl" />
                <div className="flex flex-col gap-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[color:var(--color-muted)]">Snapshot</p>
                  <div className="rounded-xl border border-[color:var(--color-border)]/70 bg-black/30 p-4">
                    <p className="text-sm text-[color:var(--color-muted)]">Live stack</p>
                    <p className="text-lg font-semibold text-white">Clerk + Supabase + Groq-ready UI</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {stats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-[color:var(--color-border)]/60 bg-white/5 px-4 py-3"
                      >
                        <p className="text-[11px] uppercase tracking-[0.08em] text-[color:var(--color-muted)]">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-[color:var(--color-border)]/70 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 px-4 py-3 text-sm text-[color:var(--color-muted)]">
                    Roles route to tailored Spheres. Swap mock data for Supabase queries; connect Groq for live AI.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((feature, idx) => (
            <div
              key={feature.title}
              className="glass flex h-full flex-col gap-2 rounded-2xl border border-[color:var(--color-border)]/70 p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-[color:var(--color-muted)]">0{idx + 1}</p>
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-glow" />
              </div>
              <p className="text-sm font-semibold text-white">{feature.title}</p>
              <p className="text-sm text-[color:var(--color-muted)]">{feature.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
