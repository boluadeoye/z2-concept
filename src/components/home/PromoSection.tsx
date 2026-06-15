import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function PromoSection() {
  return (
    <section className="bg-[#FDF8F0] overflow-hidden pt-20 pb-32">
      {/* THE SLANTED MARQUEE */}
      <div className="relative z-20 -rotate-[3deg] scale-110 origin-center mb-20">
        <div className="bg-[#1A140F] py-4 flex overflow-hidden select-none border-y border-white/5 shadow-2xl">
          <div className="flex flex-nowrap gap-10 animate-ticker whitespace-nowrap">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-10">
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.25em]">Get 20% off for a first order</span>
                <span className="text-[#FF6B35] text-lg">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promo Content */}
      <div className="px-6 text-center relative z-10">
        <Reveal>
          <div className="flex justify-center mb-10">
            <img 
              src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781529131/blog_assets/r5rdhpsqs84ku8grkpny.png" 
              alt="20% off"
              className="h-32 md:h-56 object-contain"
              loading="eager"
            />
          </div>
          
          <h3 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight mb-6">
            Your First Order
          </h3>
          <p className="text-black/60 text-sm md:text-base max-w-xl mx-auto mb-12 leading-relaxed">
            I cannot say enough great things about Quere. Their team is professional, knowledgeable, and dedicated to excellence.
          </p>

          <form className="max-w-md mx-auto">
            <div className="relative mb-12">
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full bg-transparent border-b border-black/20 py-4 text-center text-sm outline-none focus:border-[#FF6B35] transition-colors font-bold uppercase tracking-widest placeholder:text-black/20"
              />
            </div>
            <button className="inline-flex items-center gap-2 bg-white border border-black/10 text-black rounded-full px-12 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all group shadow-xl">
              SUBSCRIBE NOW <ArrowUpRight size={14} strokeWidth={3} className="text-[#FF6B35] group-hover:text-white transition-colors" />
            </button>
          </form>
        </Reveal>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-ticker {
          display: flex;
          animation: ticker 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
