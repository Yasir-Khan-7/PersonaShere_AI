import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Service role key missing; skipping Supabase sync" },
      { status: 200 },
    );
  }

  const { clerkId, email, role } = (await req.json()) as {
    clerkId?: string;
    email?: string;
    role?: string;
  };

  if (!clerkId || !email || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // upsert user
  const { data: userData, error: userError } = await supabaseAdmin
    .from("users")
    .upsert({ clerk_id: clerkId, email })
    .select("id")
    .single();

  if (userError || !userData) {
    return NextResponse.json({ error: userError?.message ?? "User upsert failed" }, { status: 500 });
  }

  // ensure an organization for the user (personal org)
  const orgName = `${email.split("@")[0]} Org`;
  const { data: orgData, error: orgError } = await supabaseAdmin
    .from("organizations")
    .upsert({ name: orgName }, { onConflict: "name" })
    .select("id")
    .single();

  if (orgError || !orgData) {
    return NextResponse.json({ error: orgError?.message ?? "Org upsert failed" }, { status: 500 });
  }

  const { error: roleError } = await supabaseAdmin
    .from("user_roles")
    .upsert(
      {
        user_id: userData.id,
        organization_id: orgData.id,
        role,
        permissions: [],
      },
      { onConflict: "user_id,organization_id,role" },
    );

  if (roleError) {
    return NextResponse.json({ error: roleError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

