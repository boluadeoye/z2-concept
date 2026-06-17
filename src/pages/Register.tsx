import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="w-full text-left">
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-black text-black mb-10 tracking-tight whitespace-nowrap">
          Create account
        </h1>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">First Name</label>
              <input type="text" required className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Last Name</label>
              <input type="text" required className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Email address</label>
            <input type="email" required className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Password</label>
            <input type="password" required className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all" />
          </div>

          <button className="w-full bg-black text-white py-6 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#FF6B35] transition-all shadow-xl">
            Create my account
          </button>

          <p className="text-left text-xs font-bold text-black/40 mt-6">
            Already have an account? <Link to="/login" className="text-[#FF6B35] underline">Log in</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
