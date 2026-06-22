import React from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const works = [
  { title: "Wedding Photography", active: false, img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521115/blog_assets/ytxsfz4o5w7brat1zx4q.png" },
  { title: "Event Coverage", active: true, img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png" },
  { title: "e-Commerce Website", active: false, img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521121/blog_assets/hbgy9tg3xwufbzemj3v0.png" }
];

export default function PortfolioSlider() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          {/* Arrow navigation background color matching Figma Design */}
          <div className="flex gap-3 order-2 md:order-1">
            <button className="w-12 h-12 rounded-full bg-white text-black border border-black/5 flex items-center justify-center shadow-sm hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] transition-all duration-300">
              <ArrowDown size={20} strokeWidth={2.5} />
            </button>
            <button className="w-12 h-12 rounded-full bg-white text-black border border-black/5 flex items-center justify-center shadow-sm hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] transition-all duration-300">
              <ArrowDown size={20} strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="flex flex-col items-start md:items-end text-left md:text-right max-w-2xl order-1 md:order-2">
            <Reveal>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit md:ml-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">Our Works</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight">Kefee Home Productions x Z2 Concepts</h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {works.map((work, i) => (
            <Reveal key={i}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-4 border border-black/5 shadow-lg">
                  <img src={work.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                </div>
                <div className={`p-8 rounded-[24px] flex items-center justify-between ${work.active ? "bg-[#FF6B35] text-white" : "bg-white text-black border border-black/5"}`}>
                  <h3 className="text-xl font-bold leading-tight">{work.title}</h3>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${work.active ? "bg-white/20" : "bg-[#FF6B35]/10 text-[#FF6B35]"}`}>
                    <ArrowUpRight size={20} strokeWidth={3} className="rotate-45" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
