import React from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const works = [
  {
    image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521115/blog_assets/ytxsfz4o5w7brat1zx4q.png",
    title: "Wedding Photography",
    active: false
  },
  {
    image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png",
    title: "Event Coverage",
    active: true
  },
  {
    image: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521121/blog_assets/hbgy9tg3xwufbzemj3v0.png",
    title: "e-Commerce Website",
    active: false
  }
];

export default function PortfolioSlider() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* ASYMMETRIC HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          {/* Left: Navigation Arrows */}
          <div className="flex gap-3 order-2 md:order-1">
            <button className="w-12 h-12 rounded-full bg-[#E8E2D9] flex items-center justify-center text-black/40 hover:bg-primary hover:text-white transition-all">
              <ChevronLeft size={24} />
            </button>
            <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white hover:bg-accent transition-all">
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Right: Text Block */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right max-w-2xl order-1 md:order-2">
            <Reveal>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit md:ml-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">
                  Our Works
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-black mb-6 leading-tight uppercase tracking-tight">
                Kefee Home Productions x Z2 Concepts your media partner
              </h2>
              <p className="text-black/60 text-sm md:text-base max-w-[50ch]">
                We offer the printing of graphics, text, logos, and other branding elements onto packaging materials...
              </p>
            </Reveal>
          </div>
        </div>

        {/* PORTFOLIO GRID/SLIDER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {works.map((work, i) => (
            <Reveal key={i}>
              <div className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-4 border border-black/5 shadow-lg">
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Title Box */}
                <div className={`p-8 rounded-[24px] flex items-center justify-between transition-all duration-300 ${
                  work.active ? "bg-[#FF6B35] text-white shadow-xl" : "bg-white text-black border border-black/5"
                }`}>
                  <h3 className="text-xl font-bold uppercase leading-tight max-w-[10ch]">
                    {work.title}
                  </h3>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    work.active ? "bg-white/20 text-white" : "bg-[#FF6B35]/10 text-[#FF6B35]"
                  }`}>
                    <ArrowUpRight size={20} strokeWidth={3} className="rotate-45" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 bg-white border border-black/10 text-black rounded-full px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all group shadow-md">
            SEE ALL OUR WORKS 
            <ArrowUpRight size={14} strokeWidth={3} className="text-[#FF6B35] group-hover:text-white transition-colors" />
          </button>
        </div>

      </div>
    </section>
  );
}
