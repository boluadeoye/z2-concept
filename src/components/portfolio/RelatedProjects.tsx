import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const related = [
  { title: "Nkechi's Graduation Photoshoot", img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521115/blog_assets/ytxsfz4o5w7brat1zx4q.png" },
  { title: "Shamammpraise eCommerce Website", img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521121/blog_assets/hbgy9tg3xwufbzemj3v0.png" },
  { title: "Pa Graham's Funeral Coverage", img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png" }
];

export default function RelatedProjects() {
  return (
    <div className="pt-24 border-t border-black/5">
      <Reveal>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit mx-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
          <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">More from our portfolio</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-black text-center mb-16 tracking-tight">Related Projects</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((p, i) => (
          <Reveal key={i}>
            <div className="group cursor-pointer">
              <div className="relative aspect-square rounded-[32px] overflow-hidden mb-6 shadow-lg border border-black/5">
                <img src={p.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
              </div>
              <div className="bg-white p-8 rounded-[24px] flex items-center justify-between border border-black/5 group-hover:border-[#FF6B35] transition-all">
                <h3 className="text-lg font-bold text-black tracking-tight pr-4">{p.title}</h3>
                <div className="w-10 h-10 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center">
                  <ArrowUpRight size={20} strokeWidth={3} className="rotate-45" />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
