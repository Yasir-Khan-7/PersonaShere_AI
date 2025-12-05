# PersonaSphere AI — Live Auth + Supabase Ready

Role-based AI Spheres (Finance, HR, Operations, Admin) now wired with Clerk sign-in/sign-up. Supabase helpers and schema are included; data still mocked until you populate the DB.

## Run locally

```bash
npm install
npm run lint
npm run dev
# open http://localhost:3000
```

Copy `env.example` to `.env.local` and fill Clerk + Supabase keys.

## Navigating the prototype

- `Landing (/ )` → overview + CTAs.
- `Sign in (/sign-in)` / `Sign up (/sign-up)` → Clerk-hosted auth.
- `Roles (/roles)` → fetches roles from Supabase `user_roles` by Clerk user; falls back to all roles if none.
- `Spheres (/spheres/[role])` → Finance, HR, Operations, Admin dashboards with mock widgets and AI console.

## Key implementation notes

- **Clerk**: `app/layout.tsx` wraps with `ClerkProvider`; `middleware.ts` protects `/roles` and `/spheres`. Sign-in/up routes live at `/sign-in` and `/sign-up`.
- **Supabase**: `lib/supabaseServer.ts` and `lib/supabaseClient.ts` use `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Schema/RLS scaffold in `supabase/schema.sql`.
- **Roles page**: queries `user_roles` joined to `users` by Clerk `userId`; falls back to all roles if none returned.
- **Mock AI + dashboards**: `app/api/mock/ai/route.ts` stays mocked; `components/SpherePage.tsx` + `lib/mockData.ts` supply UI/demo data.
- **UI shell**: `components/layout/Shell.tsx` uses Clerk user info + SignOut.

## How to wire real data

- **Supabase schema**: run `supabase/schema.sql` in your project. Insert users with Clerk IDs into `public.users`, map roles in `public.user_roles`.
- **RLS**: adjust policies in `schema.sql` to match your JWT claims; currently references `auth.jwt()->>'sub'` for Clerk `sub`.
- **Data fetching**: replace `lib/mockData.ts` usage with Supabase queries per role; ensure RLS allows reads for authenticated users.
- **Groq Cloud**: swap `app/api/mock/ai/route.ts` to call Groq; log prompts/responses to `ai_history`.

## Files to start with

- Auth/middleware: `app/layout.tsx`, `middleware.ts`, `app/sign-in/*`, `app/sign-up/*`
- Supabase helpers: `lib/supabaseServer.ts`, `lib/supabaseClient.ts`, `supabase/schema.sql`
- UI/dashboards: `components/SpherePage.tsx`, `lib/mockData.ts`, `app/spheres/*`
- AI mock: `app/api/mock/ai/route.ts`, `lib/useMockAI.ts`
