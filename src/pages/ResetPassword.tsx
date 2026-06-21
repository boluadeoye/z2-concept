import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import { finalizePasswordReset } from "../lib/woocommerce";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: "idle", msg: "" });

  const key = searchParams.get("key");
  const login = searchParams.get("login");

  useEffect(() => {
    if (!key || !login) {
      setStatus({ type: "error", msg: "Invalid Or Expired Reset Link." });
    }
  }, [key, login]);

  const handleFinalize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key || !login) return;

    setStatus({ type: "loading", msg: "" });
    const result = await finalizePasswordReset({ key, login, password });

    if (result.success) {
      setStatus({ type: "success", msg: "Password Updated! Redirecting To Login..." });
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setStatus({ type: "error", msg: result.message || "Reset Failed. Try Again." });
    }
  };

  return (
    <AuthLayout>
      <div className="w-full text-left">
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-black mb-6 tracking-tight whitespace-nowrap">
          New Password
        </h1>
        <p className="text-black/50 text-sm mb-10 leading-relaxed max-w-[40ch]">
          Please enter your new secure password below.
        </p>

        {status.msg && (
          <div className={`flex items-center gap-3 p-4 mb-8 rounded-xl border animate-in fade-in slide-in-from-top-2 ${
            status.type === "success" ? "bg-green-50 border-green-100 text-green-700" : "bg-red-50 border-red-100 text-red-700"
          }`}>
            {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <p className="text-[10px] font-bold uppercase tracking-widest">{status.msg}</p>
          </div>
        )}

        <form onSubmit={handleFinalize} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">New Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-2xl px-6 pr-14 py-5 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-black/30 hover:text-[#FF6B35]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={status.type === "loading" || !key} 
            className="w-full bg-black text-white py-6 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#FF6B35] transition-all shadow-xl flex items-center justify-center"
          >
            {status.type === "loading" ? <Loader2 className="animate-spin" size={20} /> : "Update Password"}
          </button>
          <p className="text-left text-xs font-bold text-black/40 mt-6">
            Changed Your Mind? <Link to="/login" className="text-[#FF6B35] underline">Back To Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
