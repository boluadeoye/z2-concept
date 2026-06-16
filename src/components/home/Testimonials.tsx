import React from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function Testimonials() {
  return (
    <section className="relative w-full h-auto md:h-[500px] flex items-center overflow-hidden bg-black">
      {/* BACKGROUND WITH CINEMATIC SEPIA SCRIM */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png" 
          className="w-full h-full object-cover opacity-60"
          alt=""
        />
        <div className="absolute inset-0 bg-[#2A1B12]/85 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          
          {/* LEFT: Heading & Controls */}
          <div className="flex flex-col items-start text-white">
            <Reveal>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white mb-6 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                <span className="font-mono text-[9px] text-black font-bold uppercase tracking-widest">Beyond Expectations</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 leading-tight">
                See what our clients <br className="hidden md:block" /> are saying!
              </h2>

              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-[#D2A546] fill-[#D2A546]" />
                ))}
              </div>

              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center text-white shadow-xl hover:scale-105 transition-all">
                  <ArrowLeft size={20} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-xl hover:scale-105 transition-all">
                  <ArrowRight size={20} />
                </button>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Floating Card with Overlapping Quote */}
          <div className="relative w-full flex justify-center md:justify-end">
            <Reveal>
              <div className="bg-white rounded-[32px] p-8 md:p-10 max-w-[480px] relative shadow-2xl">
                <p className="text-black/80 text-base md:text-lg leading-relaxed mb-8 font-medium italic">
                  "Beyound expectations with their innovative marketing strategies. They took the time to understand our brand, delivering targeted campaigns that significantly boosted."
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-black/5">
                    <img src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png" className="w-full h-full object-cover" alt="User" />
                  </div>
                  <div>
                    <h4 className="text-black font-black uppercase text-xs tracking-tight">Usman Nkechi</h4>
                    <p className="text-black/40 text-[9px] font-bold uppercase tracking-widest">CEO, UB Group</p>
                  </div>
                </div>

                {/* THE OVERLAPPING QUOTE - HANGING OFF THE EDGE */}
                <div className="absolute -bottom-4 -right-2 md:-right-6">
                   <span className="text-[100px] leading-none font-serif text-[#D2A546] opacity-40 select-none">
                     ”
                   </span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
