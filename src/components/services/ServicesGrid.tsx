import React from "react";
import { Camera, Video, Monitor, PenTool, Cpu, Check } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const cardText = "specialises in professional photography and video production, delivering high-quality visuals across a wide range of projects. From weddings and events to fashion, corporate content, and branded media.";

const services = [
  { icon: <Camera size={18} />, title: "Photography", list: ["Photo Studio", "Photo Editing"] },
  { icon: <Video size={18} />, title: "Video Production", list: ["Event Coverage", "Video Editing"] },
  { icon: <Monitor size={18} />, title: "Website Development", list: ["e-Commerce", "Real Estate"] },
  { icon: <PenTool size={18} />, title: "Graphic Design", list: ["Logo Design", "Social Media Design"] },
  { icon: <Cpu size={18} />, title: "AI Content Creation", list: ["Photo Studio", "Photo Editing"] },
  { icon: <Video size={18} />, title: "Video Production", list: ["Event Coverage", "Video Editing"] },
  { icon: <Monitor size={18} />, title: "Website Development", list: ["e-Commerce", "Real Estate"] },
  { icon: <PenTool size={18} />, title: "Graphic Design", list: ["Logo Design", "Social Media Design"] }
];

export default function ServicesGrid() {
  return (
    <section className="pb-32 px-4 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        {/* FORCED 4 COLUMNS ACROSS / 2 ROWS DOWN */}
        <div className="grid grid-cols-4 gap-4 lg:gap-8">
          {services.map((s, i) => (
            <Reveal key={i}>
              <div className="bg-white p-6 lg:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-black/5 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-[#FF6B35] bg-[#FF6B35]/5 p-2 rounded-xl">{s.icon}</div>
                  <h3 className="text-[10px] lg:text-[12px] font-black uppercase tracking-[0.1em] text-black">{s.title}</h3>
                </div>
                <p className="text-black/50 text-[10px] lg:text-[11px] leading-relaxed mb-8 flex-1">
                  {cardText}
                </p>
                <ul className="space-y-3 pt-6 border-t border-black/5">
                  {s.list.map(item => (
                    <li key={item} className="text-black/80 text-[9px] lg:text-[11px] font-bold flex items-center gap-2">
                      <Check size={10} className="text-[#FF6B35]" strokeWidth={4} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
