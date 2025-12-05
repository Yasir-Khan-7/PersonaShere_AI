"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getOrgOptions, getUserOptions, useAuth } from "@/lib/mockAuth";

export default function LoginPage() {
  const users = getUserOptions();
  const orgs = getOrgOptions();
  const { login } = useAuth();

  const [userId, setUserId] = useState(users[0]?.id ?? "");
  const [orgId, setOrgId] = useState(orgs[0]?.id ?? "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(userId, orgId);
  };

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-xl space-y-6">
        <div className="glass rounded-3xl border border-[color:var(--color-border)]/70 p-8 shadow-glow">
          <p className="text-xs uppercase tracking-wide text-cyan-200">Mocked Clerk</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Login & Organization</h1>
          <p className="text-sm text-[color:var(--color-muted)]">
            This flow mimics Clerk + Supabase session hand-off. Pick a user and organization; you will
            land on role selection next.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="flex flex-col gap-2 text-sm text-white">
              User
              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="rounded-xl border border-[color:var(--color-border)]/70 bg-black/30 px-3 py-2 text-sm"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} · {user.email}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-white">
              Organization
              <select
                value={orgId}
                onChange={(e) => setOrgId(e.target.value)}
                className="rounded-xl border border-[color:var(--color-border)]/70 bg-black/30 px-3 py-2 text-sm"
              >
                {orgs.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-glow"
            >
              Continue to roles
            </button>
          </form>
          <Link
            href="/"
            className="mt-4 inline-block text-xs text-[color:var(--color-muted)] hover:text-white"
          >
            Back to landing
          </Link>
        </div>
      </div>
    </div>
  );
}

