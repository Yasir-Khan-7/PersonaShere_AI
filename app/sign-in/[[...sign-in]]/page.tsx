"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="glass rounded-3xl border border-[color:var(--color-border)]/70 p-6 shadow-glow">
        <SignIn routing="path" />
      </div>
    </div>
  );
}

