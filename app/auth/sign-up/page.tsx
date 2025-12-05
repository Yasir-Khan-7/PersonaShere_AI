"use client";

import { SignUp } from "@clerk/nextjs";

// Switch to Clerk's built-in SignUp to avoid CAPTCHA/render issues on custom flows.
export default function CustomSignUp() {
  return (
    <div className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-xl rounded-3xl border border-[color:var(--color-border)]/70 bg-[color:var(--color-card)]/80 p-6 shadow-glow">
        <SignUp />
      </div>
    </div>
  );
}

