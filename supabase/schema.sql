-- PersonaSphere AI baseline schema

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  domain text,
  created_at timestamptz default now()
);

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  clerk_id text unique not null,
  email text not null,
  created_at timestamptz default now()
);

create table if not exists public.user_roles (
  user_id uuid references public.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  role text not null check (role in ('finance', 'hr', 'operations', 'admin')),
  permissions jsonb default '[]'::jsonb,
  primary key (user_id, organization_id, role)
);

create table if not exists public.sphere_content (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  role text not null check (role in ('finance', 'hr', 'operations', 'admin')),
  type text not null,
  content jsonb not null,
  created_at timestamptz default now()
);

create table if not exists public.ai_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  prompt text not null,
  response text,
  role text,
  created_at timestamptz default now()
);

-- RLS scaffolding (adjust policies per your security needs)
alter table public.users enable row level security;
alter table public.organizations enable row level security;
alter table public.user_roles enable row level security;
alter table public.sphere_content enable row level security;
alter table public.ai_history enable row level security;

-- Example policies (replace with Clerk JWT claims mapping)
-- Example assumes a claim 'sub' containing clerk_id
create policy "users self" on public.users
  for select using (clerk_id = auth.jwt()->>'sub');

create policy "user roles by user" on public.user_roles
  for select using (exists (
    select 1 from public.users u where u.id = user_roles.user_id and u.clerk_id = auth.jwt()->>'sub'
  ));

create policy "content by user" on public.sphere_content
  for select using (exists (
    select 1 from public.users u where u.id = sphere_content.user_id and u.clerk_id = auth.jwt()->>'sub'
  ));

create policy "ai history by user" on public.ai_history
  for select using (exists (
    select 1 from public.users u where u.id = ai_history.user_id and u.clerk_id = auth.jwt()->>'sub'
  ));

-- Seed helper queries (optional)
-- insert into public.organizations (name, domain) values ('Acme Finance Group','acme.com');
-- insert into public.users (clerk_id, email) values ('clerk_user_id_here','user@acme.com');
-- insert into public.user_roles (user_id, organization_id, role) values (...);

