import React from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../shared/Reveal";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center bg-[#0C0608] overflow-hidden px-8 md:px-24 pt-20">
      {/* BACKGROUND LAYER: Full screen "Poster" style */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137095/blog_assets/whpzsruxbwmmb7ckwuiq.jpg" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0608] via-[#0C0608]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* BRAND BLOCK */}
        <Reveal className="mb-12">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-black text-white scale-y-[1.4] origin-bottom inline-block tracking-tighter">Z2</span>
              <span className="text-2xl font-black text-white">cm</span>
            </div>
            <span className="text-[#8B7E3D] text-[10px] font-bold tracking-[0.4em] mt-2 uppercase">Elite Media</span>
          </div>
        </Reveal>

        {/* PRIMARY HEADING: Media and Digital Services */}
        <Reveal delay={0.1}>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-[12ch]">
            Media and Digital Services
          </h1>
        </Reveal>

        {/* NARRATIVE & SQUIGGLE */}
        <Reveal delay={0.2} className="mb-16">
          <p className="text-white/80 text-lg md:text-xl font-medium italic mb-4">
            Visual excellence that captures.
          </p>
          <svg width="120" height="12" viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10C20 2 40 12 60 6C80 0 100 10 118 4" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </Reveal>

        {/* SERVICE INDEX & CTAS */}
        <div className="flex flex-col gap-12">
          {/* Lowercase Service List */}
          <Reveal delay={0.3}>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-white/60 text-sm font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" /> photography
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" /> video production
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" /> web development
              </li>
            </ul>
          </Reveal>

          {/* Text CTAs: Updated Routes */}
          <Reveal delay={0.4} className="space-y-4">
            <Link to="/gallery" className="block text-white text-lg font-black tracking-tight hover:text-[#FF6B35] transition-colors">
              See our work — (/gallery)
            </Link>
            <Link to="/contact" className="block text-white text-lg font-black tracking-tight hover:text-[#FF6B35] transition-colors">
              Work with us — (/contact)
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
