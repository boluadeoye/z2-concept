"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const ck = import.meta.env.VITE_WC_CONSUMER_KEY;
const cs = import.meta.env.VITE_WC_CONSUMER_SECRET;
const siteUrl = 'https://sleigh.staymedia.ng';
const isDev = import.meta.env.DEV;
const baseUrl = isDev ? '' : siteUrl;

type User = {
  token: string;
  name: string;
  id: number | null;
  email: string;
} | null;

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
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("z2_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // 1. JWT Handshake
      const authRes = await fetch(`${baseUrl}/wp-json/jwt-auth/v1/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const authData = await authRes.json();
      if (!authRes.ok) throw new Error(authData.message || "Invalid credentials");

      // 2. Fetch WooCommerce Customer ID
      const userRes = await fetch(`${baseUrl}/wp-json/wc/v3/customers?email=${encodeURIComponent(username)}&consumer_key=${ck}&consumer_secret=${cs}`);
      const userData = await userRes.json();
      const customerId = userData.length > 0 ? userData[0].id : null;

      const newUser = {
        token: authData.token,
        name: authData.user_display_name,
        id: customerId,
        email: username
      };

      setUser(newUser);
      localStorage.setItem("z2_user", JSON.stringify(newUser));
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
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
