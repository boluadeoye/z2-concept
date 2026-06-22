import React from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function Testimonials() {
  return (
    <section className="relative w-full min-h-[480px] flex items-center overflow-hidden bg-black">
      {/* ENVIRONMENTAL LAYER: High-visibility banquet hall asset */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137243/blog_assets/x77wktu3vnbvlzlar6bm.jpg" 
          className="w-full h-full object-cover opacity-80" 
          alt="" 
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT: Heading & Controls */}
          <div className="flex flex-col items-start text-white">
            <Reveal>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white mb-6 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                <span className="font-mono text-[10px] text-black font-bold uppercase tracking-widest">Beyond Expectations</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-[1.1] drop-shadow-md">
                See what our clients <br className="hidden md:block" /> are saying!
              </h2>

              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-[#FF6B35] fill-[#FF6B35]" />
                ))}
              </div>

              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all">
                  <ArrowLeft size={20} strokeWidth={2.5} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-xl hover:scale-110 transition-all">
                  <ArrowRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Testimonial Card - Strictly Anchored Right */}
          <div className="relative w-full flex justify-center md:justify-end">
            <Reveal>
              <div className="bg-white rounded-[32px] p-8 md:p-10 max-w-[460px] relative shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-black/5">
                <p className="text-black/80 text-base md:text-lg leading-relaxed mb-8 font-medium italic">
                  "Beyond expectations with their innovative marketing strategies. They took the time to understand our brand, delivering targeted campaigns that significantly boosted our reach."
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FDF8F0] shadow-sm">
                    <img 
                      src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137995/blog_assets/qsgt9yfrytzydaomtuwd.jpg" 
                      className="w-full h-full object-cover" 
                      alt="Usman Nkechi" 
                    />
                  </div>
                  <div>
                    <h4 className="text-black font-black text-xs tracking-tight">Usman Nkechi</h4>
                    <p className="text-black/40 text-[9px] font-bold uppercase tracking-widest mt-0.5">CEO, UB Group</p>
                  </div>
                </div>

                {/* Decorative Quote Icon */}
                <div className="absolute -bottom-4 -right-4">
                   <span className="text-[100px] leading-none font-serif text-[#FF6B35] opacity-10 select-none">
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
