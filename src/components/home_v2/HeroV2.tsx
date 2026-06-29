import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const cards = [
  { img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137095/blog_assets/whpzsruxbwmmb7ckwuiq.jpg", rotate: -12, x: -40, y: 20 },
  { img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137995/blog_assets/qsgt9yfrytzydaomtuwd.jpg", rotate: 2, x: 0, y: -20 },
  { img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782138508/blog_assets/xgx29asy5mvyi9tnpner.jpg", rotate: 10, x: 40, y: 10 }
];

const BrushWavy = () => (
  <svg width="160" height="20" viewBox="0 0 160 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF6B35]">
    <path d="M3 15C20 15 30 5 50 5C70 5 80 15 100 15C120 15 130 5 157 5" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function HeroV2() {
  return (
    <section className="relative min-h-screen w-full bg-[#0C0608] pt-28 md:pt-32 pb-40 px-6 md:px-12 flex items-center overflow-hidden z-10">
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* LEFT: THE TACTILE PHOTO DECK */}
        <div className="relative h-[400px] md:h-[650px] w-full flex items-center justify-center order-2 lg:order-1">
          <div className="relative w-full max-w-[280px] md:max-w-[420px] aspect-[3/4]">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: card.rotate,
                  x: card.x,
                  y: card.y
                }}
                whileHover={{ 
                  scale: 1.08, 
                  rotate: 0, 
                  x: 0,
                  y: -40,
                  zIndex: 60,
                  transition: { type: "spring", stiffness: 200 }
                }}
                className="absolute inset-0 w-full h-full rounded-[24px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] border border-white/10 bg-[#1A1A1A]"
                style={{ zIndex: i + 10 }}
              >
                <img src={card.img} className="w-full h-full object-cover antialiased grayscale-[20%] hover:grayscale-0 transition-all duration-500" alt="" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: THE BRUTALIST BRAND PILLAR */}
        <div className="text-white text-left space-y-8 md:space-y-12 order-1 lg:order-2">
          <Reveal>
            <div className="flex flex-col items-start">
              <div className="flex items-end mb-2 md:mb-4">
                <span className="inline-block text-6xl md:text-9xl font-black text-[#FDF8F0] tracking-tighter scale-y-[1.5] origin-bottom antialiased leading-[0.7]">
                  Z2
                </span>
                <span className="text-xl md:text-4xl font-black text-[#FDF8F0] ml-1 tracking-tighter leading-none pb-1">
                  cm
                </span>
              </div>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-black text-[#FF6B35] mt-4 md:mt-6 ml-1 md:ml-2">
                Elite Media Collective
              </span>
            </div>

            <div className="space-y-6 md:space-y-8">
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.95] text-white italic">
                Creative <br />Design & <br />Print
              </h1>
              
              <div className="space-y-4 md:space-y-6">
                <p className="font-serif-italic text-xl md:text-3xl text-[#FDF8F0]/80 max-w-[15ch] leading-tight">
                  Visual excellence that captures and converts.
                </p>
                <BrushWavy />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-5 pt-8 md:pt-12 border-t border-white/10">
              {["Media Production", "AI Content", "Gallery Framing"].map((text, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-[#FF6B35] shadow-[0_0_15px_#FF6B35]" />
                  <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-8 md:pt-12">
              <Link 
                to="/portfolio" 
                className="inline-flex items-center gap-4 bg-[#FF6B35] text-white rounded-full px-10 md:px-14 py-5 md:py-6 text-[10px] md:text-[12px] font-black tracking-[0.3em] uppercase hover:bg-[#FDF8F0] hover:text-black transition-all shadow-2xl shadow-[#FF6B35]/40 group"
              >
                Explore Works 
                <ArrowUpRight size={18} md:size={20} strokeWidth={4} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-[#FF6B35] z-0" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 70%)" }} />
    </section>
  );
}
