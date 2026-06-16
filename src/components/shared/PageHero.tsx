import React from "react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";

interface PageHeroProps {
  title: string;
  breadcrumb: string;
  image: string;
}

export const PageHero = ({ title, breadcrumb, image }: PageHeroProps) => {
  return (
    <section className="relative h-[40vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Background with Sepia Scrim */}
      <div className="absolute inset-0 z-0">
        <img src={image} className="w-full h-full object-cover opacity-60" alt="" />
        <div className="absolute inset-0 bg-[#2A1B12]/80 mix-blend-multiply" />
      </div>

      <div className="relative z-10 text-center text-white">
        <Reveal>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/60">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-accent">{breadcrumb}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
