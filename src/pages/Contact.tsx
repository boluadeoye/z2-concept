import React, { useState, useEffect } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { PageHero } from "../components/shared/PageHero";
import { ServiceTicker } from "../components/shared/ServiceTicker";
import { Reveal } from "../components/shared/Reveal";
import { submitInquiry } from "../lib/woocommerce";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await submitInquiry(formData.name, formData.email, formData.message);
    if (result.success) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <main className="bg-[#FDF8F0] min-h-screen">
      {/* FIGMA FIDELITY: Cinematic Entry Header with Title Case Enforcement */}
      <PageHero 
        title="Contact Us" 
        breadcrumb="Contact" 
        image="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137095/blog_assets/whpzsruxbwmmb7ckwuiq.jpg" 
      />
      
      <ServiceTicker />

      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-8 w-fit mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">Get In Touch</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-black tracking-tighter mb-16 leading-[1.1]">
              Hello! How can we be of <br /> help to you today?
            </h2>
          </Reveal>

          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-12 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-black/40 ml-2">Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border border-black/5 rounded-[24px] px-8 py-5 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all shadow-sm" 
                    placeholder="Your name" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-widest text-black/40 ml-2">Email</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white border border-black/5 rounded-[24px] px-8 py-5 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all shadow-sm" 
                    placeholder="Enter email" 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-black/40 ml-2">Talk to us</label>
                <textarea 
                  rows={6} 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white border border-black/5 rounded-[32px] px-8 py-6 text-sm font-bold outline-none focus:border-[#FF6B35] transition-all shadow-sm resize-none" 
                  placeholder="How can we help?" 
                />
              </div>

              <div className="flex flex-col items-center gap-6">
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full md:w-fit bg-[#FF6B35] text-white font-black text-[12px] uppercase tracking-[0.2em] px-16 py-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl shadow-[#FF6B35]/30 disabled:opacity-50"
                >
                  {status === "loading" ? "SENDING..." : "SEND INQUIRY"} <ArrowUpRight size={18} strokeWidth={3} />
                </button>

                {status === "success" && (
                  <div className="flex items-center gap-2 text-green-600 font-bold text-sm animate-in fade-in slide-in-from-bottom-2">
                    <CheckCircle2 size={18} /> Message sent successfully!
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-500 font-bold text-sm animate-in fade-in slide-in-from-bottom-2">
                    <AlertCircle size={18} /> Failed to send. Please try again.
                  </div>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
