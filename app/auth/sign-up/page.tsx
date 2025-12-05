"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { ROLE_LABELS, Role } from "@/lib/mockAuth";

const roles: Role[] = ["finance", "hr", "operations", "admin"];

export default function CustomSignUp() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("finance");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;
    setError(null);
    setLoading(true);
    try {
      const created = await signUp.create({
        emailAddress: email,
        password,
      });
      await signUp.update({ publicMetadata: { role } });

      if (created.status === "complete") {
        await setActive({ session: created.createdSessionId });
      } else {
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      }

      // sync Supabase (best effort)
      fetch("/api/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: created.createdUserId, email, role }),
      }).catch(() => {});

      router.push(`/spheres/${role}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign up failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="glass rounded-3xl border border-[color:var(--color-border)]/70 p-8 shadow-glow">
          <p className="text-xs uppercase tracking-wide text-cyan-200">Create account</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Get your Sphere</h1>
          <p className="text-sm text-[color:var(--color-muted)]">
            Sign up with email + password, pick your role, and jump into the matching dashboard.
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="flex flex-col gap-2 text-sm text-white">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-[color:var(--color-border)]/70 bg-black/30 px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white">
              Password
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border border-[color:var(--color-border)]/70 bg-black/30 px-3 py-2 text-sm"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white">
              Role
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="rounded-xl border border-[color:var(--color-border)]/70 bg-black/30 px-3 py-2 text-sm"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
            </label>
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <button
              type="submit"
              disabled={loading || !isLoaded}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

