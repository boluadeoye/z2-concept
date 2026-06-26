import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectMeta from "../components/portfolio/ProjectMeta";
import ProjectGallery from "../components/portfolio/ProjectGallery";
import RelatedProjects from "../components/portfolio/RelatedProjects";
import { Reveal } from "../components/shared/Reveal";
import { getSingleWPPortfolio } from "../lib/woocommerce";

const WP_BASE_URL = "https://sleigh.staymedia.ng";

const normalizeUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${WP_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

const extractAllImages = (html: string): string[] => {
  if (!html) return [];
  const imgRegex = /<img[^>]+(?:src|data-src)=["']([^"']+)["'][^>]*>/g;
  const images: string[] = [];
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    images.push(normalizeUrl(match[1]));
  }
  return Array.from(new Set(images));
};

/**
 * MEDIA STRIPPER
 * Removes all <img> tags and empty <p> tags from HTML to clean the narrative flow
 */
const stripMediaFromHtml = (html: string): string => {
  if (!html) return "";
  return html
    .replace(/<img[^>]*>/g, "") // Remove images
    .replace(/<figure[^>]*>[\s\S]*?<\/figure>/g, "") // Remove WP figure wrappers
    .replace(/<p>\s*<\/p>/g, ""); // Remove empty paragraphs left behind
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
  const rawContent = project.content?.rendered || "";
  
  // 1. Extract all images for the Gallery
  const allImages = extractAllImages(rawContent);
  
  // 2. Clean the text for the Narrative section
  const cleanDescription = stripMediaFromHtml(rawContent);
  
  // 3. Resolve Hero
  const wpHero = project._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const finalHero = normalizeUrl(wpHero) || (allImages.length > 0 ? allImages[0] : null);

  // 4. Resolve Gallery (Everything except the Hero)
  const galleryImages = allImages.filter(img => img !== finalHero);

  const category = project._embedded?.['wp:term']?.[0]?.[0]?.name || project.acf?.category;
  const date = project.date || project.acf?.date;

  return (
    <main className="bg-[#FDF8F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        
        {/* Breadcrumb */}
        <div className="mb-12">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-[12px] font-bold text-black/40 hover:text-[#FF6B35] transition-colors tracking-tight">
            <span>←</span> Portfolio / {title}
          </Link>
        </div>

        {/* Hero Image: Cinematic Aspect Ratio */}
        {finalHero && (
          <Reveal>
            <div className="relative w-full aspect-[16/10] md:aspect-[21/10] rounded-[40px] overflow-hidden shadow-2xl mb-16 border border-black/5 bg-white">
              <img src={finalHero} className="w-full h-full object-cover" alt={title} />
            </div>
          </Reveal>
        )}

        {/* Title & Meta */}
        <Reveal>
          <h1 className="text-4xl md:text-7xl font-black text-black mb-10 leading-tight tracking-tight">
            {title}
          </h1>
        </Reveal>

        <ProjectMeta category={category} date={date} location={project.acf?.location} website={project.acf?.website} />

        {/* Narrative Split: Clean Text Only */}
        <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-24 mb-24 items-start">
          <Reveal>
            <h3 className="text-2xl md:text-4xl font-black text-black leading-tight tracking-tight">
              The Process: <br /> From Concept <br /> To Results
            </h3>
          </Reveal>
          <Reveal>
            <div
              className="prose prose-sm md:prose-base max-w-none text-black/70 leading-relaxed
                prose-headings:text-black prose-headings:font-black prose-headings:tracking-tight
                prose-ul:list-none prose-ul:pl-0 prose-li:border-b prose-li:border-black/5 prose-li:py-3
                prose-li:flex prose-li:justify-between prose-strong:text-black"
              dangerouslySetInnerHTML={{ __html: cleanDescription }}
            />
          </Reveal>
        </div>

        {/* Gallery: Structured Grid */}
        <ProjectGallery images={galleryImages} />
        
        <RelatedProjects currentSlug={slug} />
      </div>
    </main>
  );
}
