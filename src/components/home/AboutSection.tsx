import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function AboutSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="space-y-8">
            <Reveal>
              {/* Figma Pill Badge with Accent Dot */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">About Company</span>
              </div>
              
              {/* Title Case Editorial Heading */}
              <h2 className="text-3xl md:text-5xl font-black text-black leading-tight tracking-tight mb-6">
                Kefee Home Productions and its creative division, Z2 Concepts
              </h2>
              
              <p className="text-black/70 text-sm md:text-base leading-relaxed mb-10">
                We specialize in professional photography and video production, delivering high-quality visuals across a wide range of projects. From weddings and events to fashion, corporate content, and branded media.
              </p>

              {/* Pill-Shaped Link Button */}
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-black/20 text-black font-bold text-xs hover:bg-black hover:text-white transition-all shadow-sm"
              >
                Read More <ArrowUpRight size={14} strokeWidth={3} />
              </Link>
            </Reveal>
          </div>

          {/* RIGHT: IMAGE CARD */}
          <Reveal>
            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-[0_30px_80px_-15px_rgba(0,0,0,0.08)] border border-black/5">
              <img 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png" 
                alt="About Z2" 
                className="w-full h-full object-cover" 
              />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
