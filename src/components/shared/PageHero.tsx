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
    <section className="relative h-[45vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden bg-black pt-20">
      <div className="absolute inset-0 z-0">
        <img src={image} className="w-full h-full object-cover opacity-90" alt={title} />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>
      <div className="relative z-20 text-center text-white px-6">
        <Reveal>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 drop-shadow-xl">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-widest uppercase">
            <Link to="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#FF6B35]" strokeWidth={3} />
            <span className="text-white">{breadcrumb}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
