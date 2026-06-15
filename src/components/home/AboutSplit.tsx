import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function AboutSplit() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 items-center">
          
          {/* LEFT: Text Block */}
          <div className="flex flex-col items-start order-2 md:order-1">
            <Reveal>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-10 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">
                  About Company
                </span>
              </div>

              <h2 className="text-3xl md:text-6xl font-black text-black mb-10 leading-[1.1] uppercase tracking-tight max-w-[600px]">
                Kefee Home Productions and its creative division, Z2 Concepts
              </h2>

              <p className="text-black/70 text-sm md:text-lg leading-relaxed mb-12 max-w-[55ch]">
                specialises in professional photography and video production, delivering high-quality visuals across a wide range of projects. From weddings and events to fashion, corporate content, and branded media.
              </p>

              <button className="w-fit flex items-center gap-2 bg-transparent border border-black/20 text-black rounded-full px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all group">
                READ MORE 
                <ArrowUpRight size={14} strokeWidth={3} className="text-[#FF6B35] group-hover:text-white transition-colors" />
              </button>
            </Reveal>
          </div>

          {/* RIGHT: Anchored Pillar Image */}
          <div className="order-1 md:order-2 w-full md:w-[380px]">
            <Reveal>
              <div className="relative aspect-[3/4] w-full rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl border border-black/5 ml-auto">
                <img 
                  src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png"
                  alt="Wedding Couple Pillar"
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
