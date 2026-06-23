import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

interface PageHeroProps {
  title: string;
  breadcrumb: string;
  image: string;
}

export const PageHero = ({ title, breadcrumb, image }: PageHeroProps) => {
  return (
    <section className="relative h-[35vh] md:h-[45vh] min-h-[300px] md:min-h-[400px] w-full flex items-center justify-center overflow-hidden">
      {/* FORCED VISIBILITY LAYER */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src={image} 
          className="w-full h-full object-cover object-center opacity-100 block" 
          alt={title} 
          loading="eager"
        />
        {/* Scrim moved to z-10 to sit between image and text */}
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      <div className="relative z-20 text-center text-white px-6 pt-16 md:pt-20">
        <Reveal>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 drop-shadow-2xl">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-[10px] md:text-[11px] font-bold tracking-widest uppercase">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#FF6B35]" strokeWidth={3} />
            <span className="text-white">{breadcrumb}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
