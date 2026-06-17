import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="w-full text-left">
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-black mb-6 tracking-tight whitespace-nowrap">
          Forget password
        </h1>
        <p className="text-black/50 text-sm mb-10 leading-relaxed max-w-[40ch]">
          Lost your password? Please enter your username or email address.
        </p>

        <form className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Username or email address</label>
            <input type="text" required className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-2xl px-6 py-5 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all" />
          </div>

          <button className="w-full bg-black text-white py-6 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#FF6B35] transition-all shadow-xl">
            Reset password
          </button>

          <p className="text-left text-xs font-bold text-black/40 mt-6">
            Remembered it? <Link to="/login" className="text-[#FF6B35] underline">Back to login</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
