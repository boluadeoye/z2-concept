import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137095/blog_assets/whpzsruxbwmmb7ckwuiq.jpg",
  "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137995/blog_assets/qsgt9yfrytzydaomtuwd.jpg"
];

const BrushWavy = () => (
  <svg width="100" height="12" viewBox="0 0 160 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF6B35] md:w-[140px]">
    <path d="M3 15C20 15 30 5 50 5C70 5 80 15 100 15C120 15 130 5 157 5" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function HeroV2() {
  return (
    <section className="relative h-screen w-full bg-[#0C0608] overflow-hidden pt-20">
      <div className="flex flex-row h-full w-full items-stretch">
        
        {/* LEFT COLUMN: SLIDER (65%) */}
        <div className="relative w-[60%] md:w-[65%] h-full overflow-hidden border-r border-white/5 flex-shrink-0 group">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            navigation={{ prevEl: ".hero-v2-prev", nextEl: ".hero-v2-next" }}
            pagination={{ clickable: true, el: ".hero-v2-pagination", bulletClass: "hero-v2-bullet", bulletActiveClass: "hero-v2-bullet-active" }}
            className="w-full h-full"
          >
            {slides.map((img, idx) => (
              <SwiperSlide key={idx} className="w-full h-full relative">
                <img src={img} className="w-full h-full object-cover antialiased" alt="Slide Visual" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
          <div className="absolute bottom-6 right-6 z-30 hidden md:flex gap-3">
            <button className="hero-v2-prev w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#FF6B35] transition-all cursor-pointer">
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button className="hero-v2-next w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#FF6B35] transition-all cursor-pointer">
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
          <div className="hero-v2-pagination absolute bottom-6 left-6 z-30 flex gap-2 md:hidden" />
        </div>

        {/* RIGHT COLUMN: SIDEBAR (35%) */}
        <div className="w-[40%] md:w-[35%] h-full flex flex-col bg-[#0C0608] overflow-y-auto no-scrollbar flex-shrink-0">
          <div className="flex-1 flex flex-col justify-center px-5 md:px-12 py-10">
            
            {/* BRAND MARK */}
            <div className="flex flex-col items-start mb-8">
              <div className="flex items-end">
                <span className="inline-block text-4xl md:text-8xl font-black text-[#FDF8F0] tracking-tighter scale-y-[1.4] origin-bottom antialiased leading-none">Z2</span>
                <span className="text-lg md:text-3xl font-black text-[#FDF8F0] ml-0.5 tracking-tighter leading-none">cm</span>
              </div>
              <span className="text-[7px] md:text-[10px] uppercase tracking-[0.3em] font-black text-[#8B7E3D] mt-4 ml-0.5">Elite Media</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-lg md:text-5xl font-black tracking-tighter leading-[1.1] text-white italic">Media and <br />Digital <br />Services</h1>
              <div className="space-y-4">
                <p className="font-serif-italic text-xs md:text-2xl text-[#FDF8F0]/70 max-w-[15ch] leading-tight">Visual excellence that captures.</p>
                <BrushWavy />
              </div>
            </div>

            {/* Lowercase Service List */}
            <div className="grid grid-cols-1 gap-3 pt-10 border-t border-white/10 mt-10">
              {["photography", "video production", "web development"].map((text, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                  <span className="text-[11px] font-bold text-white/40 group-hover:text-white transition-colors">{text}</span>
                </div>
              ))}
            </div>

            {/* SLEEK COMPACT CTA PILLS */}
            <div className="pt-10 flex flex-col gap-3">
              <Link 
                to="/gallery" 
                className="w-full bg-[#FF6B35] text-white rounded-full py-2.5 px-6 text-center text-[12px] font-black tracking-tight whitespace-nowrap hover:bg-white hover:text-black transition-all shadow-lg shadow-[#FF6B35]/10"
              >
                See Our Work
              </Link>
              <Link 
                to="/contact" 
                className="w-full bg-transparent border border-white/20 text-white rounded-full py-2.5 px-6 text-center text-[12px] font-black tracking-tight whitespace-nowrap hover:bg-white hover:text-black transition-all"
              >
                Work With Us
              </Link>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .hero-v2-bullet { width: 6px; height: 6px; display: inline-block; border-radius: 9999px; background: rgba(255, 255, 255, 0.3); margin: 0 4px; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .hero-v2-bullet-active { width: 24px; background: #FF6B35 !important; border-radius: 4px; }
      `}</style>
    </section>
  );
}
