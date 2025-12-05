# PersonaSphere AI — Mock Prototype

Role-based AI Spheres (Finance, HR, Operations, Admin) with mocked Clerk auth, Supabase role/org mapping, and Groq Cloud responses. Swap the mocks for real services to go live.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Navigating the prototype

- `Landing (/ )` → overview + CTAs.
- `Login (/login)` → pick a seeded mock user/org (simulates Clerk session + Supabase org).
- `Roles (/roles)` → select a role (simulates role claims + RLS).
- `Spheres (/spheres/[role])` → Finance, HR, Operations, Admin dashboards with mock widgets and AI console.

## Key implementation notes

- **Mock auth/role context**: `lib/mockAuth.tsx` stores user/org/role in localStorage, provides `useAuth` hook, and stubs Clerk + Supabase role selection.
- **Mock AI**: `app/api/mock/ai/route.ts` returns Groq-like responses; `lib/useMockAI.ts` handles prompt submission + UI state.
- **Dashboards**: `components/SpherePage.tsx` + role pages under `app/spheres/*` render metrics, insights, tables, and AI console using `lib/mockData.ts`.
- **UI shell**: `components/layout/Shell.tsx` + cards in `components/ui/*` (Tailwind 4, glassmorphism, gradient accents).

## How to replace mocks

- **Clerk → real auth**: replace `MockAuthProvider` with Clerk’s provider, map session claims to org/role, and remove localStorage fallback.
- **Supabase → data**: swap `lib/mockData.ts` with Supabase fetches; enforce RLS per org/role on queries. Add server actions or route handlers.
- **Groq Cloud → AI**: replace `app/api/mock/ai/route.ts` with calls to Groq; stream responses and log audit metadata (user, org, role, prompt).

## Files to start with

- Auth/context: `lib/mockAuth.tsx`, `app/providers.tsx`
- AI route/hook: `app/api/mock/ai/route.ts`, `lib/useMockAI.ts`
- Dashboards: `components/SpherePage.tsx`, `lib/mockData.ts`, `app/spheres/*`
- Entrances: `app/page.tsx`, `app/login/page.tsx`, `app/roles/page.tsx`
