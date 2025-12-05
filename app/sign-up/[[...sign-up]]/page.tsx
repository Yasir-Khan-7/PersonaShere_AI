"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="glass rounded-3xl border border-[color:var(--color-border)]/70 p-6 shadow-glow">
        <SignUp routing="path" />
      </div>
    </div>
  );
}

