import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const services = [
  { title: "Photography", img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782138508/blog_assets/xgx29asy5mvyi9tnpner.jpg" },
  { title: "Video Production", img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137278/blog_assets/uftpsbjdtjezhshfwu9y.jpg" },
  { title: "Website Development", img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782138122/blog_assets/imueq9xlwj0n9oxlz6ay.jpg" },
  { title: "Graphic Design", img: "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782138681/blog_assets/lms2u2ymh5c0o3qc6efb.jpg" }
];

export default function ServicesOverview() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <Reveal>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">What We Offer</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight">Our Services</h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-16">
          {services.map((s, i) => (
            <Reveal key={i}>
              <div className="group cursor-pointer">
                {/* IMAGE CONTAINER: Rounded as per prototype */}
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-6 border border-black/5 shadow-sm bg-white">
                  <img 
                    src={s.img} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={s.title} 
                  />
                </div>
                
                {/* TITLE & NAV TRIGGER: No Cart Icon */}
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-[15px] md:text-[17px] font-bold text-black tracking-tight leading-tight">
                    {s.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-[#F2E3D5] text-black flex items-center justify-center transition-all duration-300 group-hover:bg-[#FF6B35] group-hover:text-white">
                    <ArrowUpRight size={16} strokeWidth={3} className="rotate-45" />
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
