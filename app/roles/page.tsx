"use client";

import Link from "next/link";
import { ROLE_LABELS, useAuth } from "@/lib/mockAuth";

export default function RolesPage() {
  const { state, selectRole } = useAuth();
  const availableRoles = state.user?.roles ?? [];

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="glass rounded-3xl border border-[color:var(--color-border)]/70 p-8 shadow-glow">
          <p className="text-xs uppercase tracking-wide text-cyan-200">Role-based Spheres</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Choose a Sphere</h1>
          <p className="text-sm text-[color:var(--color-muted)]">
            This page simulates Supabase role claims with Clerk session validation. Pick a role to jump
            into its Sphere dashboard.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {availableRoles.map((role) => (
              <button
                key={role}
                onClick={() => selectRole(role)}
                className="rounded-2xl border border-[color:var(--color-border)]/70 bg-white/5 px-5 py-4 text-left text-white transition hover:border-cyan-400/60 hover:shadow-glow"
              >
                <p className="text-sm uppercase tracking-wide text-[color:var(--color-muted)]">
                  {ROLE_LABELS[role]}
                </p>
                <p className="text-base font-semibold">Enter {ROLE_LABELS[role]} Sphere</p>
              </button>
            ))}
          </div>
          {availableRoles.length === 0 ? (
            <p className="mt-4 text-sm text-rose-300">
              No roles assigned. Return to login and pick a seeded mock user.
            </p>
          ) : null}
          <div className="mt-5 flex items-center justify-between rounded-xl border border-[color:var(--color-border)]/70 bg-black/30 px-4 py-3 text-sm text-[color:var(--color-muted)]">
            <span>
              User: {state.user?.name ?? "Guest"} · Org: {state.org?.name ?? "Unknown"} · Roles:{" "}
              {availableRoles.map((r) => ROLE_LABELS[r]).join(", ")}
            </span>
            <Link href="/login" className="text-xs text-cyan-300 hover:text-white">
              Switch user
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

