import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function PromoSlant() {
  return (
    <section className="relative py-24 bg-[#FF6B35] overflow-hidden">
      {/* THE RIP EFFECT: Top edge of Promo matching Hero bottom */}
      <div className="absolute top-0 left-0 w-full h-32 bg-[#0C0608] z-0" style={{ clipPath: "polygon(0 0, 100% 0, 100% 30%, 0 100%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-10 pt-12">
        <div className="text-center md:text-left">
          <h3 className="text-white text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
            20% OFF
          </h3>
          <p className="text-black font-black text-[11px] uppercase tracking-[0.3em]">
            Your First Signature Order • Use Code: <span className="text-white">Z2FIRST</span>
          </p>
        </div>
        
        <Link 
          to="/store" 
          className="bg-white text-black px-12 py-5 rounded-full font-black text-[12px] tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center gap-3"
        >
          Claim Offer <ArrowUpRight size={18} strokeWidth={3} />
        </Link>
      </div>
    </section>
  );
}
