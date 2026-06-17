import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [data, setData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", msg: "" });
    const result = await login(data.username, data.password);
    if (result.success) {
      setStatus({ type: "success", msg: "Welcome back!" });
      setTimeout(() => navigate("/"), 1000);
    } else {
      setStatus({ type: "error", msg: result.error || "Invalid credentials" });
    }
  };

  return (
    <AuthLayout>
      <div className="w-full text-left">
        {/* Fluid font size + nowrap to prevent breaking */}
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-black mb-10 tracking-tight whitespace-nowrap">
          Welcome back
        </h1>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Username or email address</label>
            <input 
              type="text" 
              required
              value={data.username}
              onChange={(e) => setData({...data, username: e.target.value})}
              className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-2xl px-6 py-5 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Password</label>
            <input 
              type="password" 
              required
              value={data.password}
              onChange={(e) => setData({...data, password: e.target.value})}
              className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-2xl px-6 py-5 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all" 
            />
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-black/20 text-[#FF6B35] focus:ring-0" />
              <span className="text-xs font-bold text-black/60 group-hover:text-black transition-colors">Remember me</span>
            </label>
            <Link to="/forgot-password" title="Reset your password" className="text-xs font-bold text-[#FF6B35] hover:opacity-80 transition-opacity">
              Forgot password
            </Link>
          </div>

          {/* Title Case Button */}
          <button 
            disabled={status.type === "loading"}
            className="w-full bg-[#FF6B35] text-white py-6 rounded-full text-[13px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-[#FF6B35]/20 flex items-center justify-center"
          >
            {status.type === "loading" ? <Loader2 className="animate-spin" size={20} /> : "Log in"}
          </button>

          <p className="text-left text-xs font-bold text-black/40 mt-6">
            Are you new here? <Link to="/register" className="text-[#FF6B35] underline">Sign up</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
