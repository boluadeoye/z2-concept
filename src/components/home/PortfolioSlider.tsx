import React from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight, MoveLeft, MoveRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const works = [
  { 
    title: "Wedding Photography", 
    img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137278/blog_assets/uftpsbjdtjezhshfwu9y.jpg" 
  },
  { 
    title: "Event Coverage", 
    img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137995/blog_assets/qsgt9yfrytzydaomtuwd.jpg" 
  },
  { 
    title: "e-Commerce Website", 
    img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782138122/blog_assets/imueq9xlwj0n9oxlz6ay.jpg" 
  }
];

export default function PortfolioSlider() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION: ASYMMETRIC EDITORIAL LAYOUT */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
          
          {/* NAVIGATION: Cream & Gold Circles */}
          <div className="flex gap-4 order-2 md:order-1">
            <button className="w-14 h-14 rounded-full bg-[#FDF8F0] border border-black/5 flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
              <MoveLeft size={24} className="text-black" />
            </button>
            <button className="w-14 h-14 rounded-full bg-[#8B7E3D] border border-black/5 flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
              <MoveRight size={24} className="text-black" />
            </button>
          </div>

          {/* HEADER: Right-Aligned Editorial Block */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right max-w-2xl order-1 md:order-2">
            <Reveal>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white mb-6 w-fit md:ml-auto shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                <span className="text-[11px] font-bold text-black/60 tracking-tight">Our Works</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-[1.1] mb-6">
                Kefee Home Productions x Z2 <br className="hidden md:block" /> Concepts your media partner
              </h2>
              <p className="text-black/50 text-sm md:text-base leading-relaxed max-w-md md:ml-auto">
                We offer the printing of graphics, text, logos, and other branding elements onto packaging materials...
              </p>
            </Reveal>
          </div>
        </div>

        {/* PORTFOLIO GRID: Hover-to-Orange Logic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {works.map((work, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden mb-6 border border-black/5 shadow-xl">
                  <img 
                    src={work.img} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={work.title} 
                  />
                </div>
                
                {/* Content Card: Hover Logic */}
                <div className="p-8 rounded-[32px] bg-white border border-black/5 flex items-center justify-between transition-all duration-500 group-hover:bg-[#FF6B35] group-hover:text-white group-hover:shadow-2xl group-hover:shadow-[#FF6B35]/30">
                  <h3 className="text-2xl font-black tracking-tighter leading-tight max-w-[10ch]">
                    {work.title}
                  </h3>
                  
                  {/* Icon Logic: Card 3 has specific circle housing */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    i === 2 
                      ? "bg-[#FF6B35] text-white" 
                      : "bg-[#FF6B35]/10 text-[#FF6B35] group-hover:bg-white/20 group-hover:text-white"
                  }`}>
                    <ArrowDownRight size={24} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* FOOTER ACTION: See All Works */}
        <div className="flex justify-center">
          <Reveal delay={0.4}>
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-white border border-black/10 rounded-full shadow-lg hover:shadow-xl transition-all group"
            >
              <span className="text-[12px] font-black tracking-widest uppercase">See All Our Works</span>
              <ArrowUpRight size={18} className="text-[#FF6B35] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={3} />
            </Link>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
