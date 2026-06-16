import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectMeta from "../components/portfolio/ProjectMeta";
import ProjectGallery from "../components/portfolio/ProjectGallery";
import RelatedProjects from "../components/portfolio/RelatedProjects";
import { Reveal } from "../components/shared/Reveal";

export default function ProjectDetail() {
  const { slug } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const displayTitle = "Jessica's Wedding Photoshoot";

  return (
    <main className="bg-[#FDF8F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        
        {/* 1. BREADCRUMB - Tightened */}
        <div className="mb-8">
          <Link to="/store" className="inline-flex items-center gap-2 text-[10px] font-bold text-[#FF6B35] hover:text-black transition-colors">
            <span className="text-base">←</span> 
            <span className="text-black/40">Store /</span> 
            <span className="text-black/40 underline decoration-black/10 underline-offset-4">Product Name</span>
          </Link>
        </div>

        {/* 2. MAIN IMAGE - SHARP EDGES */}
        <Reveal>
          <div className="relative w-full aspect-[16/7] overflow-hidden shadow-2xl mb-10 border border-black/5">
            <img 
              src="https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521102/blog_assets/skw6qc5r8hu7ajzgmuxh.png" 
              className="w-full h-full object-cover"
              alt="Jessica's Wedding Photoshoot"
            />
          </div>
        </Reveal>

        {/* 3. TITLE - Tightened Margin */}
        <Reveal>
          <h1 className="text-3xl md:text-5xl font-black text-black mb-8 tracking-tight">
            {displayTitle}
          </h1>
        </Reveal>
        
        {/* 4. META BAR */}
        <ProjectMeta />

        {/* 5. COMPACT NARRATIVE SPLIT */}
        <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-12 mb-16 items-start">
          <Reveal>
            <h3 className="text-xl md:text-3xl font-black text-black leading-tight tracking-tight">
              The process: <br /> From Concept <br /> to Results
            </h3>
          </Reveal>
          <Reveal>
            <div className="space-y-6 text-black/70 text-[13px] md:text-sm leading-relaxed">
              <p>Pixel perfect prints are more than a mark of quality—they are a testament to your brand's commitment to excellence. By ensuring every detail of your design is captured accurately, you enhance your brand's visual appeal, communicate more effectively, and leave a lasting impression on your audience. Trust our company to deliver pixel perfect prints that transform your creative visions into reality.</p>
              <p>Contact us today to discover how we can help you achieve printing perfection. High-quality materials and printing techniques ensure that your prints are durable and long-lasting, reducing the need for frequent reprints.</p>
              <p>In the competitive world of design and marketing, the quality of your printed materials can significantly impact how your brand is perceived. Pixel perfect prints are not just a technical ideal; they are a necessity for ensuring that every detail of your design is accurately.</p>
            </div>
          </Reveal>
        </div>

        {/* 6. GALLERY & RELATED */}
        <ProjectGallery />
        <RelatedProjects />
      </div>
    </main>
  );
}
