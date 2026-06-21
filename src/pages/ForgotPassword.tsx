import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import { sendPasswordResetEmail } from "../lib/woocommerce";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "idle", msg: "" });

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", msg: "" });
    
    const result = await sendPasswordResetEmail(email);
    if (result.success) {
      setStatus({ type: "success", msg: "Reset Link Sent To Your Email!" });
    } else {
      setStatus({ type: "error", msg: result.message || "User Not Found" });
    }
  };

  return (
    <AuthLayout>
      <div className="w-full text-left">
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-black mb-6 tracking-tight whitespace-nowrap">
          Forget Password
        </h1>
        <p className="text-black/50 text-sm mb-10 leading-relaxed max-w-[40ch]">
          Lost your password? Please enter your username or email address.
        </p>

        {status.msg && (
          <div className={`flex items-center gap-3 p-4 mb-8 rounded-xl border animate-in fade-in slide-in-from-top-2 ${
            status.type === "success" ? "bg-green-50 border-green-100 text-green-700" : "bg-red-50 border-red-100 text-red-700"
          }`}>
            {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <p className="text-[10px] font-bold uppercase tracking-widest">{status.msg}</p>
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Username Or Email Address</label>
            <input 
              type="text" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-2xl px-6 py-5 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all" 
            />
          </div>
          <button 
            type="submit" 
            disabled={status.type === "loading" || status.type === "success"} 
            className="w-full bg-black text-white py-6 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#FF6B35] transition-all shadow-xl flex items-center justify-center"
          >
            {status.type === "loading" ? <Loader2 className="animate-spin" size={20} /> : "Reset Password"}
          </button>
          <p className="text-left text-xs font-bold text-black/40 mt-6">
            Remembered It? <Link to="/login" className="text-[#FF6B35] underline">Back To Login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
