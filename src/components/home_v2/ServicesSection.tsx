import React from "react";
import { 
  Camera, 
  Video, 
  Monitor, 
  Smile, 
  Clock, 
  Layers, 
  Activity, 
  Users 
} from "lucide-react";
import { Reveal } from "../shared/Reveal";

const services = [
  { 
    icon: <Camera size={32} strokeWidth={1.5} />, 
    title: "Photography", 
    desc: "Professional shoots for weddings, events, portraits, real estate and more. Every frame composed with intention." 
  },
  { 
    icon: <Video size={32} strokeWidth={1.5} />, 
    title: "Video Production", 
    desc: "Cinematic event coverage, highlight reels, and full-length productions edited to a standard that speaks for itself." 
  },
  { 
    icon: <Monitor size={32} strokeWidth={1.5} />, 
    title: "Web Development", 
    desc: "Clean, fast, mobile-first websites built to represent your brand and convert visitors into clients." 
  },
  { 
    icon: <Smile size={32} strokeWidth={1.5} />, 
    title: "Graphics Design", 
    desc: "Flyers, banners, social media graphics and brand visuals designed to stop the scroll and make an impact." 
  },
  { 
    icon: <Clock size={32} strokeWidth={1.5} />, 
    title: "AI Content Creation", 
    desc: "Smart, AI-powered content strategy, copy, and visuals that keep your brand consistent and your audience engaged." 
  },
  { 
    icon: <Layers size={32} strokeWidth={1.5} />, 
    title: "Logo Design", 
    desc: "Distinctive logos and full brand identity packages that tell your story at a glance and last a lifetime." 
  },
  { 
    icon: <Activity size={32} strokeWidth={1.5} />, 
    title: "Photo & Video Editing", 
    desc: "Professional post-production — colour grading, retouching, and cuts that make your raw footage shine." 
  },
  { 
    icon: <Users size={32} strokeWidth={1.5} />, 
    title: "Event Coverage", 
    desc: "Full-day event documentation — birthdays, funerals, graduations, baby showers, corporate events and more." 
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#0C0608] px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* ABSOLUTE HEADER DESIGN WITH THICK LINES */}
        <div className="flex flex-col items-center mb-20">
          <div className="w-full h-[1px] bg-white/10 mb-10" />
          <span className="text-[#FF6B35] text-[10px] font-black uppercase tracking-[0.3em] mb-2">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-10">Our Services</h2>
          <div className="w-full h-[1px] bg-white/10" />
        </div>

        {/* FORCED 4-COLUMN GRID (Triggering at 'sm' to ensure 4 columns on most screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="bg-[#120a0d] border border-white/5 p-8 flex flex-col items-start text-left relative group min-h-[380px]">
                {/* THICK ORANGE TOP BORDER - EXACT MATCH */}
                <div className="absolute top-0 left-0 w-full h-[4px] bg-[#FF6B35]" />
                
                <div className="text-[#FF6B35] mb-8 mt-4">
                  {s.icon}
                </div>

                <h3 className="text-white text-[15px] font-black uppercase mb-4 tracking-wider leading-tight">
                  {s.title}
                </h3>
                
                <p className="text-white/40 text-[13px] leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
