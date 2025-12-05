import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ROLE_LABELS, Role } from "@/lib/mockAuth";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

async function getRolesForUser(clerkId: string): Promise<Role[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_roles")
    .select("role, users!inner(clerk_id)")
    .eq("users.clerk_id", clerkId)
    .limit(10);

  if (error) {
    console.warn("Supabase role fetch error", error.message);
    return [];
  }
  return (data ?? []).map((row) => row.role as Role);
}

export default async function RolesPage() {
  const { userId } = auth();
  if (!userId) redirect("/auth/sign-in");

  const user = await currentUser();
  const metadataRole = (user?.publicMetadata?.role as Role | undefined) ?? null;

  const roles = await getRolesForUser(userId);
  const availableRoles = roles.length ? roles : (["finance", "hr", "operations", "admin"] as Role[]);

  const destination =
    metadataRole ??
    (availableRoles.length === 1 ? availableRoles[0] : undefined);

  if (destination) {
    redirect(`/spheres/${destination}`);
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="glass rounded-3xl border border-[color:var(--color-border)]/70 p-8 shadow-glow">
          <p className="text-xs uppercase tracking-wide text-cyan-200">Role-based Spheres</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Choose a Sphere</h1>
          <p className="text-sm text-[color:var(--color-muted)]">
            Roles fetched from Supabase `user_roles` by Clerk session. Pick one to enter the dashboard.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {availableRoles.map((role) => (
              <Link
                key={role}
                href={`/spheres/${role}`}
                className="rounded-2xl border border-[color:var(--color-border)]/70 bg-white/5 px-5 py-4 text-left text-white transition hover:border-cyan-400/60 hover:shadow-glow"
              >
                <p className="text-sm uppercase tracking-wide text-[color:var(--color-muted)]">
                  {ROLE_LABELS[role]}
                </p>
                <p className="text-base font-semibold">Enter {ROLE_LABELS[role]} Sphere</p>
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-1 rounded-xl border border-[color:var(--color-border)]/70 bg-black/30 px-4 py-3 text-sm text-[color:var(--color-muted)]">
            <span>User: {user?.fullName ?? "Unknown"} · Email: {user?.primaryEmailAddress?.emailAddress}</span>
            <span>Roles: {availableRoles.map((r) => ROLE_LABELS[r]).join(", ")}</span>
            <Link href="/auth/sign-in" className="text-xs text-cyan-300 hover:text-white">
              Switch account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

