import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function AboutSplit() {
  return (
    <section className="pb-0 pt-0 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-10 lg:gap-12 items-stretch">
          
          {/* LEFT: CONTENT CARD */}
          <div className="flex flex-col h-full">
            <Reveal className="h-full">
              <div className="bg-white rounded-[48px] p-10 lg:p-16 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col h-full">
                <div className="flex gap-4 mb-10">
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 text-black text-[10px] font-bold uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                    About Company
                  </div>
                </div>
                
                <h2 className="text-3xl lg:text-5xl font-black text-black mb-8 leading-tight tracking-tight">
                  Kefee Home Productions and its creative division, Z2 Concepts
                </h2>
                
                <p className="text-black/70 text-sm lg:text-base leading-relaxed mb-12 flex-1">
                  We specialise in professional photography and video production, delivering high-quality visuals across a wide range of projects. From weddings and events to fashion, corporate content, and branded media.
                </p>

                <div className="mt-auto">
                  <Link 
                    to="/about"
                    className="inline-flex items-center gap-3 bg-white border border-black/10 text-black rounded-full px-10 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all group shadow-md w-fit"
                  >
                    Read More <ArrowUpRight size={16} strokeWidth={3} className="text-[#FF6B35] group-hover:text-white" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: THE STRETCHED PILLAR IMAGE */}
          <div className="hidden md:block h-full">
            <Reveal className="h-full">
              <div className="relative h-full w-full rounded-[48px] overflow-hidden shadow-2xl border border-black/5">
                <img 
                  src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137995/blog_assets/qsgt9yfrytzydaomtuwd.jpg" 
                  className="absolute inset-0 w-full h-full object-cover" 
                  alt="About Z2" 
                />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
