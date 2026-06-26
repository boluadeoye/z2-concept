import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectMeta from "../components/portfolio/ProjectMeta";
import ProjectGallery from "../components/portfolio/ProjectGallery";
import RelatedProjects from "../components/portfolio/RelatedProjects";
import { Reveal } from "../components/shared/Reveal";
import { getSingleWPPortfolio } from "../lib/woocommerce";

// GREEDY PARSER: Extracts images from any WP HTML structure
const extractGalleryImages = (html: string): string[] => {
  if (!html) return [];
  // Matches src="..." or src='...' and handles data-src for lazy loading
  const imgRegex = /<(?:img|source)[^>]+(?:src|data-src)=["']([^"']+)["']/g;
  const images: string[] = [];
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const url = match[1];
    // Filter out small icons or non-image assets
    if (url.match(/\.(jpeg|jpg|gif|png|webp)/i) && !images.includes(url)) {
      images.push(url);
    }
  }
  return images;
};

// DATE NORMALIZER: Handles DD/MM/YYYY and ISO formats
const formatDate = (dateStr: string) => {
  if (!dateStr) return null;
  if (dateStr.includes('/')) {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric"
    });
  }
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  });
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
  
  // MEDIA LOGIC: Extract all images from content
  const allContentImages = extractGalleryImages(desc);
  
  // HERO LOGIC: Priority 1: Featured Image | Priority 2: First Content Image
  const featuredImage = project._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const heroImage = featuredImage || allContentImages[0];

  // GALLERY LOGIC: All content images MINUS the one used for Hero
  const galleryImages = allContentImages.filter(img => img !== heroImage);

  // METADATA RESOLVERS
  const category = project._embedded?.['wp:term']?.[0]?.[0]?.name || project.acf?.category;
  const rawDate = project.acf?.date || project.date;
  const displayDate = formatDate(rawDate);
  const location = project.acf?.location;
  const website = project.acf?.website;

  return (
    <main className="bg-[#FDF8F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <div className="mb-12">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-[12px] font-bold text-black/40 hover:text-[#FF6B35] transition-colors tracking-tight">
            <span>←</span> Portfolio / {title}
          </Link>
        </div>

        {heroImage && (
          <Reveal>
            <div className="relative w-full h-[50vh] md:h-[65vh] rounded-[48px] overflow-hidden shadow-2xl mb-16 border border-black/5">
              <img src={heroImage} className="w-full h-full object-cover" alt={title} />
            </div>
          </Reveal>
        )}

        <Reveal>
          <h1 className="text-4xl md:text-7xl font-black text-black mb-10 leading-tight tracking-tight">
            {title}
          </h1>
        </Reveal>

        <ProjectMeta 
          category={category} 
          date={displayDate || undefined} 
          location={location} 
          website={website} 
        />

        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24 mb-24 items-start">
          <Reveal>
            <h3 className="text-2xl md:text-4xl font-black text-black leading-tight tracking-tight">
              The Process: <br /> From Concept <br /> To Results
            </h3>
          </Reveal>
          <Reveal>
            <div
              className="space-y-6 text-black/70 text-sm md:text-base leading-relaxed portfolio-content"
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </Reveal>
        </div>

        <ProjectGallery images={galleryImages} />
        <RelatedProjects currentSlug={slug} />
      </div>
    </main>
  );
}
