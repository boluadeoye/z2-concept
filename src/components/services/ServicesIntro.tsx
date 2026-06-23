import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function ServicesIntro() {
  const description = "At Z2 Concepts, we help businesses, brands, organizations, and individuals stand out through powerful visual storytelling, innovative digital solutions, and AI-powered creativity.";

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          <div className="w-full md:w-[35%] order-1 md:order-2">
            <Reveal>
              <div className="relative aspect-[4/5] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl border border-black/5">
                <img 
                  src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137328/blog_assets/qzjpmxxrih9hegwwyc3d.jpg" 
                  alt="Services Portrait" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </Reveal>
          </div>

          <div className="w-full md:w-[60%] flex flex-col items-start order-2 md:order-1">
            <Reveal>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">What We Offer</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-black mb-8 tracking-tight leading-tight">
                Our Services
              </h2>
              
              <p className="text-black/70 text-xs md:text-sm leading-relaxed mb-10 max-w-[50ch]">
                {description}
              </p>

              {/* SLEEK & SLIM BUTTONS: Reduced padding and font size */}
              <div className="flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-2 bg-white text-black rounded-full px-7 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-black hover:text-white transition-all group border border-black/5">
                  Book Service <ArrowUpRight size={14} strokeWidth={3} className="text-[#FF6B35] group-hover:text-white" />
                </button>
                <button className="flex items-center gap-2 bg-[#FF6B35] text-white rounded-full px-7 py-2.5 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#FF6B35]/20 hover:bg-black transition-all">
                  Talk to an Expert <ArrowUpRight size={14} strokeWidth={3} />
                </button>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
