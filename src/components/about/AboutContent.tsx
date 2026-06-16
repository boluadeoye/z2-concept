import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function AboutContent() {
  const [activeTab, setActiveTab] = useState("company");
  const text = "specialises in professional photography and video production, delivering high-quality visuals across a wide range of projects. From weddings and events to fashion, corporate content, and branded media.";

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        {/* items-stretch is the master lock for equal height */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-10 lg:gap-12 items-stretch">
          
          {/* LEFT: The Narrative Card */}
          <div className="flex flex-col">
            <Reveal className="h-full">
              <div className="bg-white rounded-[48px] p-10 lg:p-16 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col h-full">
                {/* Tabs */}
                <div className="flex gap-4 mb-12">
                  <button 
                    onClick={() => setActiveTab("company")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all text-[10px] font-bold uppercase tracking-widest ${
                      activeTab === "company" ? "bg-white border-black text-black" : "bg-transparent border-black/10 text-black/40"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${activeTab === "company" ? "bg-[#FF6B35]" : "bg-black/20"}`} />
                    About Company
                  </button>
                  <button 
                    onClick={() => setActiveTab("founder")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all text-[10px] font-bold uppercase tracking-widest ${
                      activeTab === "founder" ? "bg-white border-black text-black" : "bg-transparent border-black/10 text-black/40"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${activeTab === "founder" ? "bg-[#FF6B35]" : "bg-black/20"}`} />
                    About Founder
                  </button>
                </div>

                <h2 className="text-3xl lg:text-5xl font-black text-black mb-10 leading-tight uppercase tracking-tight">
                  Kefee Home Productions and its creative division, Z2 Concepts
                </h2>

                <div className="space-y-8 text-black/70 text-sm lg:text-base leading-relaxed mb-12 flex-1">
                  <p>{text}</p>
                  <p>{text}{text}</p>
                  <p>{text}</p>
                </div>

                <div className="mt-auto">
                  <button className="flex items-center gap-3 bg-white border border-black/10 text-black rounded-full px-10 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all group shadow-md">
                    DOWNLOAD PROFILE <ArrowUpRight size={16} strokeWidth={3} className="text-[#FF6B35] group-hover:text-white" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: The Anchored Visual Pillar (FORCED STRETCH) */}
          <div className="hidden md:block">
            <Reveal className="h-full">
              <div className="relative h-full w-full rounded-[48px] overflow-hidden shadow-2xl border border-black/5">
                <img 
                  src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png" 
                  alt="About Z2"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Mobile Image */}
          <div className="md:hidden w-full mt-8">
            <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-xl">
              <img 
                src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png" 
                alt="About Z2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
