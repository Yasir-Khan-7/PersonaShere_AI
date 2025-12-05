"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useUser } from "@clerk/nextjs";
import { Role } from "@/lib/mockAuth";

export default function CustomSignIn() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isSignedIn && user) {
    const role = (user.publicMetadata?.role as Role | undefined) ?? "finance";
    router.replace(`/spheres/${role}`);
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn) return;
    setError(null);
    setLoading(true);
    try {
      const attempt = await signIn.create({
        identifier: email,
        password,
      });
      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.push("/roles");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign in failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="glass rounded-3xl border border-[color:var(--color-border)]/70 p-8 shadow-glow">
          <p className="text-xs uppercase tracking-wide text-cyan-200">Welcome back</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Sign in to your Sphere</h1>
          <p className="text-sm text-[color:var(--color-muted)]">
            Use your email and password. We will route you to the dashboard matching your saved role.
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
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <button
              type="submit"
              disabled={loading || !isLoaded}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

