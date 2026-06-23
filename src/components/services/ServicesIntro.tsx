import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function ServicesIntro() {
  const description = "At Z2 Concepts, we help businesses, brands, organizations, and individuals stand out through powerful visual storytelling, innovative digital solutions, and AI-powered creativity. From capturing unforgettable moments to building high-performing websites, we provide everything you need to grow your brand under one roof. Our services are designed to help you attract attention, build credibility, and achieve measurable results.";

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row items-center justify-between gap-10 lg:gap-16">
          
          {/* LEFT: Content Pillar (65%) */}
          <div className="w-[65%] flex flex-col items-start">
            <Reveal>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-8 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">What We Offer</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-black mb-8 tracking-tight leading-tight">
                Our Services
              </h2>
              
              <p className="text-black/70 text-[11px] md:text-sm leading-relaxed mb-10 max-w-[55ch]">
                {description}
              </p>

              <div className="flex flex-row items-center gap-4">
                <button className="flex items-center gap-2 bg-white text-black rounded-2xl px-6 py-4 text-[11px] font-black tracking-widest shadow-lg hover:bg-black hover:text-white transition-all group border border-black/5">
                  Book Service <ArrowUpRight size={14} strokeWidth={3} className="text-[#FF6B35] group-hover:text-white" />
                </button>
                <button className="flex items-center gap-2 bg-[#FF6B35] text-white rounded-2xl px-6 py-4 text-[11px] font-black tracking-widest shadow-xl shadow-[#FF6B35]/20 hover:bg-black transition-all">
                  Talk to an Expert <ArrowUpRight size={14} strokeWidth={3} />
                </button>
              </div>
            </Reveal>
          </div>
          
          {/* RIGHT: Image Pillar (30%) */}
          <div className="w-[30%] flex-shrink-0">
            <Reveal>
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border border-black/5">
                <img 
                  src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137328/blog_assets/qzjpmxxrih9hegwwyc3d.jpg" 
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
