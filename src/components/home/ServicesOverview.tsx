import React from "react";
import { Camera, Video, Monitor, PenTool, ArrowUpRight } from "lucide-react";

const categories = [
  { icon: <Camera size={20} />, title: "Photography", list: ["Studio Portraiture", "Editorial Captures"] },
  { icon: <Video size={20} />, title: "Video Production", list: ["Event Coverage", "Commercial Direction"] },
  { icon: <Monitor size={20} />, title: "Website Development", list: ["Headless Commerce", "Portfolio Hubs"] },
  { icon: <PenTool size={20} />, title: "Graphic Design", list: ["Identity Guidelines", "Brand Packages"] }
];

export default function ServicesOverview() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="font-mono text-[10px] text-[#8B7E3D] tracking-[0.2em] uppercase mb-4 inline-block">What We Offer</span>
          <h2 className="text-3xl md:text-5xl font-bold text-black uppercase">Our Services</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="relative aspect-video rounded-3xl overflow-hidden group shadow-xl">
            <img src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521115/blog_assets/ytxsfz4o5w7brat1zx4q.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white flex justify-between items-end">
              <h3 className="text-2xl font-bold uppercase">Photography</h3>
              <div className="w-10 h-10 rounded-full bg-[#F4A261] flex items-center justify-center"><ArrowUpRight size={18} /></div>
            </div>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden group shadow-xl">
            <img src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521121/blog_assets/hbgy9tg3xwufbzemj3v0.png" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white flex justify-between items-end">
              <h3 className="text-2xl font-bold uppercase">Web Systems</h3>
              <div className="w-10 h-10 rounded-full bg-[#F4A261] flex items-center justify-center"><ArrowUpRight size={18} /></div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((s, i) => (
            <div key={i} className="bg-[#FDF8F0]/50 border border-black/5 p-8 rounded-2xl hover:border-[#8B7E3D] transition-all">
              <div className="text-[#8B7E3D] mb-6">{s.icon}</div>
              <h4 className="text-sm font-bold uppercase mb-4">{s.title}</h4>
              <ul className="space-y-2 border-t border-black/5 pt-4">
                {s.list.map(item => <li key={item} className="text-black/60 text-[11px] flex items-center gap-2">✓ {item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
