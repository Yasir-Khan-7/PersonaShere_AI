"use client";

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type Role = "finance" | "hr" | "operations" | "admin";

export const ROLE_LABELS: Record<Role, string> = {
  finance: "Finance",
  hr: "HR",
  operations: "Operations",
  admin: "Admin",
};

export type MockOrganization = {
  id: string;
  name: string;
  domains: string[];
};

export type MockUser = {
  id: string;
  name: string;
  email: string;
  orgIds: string[];
  roles: Role[];
};

type AuthState = {
  user: MockUser | null;
  org: MockOrganization | null;
  role: Role | null;
  loading: boolean;
};

type AuthContextValue = {
  state: AuthState;
  login: (userId: string, orgId: string) => void;
  selectRole: (role: Role) => void;
  logout: () => void;
};

const STORAGE_KEY = "personasphere-mock-auth";

const MOCK_ORGS: MockOrganization[] = [
  { id: "org-acme", name: "Acme Finance Group", domains: ["acme.com"] },
  { id: "org-nova", name: "Nova People Ops", domains: ["nova.hr"] },
];

const MOCK_USERS: MockUser[] = [
  {
    id: "u-ava",
    name: "Ava Reyes",
    email: "ava@acme.com",
    orgIds: ["org-acme"],
    roles: ["finance", "admin"],
  },
  {
    id: "u-eden",
    name: "Eden Kim",
    email: "eden@nova.hr",
    orgIds: ["org-nova"],
    roles: ["hr"],
  },
  {
    id: "u-luca",
    name: "Luca Patel",
    email: "luca@ops.io",
    orgIds: ["org-acme"],
    roles: ["operations"],
  },
];

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>(() => {
    if (typeof window === "undefined") {
      return { user: null, org: null, role: null, loading: true };
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AuthState;
        return { ...parsed, loading: false };
      } catch {
        // ignore parse errors and fall back to defaults
      }
    }
    return { user: null, org: null, role: null, loading: false };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as AuthState;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ ...parsed, loading: false });
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    if (state.loading) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        user: state.user,
        org: state.org,
        role: state.role,
        loading: false,
      }),
    );
  }, [state.user, state.org, state.role, state.loading]);

  const value = useMemo<AuthContextValue>(
    () => ({
      state,
      login: (userId, orgId) => {
        const user = MOCK_USERS.find((u) => u.id === userId) ?? null;
        const org = MOCK_ORGS.find((o) => o.id === orgId) ?? null;
        setState({
          user,
          org,
          role: user?.roles[0] ?? null,
          loading: false,
        });
        router.push("/roles");
      },
      selectRole: (role) => {
        setState((prev) => ({ ...prev, role }));
        router.push(`/spheres/${role}`);
      },
      logout: () => {
        setState({ user: null, org: null, role: null, loading: false });
        localStorage.removeItem(STORAGE_KEY);
        router.push("/");
      },
    }),
    [state, router],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within MockAuthProvider");
  }
  return ctx;
}

export function getOrgOptions() {
  return MOCK_ORGS;
}

export function getUserOptions() {
  return MOCK_USERS;
}

