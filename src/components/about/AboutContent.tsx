import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

export default function AboutContent() {
  const [activeTab, setActiveTab] = useState("company");

  const content = {
    company: {
      heading: "From Media Production to Digital Experiences",
      paragraphs: [
        "At our company, we excel in transforming ideas into stunning realities through a diverse range of media production services. Our expertise spans professional photography, video production, web design, branding, and AI-powered content creation. We are dedicated to delivering exceptional visuals that resonate across a myriad of projects, including weddings, corporate events, fashion shoots, and branded media campaigns.",
        "What truly distinguishes us in the industry is our unique ability to infuse creativity and innovation into every phase of the production process. We believe that every project should be a reflection of our clients' individuality and core values, which is why we adopt a highly collaborative approach. By actively engaging with our clients, we ensure that their vision is at the heart of what we create.",
        "Whether it’s capturing the emotions of a wedding, showcasing a brand’s identity through tailored media, or developing a compelling online presence, we strive to exceed expectations and deliver results that truly stand out."
      ],
      cta: "Download Profile"
    },
    founder: {
      heading: "Eric is the Founder and CEO of Kefee Home Productions and its Creative Division, Z2 Concepts",
      paragraphs: [
        "His commitment is to providing a holistic visual experience that not only meets the demands of modern standards but also maintains a personal touch that makes each project memorable and impactful."
      ],
      cta: "Download Profile"
    }
  };

  const activeData = activeTab === "company" ? content.company : content.founder;
  const imageAsset = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137995/blog_assets/qsgt9yfrytzydaomtuwd.jpg";

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-10 lg:gap-12 items-stretch">
          
          {/* LEFT: The Narrative Card */}
          <div className="flex flex-col h-full">
            <Reveal className="h-full">
              <div className="bg-white rounded-[48px] p-10 lg:p-16 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col h-full">
                
                {/* Standardized Badge Navigation */}
                <div className="flex gap-4 mb-12">
                  <button 
                    onClick={() => setActiveTab("company")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all text-[10px] font-bold uppercase tracking-widest ${
                      activeTab === "company" ? "bg-white border-black text-black" : "bg-transparent border-black/10 text-black/40"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${activeTab === "company" ? "bg-[#FF6B35]" : "bg-black/20"}`} />
                    About Us
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

                <h2 className="text-3xl lg:text-5xl font-black text-black mb-10 leading-tight tracking-tight">
                  {activeData.heading}
                </h2>

                <div className="space-y-6 text-black/70 text-sm lg:text-base leading-relaxed mb-12 flex-1">
                  {activeData.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-auto">
                  <button className="flex items-center gap-3 bg-white border border-black/10 text-black rounded-full px-10 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all group shadow-md">
                    {activeData.cta} <ArrowUpRight size={16} strokeWidth={3} className="text-[#FF6B35] group-hover:text-white" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: The Visual Pillar - Corrected Focal Point to prevent "Cut" subjects */}
          <div className="hidden md:block h-full">
            <Reveal className="h-full">
              <div className="relative h-full w-full rounded-[48px] overflow-hidden shadow-2xl border border-black/5">
                <img 
                  src={imageAsset} 
                  alt="Z2 Concept Visual"
                  className="absolute inset-0 w-full h-full object-cover object-[center_15%] antialiased"
                />
              </div>
            </Reveal>
          </div>

          {/* Mobile Image: Corrected Focal Point */}
          <div className="md:hidden w-full mt-8">
            <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-xl">
              <img 
                src={imageAsset} 
                alt="Z2 Concept Visual"
                className="w-full h-full object-cover object-[center_15%]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
