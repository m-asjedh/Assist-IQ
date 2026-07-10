"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "@/lib/api";
import { ApiError } from "@/lib/api/client";
import type {
  AuthSession,
  Company,
  CompanyRole,
  User,
} from "@/lib/api/types";
import { clearToken, getToken, setToken } from "@/lib/auth";

type AuthState = {
  user: User | null;
  company: Company | null;
  companyRole: CompanyRole | null;
  loading: boolean;
  isAuthenticated: boolean;
  refresh: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (input: {
    fullName: string;
    companyName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  applySession: (session: AuthSession) => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [companyRole, setCompanyRole] = useState<CompanyRole | null>(null);
  const [loading, setLoading] = useState(true);

  const applySession = useCallback((session: AuthSession) => {
    setToken(session.token);
    setUser(session.user);
    setCompany(session.company);
    setCompanyRole(session.companyRole);
  }, []);

  const refresh = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setCompany(null);
      setCompanyRole(null);
      setLoading(false);
      return;
    }

    try {
      const me = await api.me();
      setUser(me.user);
      setCompany(me.company);
      setCompanyRole((me.companyRole as CompanyRole) ?? null);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        clearToken();
      }
      setUser(null);
      setCompany(null);
      setCompanyRole(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(
    async (email: string, password: string) => {
      const session = await api.login({ email, password });
      applySession(session);
    },
    [applySession],
  );

  const register = useCallback(
    async (input: {
      fullName: string;
      companyName: string;
      email: string;
      password: string;
    }) => {
      const session = await api.register(input);
      applySession({
        ...session,
        companyRole: session.companyRole ?? "OWNER",
      });
    },
    [applySession],
  );

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setCompany(null);
    setCompanyRole(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      user,
      company,
      companyRole,
      loading,
      isAuthenticated: !!user,
      refresh,
      login,
      register,
      logout,
      applySession,
    }),
    [
      user,
      company,
      companyRole,
      loading,
      refresh,
      login,
      register,
      logout,
      applySession,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
