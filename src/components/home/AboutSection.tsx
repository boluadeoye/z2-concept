import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex gap-4 mb-10">
              {["company", "founder"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                    activeTab === tab ? "bg-[#F4A261] text-white" : "border border-black/10 text-black/60"
                  }`}
                >
                  About {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-black mb-8 leading-tight uppercase">
              {activeTab === "company" 
                ? "Kefee Home Productions and its creative division, Z2 Concepts"
                : "Visionary leadership crafting digital experiences & elite prints"
              }
            </h2>

            <div className="text-black/80 text-sm md:text-base leading-relaxed space-y-6 mb-12">
              {activeTab === "company" ? (
                <p>We specialize in professional photography and video production, delivering high-quality visuals across a wide range of projects. From weddings and events to fashion, corporate content, and branded media.</p>
              ) : (
                <p>Our founder built Z2 Concepts on the absolute belief that print and digital media are not separate entities, but elements of a single cohesive brand narrative.</p>
              )}
            </div>

            <button className="px-8 py-3 rounded-full border border-black/20 text-black font-bold uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all flex items-center gap-2">
              Download Profile <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl border border-black/5">
            <img 
              src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521104/blog_assets/uhkj4l7sck5mdfvfbrpq.png"
              alt="About Z2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
