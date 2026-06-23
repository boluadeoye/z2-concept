import React from "react";
import { Camera, Video, Monitor, PenTool, Cpu, Share2, Lightbulb, Check } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const services = [
  { 
    icon: <Camera size={18} />, 
    title: "Photography", 
    desc: "Whether you need corporate headshots, event coverage, product photography, or lifestyle content, we create images that connect.",
    list: ["Corporate Photography", "Event Photography", "Product Photography", "Real Estate Photography", "Portrait & Lifestyle", "Brand Content"] 
  },
  { 
    icon: <Video size={18} />, 
    title: "Video Production", 
    desc: "Our team produces high-quality videos that communicate your message, showcase your products, and inspire action.",
    list: ["Corporate Videos", "Promotional Videos", "Event Coverage", "Documentary Production", "Social Media Videos", "Product Videos", "Drone Videography", "Post-Production"] 
  },
  { 
    icon: <Monitor size={18} />, 
    title: "Website Development", 
    desc: "We design and develop modern, responsive, and conversion-focused websites that help you attract leads and generate sales.",
    list: ["Business Websites", "E-commerce Stores", "Portfolio Websites", "Landing Pages", "Custom Web Apps", "Maintenance & Support", "SEO-Friendly Dev"] 
  },
  { 
    icon: <PenTool size={18} />, 
    title: "Graphic Design", 
    desc: "We help businesses communicate professionally through impactful graphic design and cohesive branding solutions.",
    list: ["Logo Design", "Brand Identity", "Marketing Materials", "Social Media Graphics", "Flyers & Brochures", "Business Presentations", "Packaging Design", "Print & Digital"] 
  },
  { 
    icon: <Cpu size={18} />, 
    title: "AI Content Creation", 
    desc: "We combine AI technology with human creativity to produce content that captures attention and drives results.",
    list: ["AI Video Creation", "AI Image Generation", "AI Voiceovers", "AI Marketing Content", "Automated Production", "AI Social Media", "AI Creative Campaigns"] 
  },
  { 
    icon: <Share2 size={18} />, 
    title: "Social Media Content", 
    desc: "Build a consistent and engaging social media presence with professionally crafted content designed to increase reach.",
    list: ["Social Media Graphics", "Reels & Short Videos", "Content Planning", "Creative Campaigns", "Promotional Content", "Visual Storytelling"] 
  },
  { 
    icon: <Lightbulb size={18} />, 
    title: "Creative Consulting", 
    desc: "We provide creative consulting that helps businesses make smarter decisions and maximize their marketing investments.",
    list: ["Brand Strategy", "Content Strategy", "Creative Direction", "Digital Growth Planning", "Campaign Development", "Media Production Planning"] 
  }
];

export default function ServicesGrid() {
  return (
    <section className="pb-32 px-4 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-4 lg:gap-6">
          {services.map((s, i) => (
            <Reveal key={i}>
              <div className="bg-white p-6 lg:p-8 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/5 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="text-[#FF6B35] bg-[#FF6B35]/5 p-2 rounded-xl shrink-0">{s.icon}</div>
                  <h3 className="text-[11px] lg:text-[13px] font-black text-black tracking-tight leading-tight">{s.title}</h3>
                </div>
                <p className="text-black/50 text-[10px] lg:text-[11px] leading-relaxed mb-6">
                  {s.desc}
                </p>
                <ul className="space-y-2.5 pt-5 border-t border-black/5 mt-auto">
                  {s.list.map(item => (
                    <li key={item} className="text-black/80 text-[9px] lg:text-[10px] font-bold flex items-center gap-2">
                      <Check size={10} className="text-[#FF6B35] shrink-0" strokeWidth={4} />
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
