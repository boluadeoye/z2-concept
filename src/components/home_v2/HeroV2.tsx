import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const slides = [
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137095/blog_assets/whpzsruxbwmmb7ckwuiq.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137995/blog_assets/qsgt9yfrytzydaomtuwd.jpg"
];

const BrushWavy = () => (
  <svg width="80" height="10" viewBox="0 0 160 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF6B35] md:w-[120px]">
    <path d="M3 15C20 15 30 5 50 5C70 5 80 15 100 15C120 15 130 5 157 5" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function HeroV2() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full bg-[#0C0608] overflow-hidden pt-20">
      {/* 
        PROMINENCE INVERSION:
        - Slider (Left) is now the dominant 60-65%
        - Text (Right) is the compact 35-40% sidebar
      */}
      <div className="flex flex-row h-full w-full items-stretch">
        
        {/* LEFT COLUMN: DOMINANT SLIDER (60% Mobile / 65% Desktop) */}
        <div className="relative w-[60%] md:w-[65%] h-full overflow-hidden border-r border-white/5 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={slides[current]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full object-cover antialiased"
              alt="Z2 Visual"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/10 z-10" />
        </div>

        {/* RIGHT COLUMN: COMPACT TEXT SIDEBAR (40% Mobile / 35% Desktop) */}
        <div className="w-[40%] md:w-[35%] h-full flex flex-col bg-[#0C0608] overflow-y-auto no-scrollbar flex-shrink-0">
          <div className="flex-1 flex flex-col justify-center px-4 md:px-12 lg:px-16 py-10">
            
            {/* BRAND MARK: Scaled for narrow column */}
            <div className="flex flex-col items-start mb-6 md:mb-10">
              <div className="flex items-end">
                <span className="inline-block text-4xl md:text-8xl font-black text-[#FDF8F0] tracking-tighter scale-y-[1.4] origin-bottom antialiased leading-none">
                  Z2
                </span>
                <span className="text-lg md:text-3xl font-black text-[#FDF8F0] ml-0.5 tracking-tighter leading-none">
                  cm
                </span>
              </div>
              <span className="text-[7px] md:text-[10px] uppercase tracking-[0.3em] font-black text-[#FF6B35] mt-4 ml-0.5">
                Elite Media
              </span>
            </div>

            <div className="space-y-4 md:space-y-8">
              <h1 className="text-lg md:text-5xl font-black tracking-tighter leading-[1.1] text-white italic">
                Creative <br />Design & <br />Print
              </h1>
              
              <div className="space-y-3 md:space-y-6">
                <p className="font-serif-italic text-xs md:text-2xl text-[#FDF8F0]/70 max-w-[15ch] leading-tight">
                  Visual excellence that captures.
                </p>
                <BrushWavy />
              </div>
            </div>

            {/* Value Props: Hidden on mobile to maintain sidebar focus */}
            <div className="hidden md:grid grid-cols-1 gap-4 pt-10 border-t border-white/10 mt-10">
              {["Media Production", "AI Content", "Gallery Framing"].map((text, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs: Stacked and Slimmed */}
            <div className="pt-8 md:pt-12 flex flex-col gap-3">
              <Link 
                to="/portfolio" 
                className="w-full flex items-center justify-center gap-2 bg-[#FF6B35] text-white rounded-full py-3 md:py-5 text-[9px] md:text-[11px] font-black tracking-[0.1em] uppercase hover:bg-[#FDF8F0] hover:text-black transition-all shadow-xl group"
              >
                Works <ArrowUpRight size={14} md:size={18} strokeWidth={4} />
              </Link>
              <Link 
                to="/contact" 
                className="w-full flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white rounded-full py-3 md:py-5 text-[9px] md:text-[11px] font-black tracking-[0.1em] uppercase hover:bg-white hover:text-black transition-all"
              >
                Contact
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
