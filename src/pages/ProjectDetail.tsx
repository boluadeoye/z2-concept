import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectMeta from "../components/portfolio/ProjectMeta";
import ProjectGallery from "../components/portfolio/ProjectGallery";
import RelatedProjects from "../components/portfolio/RelatedProjects";
import { Reveal } from "../components/shared/Reveal";
import { getSingleWPPortfolio } from "../lib/woocommerce";

/**
 * GREEDY IMAGE PARSER
 * Extracts all valid image URLs from WordPress HTML content
 */
const extractAllImages = (html: string): string[] => {
  if (!html) return [];
  // Handles src/data-src, single/double quotes, and extra attributes
  const imgRegex = /<img[^>]+(?:src|data-src)=["']([^"']+)["'][^>]*>/g;
  const images: string[] = [];
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const url = match[1];
    // Filter for valid image extensions
    if (url.match(/\.(jpeg|jpg|gif|png|webp|avif)/i)) {
      images.push(url);
    }
  }
  // Deduplicate URLs
  return Array.from(new Set(images));
};

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

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FDF8F0] px-6 text-center">
        <h1 className="text-4xl font-black text-black mb-6">Project Not Found</h1>
        <Link to="/portfolio" className="text-[#FF6B35] font-bold underline">Return To Portfolio</Link>
      </div>
    );
  }

  const title = project.title?.rendered || "";
  const desc = project.content?.rendered || "";
  
  // 1. Extract all images from content
  const allContentImages = extractAllImages(desc);
  
  // 2. Resolve Hero Image (Featured Image OR First Content Image)
  const wpHero = project._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const finalHero = wpHero || (allContentImages.length > 0 ? allContentImages[0] : null);

  // 3. Resolve Gallery (All images EXCEPT the one used for Hero)
  const galleryImages = allContentImages.filter(img => img !== finalHero);

  // Metadata Resolvers
  const category = project._embedded?.['wp:term']?.[0]?.[0]?.name || project.acf?.category;
  const date = project.date || project.acf?.date;
  const location = project.acf?.location;
  const website = project.acf?.website;

  return (
    <main className="bg-[#FDF8F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Breadcrumb */}
        <div className="mb-12">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-[12px] font-bold text-black/40 hover:text-[#FF6B35] transition-colors tracking-tight">
            <span>←</span> Portfolio / {title}
          </Link>
        </div>

        {/* Hero Image: Only renders if an image exists */}
        {finalHero && (
          <Reveal>
            <div className="relative w-full h-[50vh] md:h-[65vh] rounded-[48px] overflow-hidden shadow-2xl mb-16 border border-black/5 bg-white">
              <img 
                src={finalHero} 
                className="w-full h-full object-cover" 
                alt={title} 
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          </Reveal>
        )}

        {/* Title & Meta */}
        <Reveal>
          <h1 className="text-4xl md:text-7xl font-black text-black mb-10 leading-tight tracking-tight">
            {title}
          </h1>
        </Reveal>

        <ProjectMeta category={category} date={date} location={location} website={website} />

        {/* Narrative Split */}
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24 mb-24 items-start">
          <Reveal>
            <h3 className="text-2xl md:text-4xl font-black text-black leading-tight tracking-tight">
              The Process: <br /> From Concept <br /> To Results
            </h3>
          </Reveal>
          <Reveal>
            <div
              className="space-y-6 text-black/70 text-sm md:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </Reveal>
        </div>

        {/* Gallery: Dynamic Grid */}
        <ProjectGallery images={galleryImages} />
        
        {/* Related Projects: Contextual Feed */}
        <RelatedProjects currentSlug={slug} />
      </div>
    </main>
  );
}
