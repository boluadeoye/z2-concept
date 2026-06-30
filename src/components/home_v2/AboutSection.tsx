import React from "react";
import { Reveal } from "../shared/Reveal";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-[#0C0608] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* FORCED 2-COLUMN: TEXT LEFT, IMAGE RIGHT (Triggering at md/768px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <span className="text-[#FF6B35] text-[10px] md:text-xs font-black uppercase tracking-[0.25em] block mb-2">About Us</span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase scale-y-[1.1] mb-6">About Us</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-6 text-white/70 font-medium text-sm md:text-base leading-relaxed max-w-xl">
                <p>Kefee Home Productions and its creative division, Z2 Concepts, specialise in professional photography and video production, delivering high-quality visuals across a wide range of projects. From weddings and events to fashion, corporate content, and branded media.</p>
                <p>Z2 Concepts adds a creative edge to the process, shaping ideas, directing content, and helping bring unique visions to life. Together, the brand delivers a complete visual experience designed to meet modern standards while keeping each project personal and impactful.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-4 border-l-2 border-[#FF6B35] pl-6 py-2">
                <span className="text-[#FF6B35] font-black uppercase tracking-widest text-xs md:text-sm">"YOUR FEATURE IS TODAY"</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden border border-white/5 bg-[#120a0d] group">
              {/* CORRECT FOUNDER IMAGE - NATURAL COLORS ONLY */}
              <img 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137995/blog_assets/qsgt9yfrytzydaomtuwd.jpg" 
                className="w-full h-full object-cover antialiased transition-transform duration-1000 ease-in-out group-hover:scale-125" 
                alt="Founder Portrait" 
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
