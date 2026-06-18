"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../lib/woocommerce";

type User = { token: string; name: string; id: number | null; email: string; } | null;

type AuthContextType = {
  user: User;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("z2_user");
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) { localStorage.removeItem("z2_user"); }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const result = await loginUser(username, password);
    if (result.success) {
      const newUser = { token: result.token!, name: result.name!, id: result.id, email: username };
      setUser(newUser);
      localStorage.setItem("z2_user", JSON.stringify(newUser));
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("z2_user");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
