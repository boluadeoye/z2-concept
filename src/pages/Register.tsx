import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import { registerUser } from "../lib/woocommerce";

export default function RegisterPage() {
  const [data, setData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", msg: "" });
    const result = await registerUser(data);
    if (result.success) {
      setStatus({ type: "success", msg: "Account created! Redirecting..." });
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setStatus({ type: "error", msg: result.error || "Registration failed" });
    }
  };

  return (
    <AuthLayout>
      <div className="w-full text-left">
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-black mb-10 tracking-tight whitespace-nowrap">
          Create account
        </h1>

        {status.msg && (
          <div className={`flex items-center gap-3 p-4 mb-8 rounded-xl border ${
            status.type === "success" ? "bg-green-50 border-green-100 text-green-700" : "bg-red-50 border-red-100 text-red-700"
          }`}>
            {status.type === "error" && <AlertCircle size={16} />}
            <p className="text-[10px] font-bold uppercase tracking-widest">{status.msg}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">First Name</label>
              <input type="text" required value={data.firstName} onChange={e => setData({...data, firstName: e.target.value})} className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Last Name</label>
              <input type="text" required value={data.lastName} onChange={e => setData({...data, lastName: e.target.value})} className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Email address</label>
            <input type="email" required value={data.email} onChange={e => setData({...data, email: e.target.value})} className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Password</label>
            <input type="password" required value={data.password} onChange={e => setData({...data, password: e.target.value})} className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all" />
          </div>
          <button type="submit" disabled={status.type === "loading"} className="w-full bg-black text-white py-6 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#FF6B35] transition-all shadow-xl flex items-center justify-center">
            {status.type === "loading" ? <Loader2 className="animate-spin" size={20} /> : "Create my account"}
          </button>
          <p className="text-left text-xs font-bold text-black/40 mt-6">Already have an account? <Link to="/login" className="text-[#FF6B35] underline">Log in</Link></p>
        </form>
      </div>
    </AuthLayout>
  );
}
