import React, { useState } from "react";
import { Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function AccountSettingsTab({ user }: { user: any }) {
  const [profile, setProfile] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || ""
  });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    setTimeout(() => {
      setStatus({ type: "success", msg: "Profile updated successfully!" });
      setSaving(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {status && (
        <div className={`flex items-center gap-3 p-4 rounded-xl border text-xs font-bold uppercase tracking-widest ${
          status.type === "success" ? "text-green-600 bg-green-50 border-green-100" : "text-red-600 bg-red-50 border-red-100"
        }`}>
          <CheckCircle2 size={16} /> {status.msg}
        </div>
      )}

      <div className="space-y-6">
        <h3 className="text-lg font-bold text-[#FF6B35] uppercase tracking-wider">Personal details</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">First name</label>
            <input value={profile.firstName} onChange={e => setProfile({...profile, firstName: e.target.value})} className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#FF6B35]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Last name</label>
            <input value={profile.lastName} onChange={e => setProfile({...profile, lastName: e.target.value})} className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#FF6B35]" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Email address</label>
          <input value={profile.email} disabled className="w-full bg-[#FDF8F0]/20 border border-black/5 rounded-xl px-4 py-3 text-sm font-bold opacity-60" />
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t border-black/5">
        <h3 className="text-lg font-bold text-[#FF6B35] uppercase tracking-wider">Reset password</h3>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Current password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#FF6B35]" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">New password</label>
            <input type={showPassword ? "text" : "password"} value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#FF6B35]" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-1">Confirm password</label>
            <input type={showPassword ? "text" : "password"} value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} className="w-full bg-[#FDF8F0]/40 border border-black/5 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#FF6B35]" />
          </div>
        </div>
      </div>

      <button type="submit" disabled={saving} className="bg-[#FF6B35] text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg flex items-center justify-center min-w-[200px]">
        {saving ? <Loader2 className="animate-spin" size={20} /> : "Save changes"}
      </button>
    </form>
  );
}
