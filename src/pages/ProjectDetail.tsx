import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectMeta from "../components/portfolio/ProjectMeta";
import ProjectGallery from "../components/portfolio/ProjectGallery";
import RelatedProjects from "../components/portfolio/RelatedProjects";
import { Reveal } from "../components/shared/Reveal";
import { getSingleWPPortfolio } from "../lib/woocommerce";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      if (slug) {
        const data = await getSingleWPPortfolio(slug);
        setProject(data);
      }
      setLoading(false);
      window.scrollTo(0, 0);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FDF8F0]">
        <div className="text-black/20 font-black uppercase tracking-[0.5em] animate-pulse text-xl">
          Loading Project...
        </div>
      </div>
    );
  }

  const title = project?.title?.rendered || "Jessica's Wedding Photoshoot";
  const desc = project?.content?.rendered || `
    <p>Pixel perfect prints are more than a mark of quality—they are a testament to your brand's commitment to excellence. By ensuring every detail of your design is captured accurately, you enhance your brand's visual appeal, communicate more effectively, and leave a lasting impression on your audience.</p>
    <p>Contact us today to discover how we can help you achieve printing perfection. High-quality materials and printing techniques ensure that your prints are durable and long-lasting, reducing the need for frequent reprints.</p>
  `;
  const heroImage = project?._embedded?.['wp:featuredmedia']?.[0]?.source_url || "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781521102/blog_assets/skw6qc5r8hu7ajzgmuxh.png";

  return (
    <main className="bg-[#FDF8F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        
        {/* Breadcrumb */}
        <div className="mb-12">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-[12px] font-bold text-black/40 hover:text-[#FF6B35] transition-colors tracking-tight">
            <span>←</span> Portfolio / {title}
          </Link>
        </div>

        {/* Hero Image */}
        <Reveal>
          <div className="relative w-full h-[50vh] md:h-[65vh] rounded-[48px] overflow-hidden shadow-2xl mb-16 border border-black/5">
            <img 
              src={heroImage} 
              className="w-full h-full object-cover"
              alt="Project Hero"
            />
          </div>
        </Reveal>

        {/* Title & Meta */}
        <Reveal>
          <h1 className="text-4xl md:text-7xl font-black text-black mb-10 leading-tight tracking-tight">
            {title}
          </h1>
        </Reveal>
        
        <ProjectMeta />

        {/* Narrative Split */}
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24 mb-24 items-start">
          <Reveal>
            <h3 className="text-2xl md:text-4xl font-black text-black leading-tight tracking-tight">
              The process: <br /> From Concept <br /> to Results
            </h3>
          </Reveal>
          <Reveal>
            <div 
              className="space-y-6 text-black/70 text-sm md:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </Reveal>
        </div>

        <ProjectGallery />
        <RelatedProjects />
      </div>
    </main>
  );
}
