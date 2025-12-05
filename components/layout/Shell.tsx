"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ROLE_LABELS, Role, useAuth } from "@/lib/mockAuth";

type ShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

const sphereLinks: { label: string; href: string; role: Role }[] = [
  { label: "Finance", href: "/spheres/finance", role: "finance" },
  { label: "HR", href: "/spheres/hr", role: "hr" },
  { label: "Operations", href: "/spheres/operations", role: "operations" },
  { label: "Admin", href: "/spheres/admin", role: "admin" },
];

export function Shell({ title, subtitle, children }: ShellProps) {
  const pathname = usePathname();
  const { state, logout } = useAuth();
  const activeRole = pathname.split("/").pop() as Role | undefined;

  return (
    <div className="min-h-screen text-foreground">
      <div className="fixed inset-0 grid-overlay opacity-70 pointer-events-none" />
      <header className="sticky top-0 z-30 border-b border-[color:var(--color-border)]/60 backdrop-blur bg-[color:var(--color-surface)]/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400/80 to-fuchsia-500/80 shadow-glow" />
            <div>
              <p className="text-sm text-[color:var(--color-muted)]">PersonaSphere AI</p>
              <p className="text-lg font-semibold">{title}</p>
              {subtitle ? (
                <p className="text-xs text-[color:var(--color-muted)]">{subtitle}</p>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {state.role ? (
              <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-[color:var(--color-muted)]">
                {ROLE_LABELS[state.role]}
              </span>
            ) : null}
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-medium">{state.user?.name ?? "Guest"}</span>
              <span className="text-xs text-[color:var(--color-muted)]">
                {state.org?.name ?? "No organization"}
              </span>
            </div>
            <button
              onClick={logout}
              className="rounded-lg border border-[color:var(--color-border)] px-3 py-1 text-sm hover:border-cyan-400/70 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl items-center gap-2 px-6 pb-4">
          {sphereLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-white/10 text-white border border-cyan-400/60 shadow-glow"
                    : "text-[color:var(--color-muted)] hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="ml-auto text-xs text-[color:var(--color-muted)]">
            {activeRole ? `Sphere: ${ROLE_LABELS[activeRole]}` : "Choose a sphere"}
          </div>
        </nav>
      </header>
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-16 pt-6">{children}</main>
    </div>
  );
}

