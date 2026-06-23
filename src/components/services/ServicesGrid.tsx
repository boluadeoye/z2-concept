import React from "react";
import { Camera, Video, Monitor, PenTool, Cpu, Share2, Lightbulb, Check } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const services = [
  { icon: <Camera size={18} />, title: "Photography", desc: "Whether you need corporate headshots, event coverage, or product photography, we create images that connect.", list: ["Corporate Photography", "Event Photography", "Product Photography", "Portrait & Lifestyle"] },
  { icon: <Video size={18} />, title: "Video Production", desc: "Our team produces high-quality videos that communicate your message and inspire action.", list: ["Corporate Videos", "Promotional Videos", "Event Coverage", "Post-Production"] },
  { icon: <Monitor size={18} />, title: "Website Development", desc: "We design and develop modern, responsive, and conversion-focused websites.", list: ["Business Websites", "E-commerce Stores", "Portfolio Websites", "Landing Pages"] },
  { icon: <PenTool size={18} />, title: "Graphic Design", desc: "We help businesses communicate professionally through impactful graphic design.", list: ["Logo Design", "Brand Identity", "Marketing Materials", "Print & Digital"] },
  { icon: <Cpu size={18} />, title: "AI Content Creation", desc: "We combine AI technology with human creativity to produce content that captures attention.", list: ["AI Video Creation", "AI Image Generation", "AI Voiceovers", "AI Social Media"] },
  { icon: <Share2 size={18} />, title: "Social Media Content", desc: "Build a consistent and engaging social media presence with professionally crafted content.", list: ["Social Media Graphics", "Reels & Short Videos", "Content Planning", "Visual Storytelling"] },
  { icon: <Lightbulb size={18} />, title: "Creative Consulting", desc: "We provide creative consulting that helps businesses make smarter decisions.", list: ["Brand Strategy", "Content Strategy", "Creative Direction", "Campaign Development"] }
];

export default function ServicesGrid() {
  return (
    <section className="pb-32 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* 
          FORCED 4-COLUMN GRID (4x2 Layout)
          - Mobile: Horizontal Swipe
          - Desktop (md+): Strictly 4 Columns
        */}
        <div className="flex md:grid md:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar gap-4 lg:gap-6 pb-8 md:pb-0">
          
          {services.map((s, i) => (
            <div key={i} className="min-w-[85vw] md:min-w-0 snap-center flex flex-col h-full">
              <Reveal className="h-full">
                <div className="bg-white p-6 lg:p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-black/5 h-full flex flex-col transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.06)] hover:-translate-y-1">
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-[#FF6B35] bg-[#FF6B35]/5 p-2.5 rounded-2xl shrink-0">
                      {s.icon}
                    </div>
                    <h3 className="text-[13px] lg:text-[15px] font-black text-black tracking-tight leading-tight">
                      {s.title}
                    </h3>
                  </div>

                  <p className="text-black/50 text-[11px] lg:text-[12px] leading-relaxed mb-6">
                    {s.desc}
                  </p>

                  <ul className="space-y-2.5 pt-6 border-t border-black/5 mt-auto">
                    {s.list.map(item => (
                      <li key={item} className="text-black/80 text-[9px] lg:text-[10px] font-bold flex items-center gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                          <Check size={8} className="text-green-600" strokeWidth={5} />
                        </div>
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          ))}
          
          <div className="min-w-[4vw] md:hidden" />
        </div>
      </div>
    </section>
  );
}
