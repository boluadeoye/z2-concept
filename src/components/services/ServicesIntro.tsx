import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function ServicesIntro() {
  const repeatedText = "specialises in professional photography and video production, delivering high-quality visuals across a wide range of projects. From weddings and events to fashion, corporate content, and branded media.specialises in professional photography and video production, delivering high-quality visuals across a wide range of projects. From weddings and events to fashion, corporate content, and branded media.";

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        {/* FORCED SIDE-BY-SIDE LAYOUT */}
        <div className="flex flex-row items-center justify-between gap-10">
          
          {/* LEFT: Content Pillar (65%) */}
          <div className="w-[65%] flex flex-col items-start">
            <Reveal>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-8 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">What We Offer</span>
              </div>

              {/* Corrected Casing: Not all capitalized */}
              <h2 className="text-3xl md:text-6xl font-black text-black mb-8 tracking-tight leading-none">
                Our Services
              </h2>

              <p className="text-black/70 text-[11px] md:text-sm leading-relaxed mb-10 max-w-[50ch]">
                {repeatedText}
              </p>

              <div className="flex flex-row items-center gap-4">
                <button className="flex items-center gap-2 bg-white text-black rounded-2xl px-6 py-4 text-[9px] md:text-[11px] font-black uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] hover:bg-black hover:text-white transition-all group">
                  BOOK SERVICE <ArrowUpRight size={14} strokeWidth={3} className="text-[#FF6B35] group-hover:text-white" />
                </button>
                <button className="flex items-center gap-2 bg-[#FF6B35] text-white rounded-2xl px-6 py-4 text-[9px] md:text-[11px] font-black uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(255,107,53,0.4)] hover:bg-black transition-all">
                  TALK TO AN EXPERT <ArrowUpRight size={14} strokeWidth={3} />
                </button>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Updated Asset Pillar (30%) */}
          <div className="w-[30%] flex-shrink-0">
            <Reveal>
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border border-black/5">
                <img 
                  src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png" 
                  alt="Services Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
