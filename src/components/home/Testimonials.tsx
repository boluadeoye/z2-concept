import React from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function Testimonials() {
  return (
    <section className="relative w-full py-24 md:py-40 overflow-hidden bg-black">
      {/* BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png" 
          className="w-full h-full object-cover opacity-70"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Heading & Controls (Sitting on the image) */}
          <div className="flex flex-col items-start text-white">
            <Reveal>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/40 mb-8 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Beyond Expectations</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-[1.1]">
                See what our clients <br /> are saying!
              </h2>
              <div className="flex gap-1 mb-12">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-[#FF6B35] fill-[#FF6B35]" />
                ))}
              </div>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full bg-[#FF6B35] flex items-center justify-center text-white shadow-xl hover:scale-105 transition-all">
                  <ArrowLeft size={20} />
                </button>
                <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-xl hover:scale-105 transition-all">
                  <ArrowRight size={20} />
                </button>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: The Floating White Card */}
          <div className="w-full">
            <Reveal>
              <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-2xl relative">
                <p className="text-black/80 text-lg md:text-xl leading-relaxed mb-12 font-medium italic">
                  "Beyound expectations with their innovative marketing strategies. They took the time to understand our brand, delivering targeted campaigns that significantly boosted."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#FF6B35]/10">
                    <img src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png" className="w-full h-full object-cover" alt="Avatar" />
                  </div>
                  <div>
                    <h4 className="text-black font-black uppercase text-sm tracking-tight">Usman Nkechi</h4>
                    <p className="text-black/40 text-[10px] font-bold uppercase tracking-widest">CEO, UB Group</p>
                  </div>
                </div>
                {/* Decorative Quote Anchor */}
                <span className="absolute bottom-6 right-10 text-8xl font-serif text-[#8B7E3D]/20 select-none leading-none">
                  ”
                </span>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
