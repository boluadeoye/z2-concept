import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { getWPPortfolios } from "../../lib/woocommerce";

const WP_BASE_URL = "https://sleigh.staymedia.ng";

const normalizeUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${WP_BASE_URL}${url.startsWith("/") ? url : "/" + url}`;
};

const extractFirstImage = (html: string): string | null => {
  if (!html) return null;
  const imgRegex = /<img[^>]+(?:src|data-src)=["']([^"']+)["'][^>]*>/i;
  const match = imgRegex.exec(html);
  return match ? normalizeUrl(match[1]) : null;
};

export default function PortfolioGrid() {
  const [activeCat, setActiveCat] = useState("All");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolio() {
      setLoading(true);
      try {
        const data = await getWPPortfolios();
        if (data && data.length > 0) {
          const mapped = data.map((item: any, i: number) => {
            const featuredImg = item._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            const contentImg = extractFirstImage(item.content?.rendered);
            
            return {
              slug: item.slug,
              title: item.title?.rendered,
              active: i === 1, 
              // Priority: Featured Image > First Image in Content > Placeholder
              img: normalizeUrl(featuredImg) || contentImg || "https://res.cloudinary.com/dwbjb3svx/image/upload/v1782137995/blog_assets/qsgt9yfrytzydaomtuwd.jpg"
            };
          });
          
          setProjects(mapped);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Portfolio Load Error:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    loadPortfolio();
  }, []);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#FDF8F0]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <Reveal>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white w-fit mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
            <span className="text-[10px] font-bold text-black/60 uppercase tracking-widest">Our Works</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-[1.1] max-w-[20ch]">
            Kefee Home Productions X Z2 Concepts Your Media Partner
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="max-w-md">
          <p className="text-black/60 leading-relaxed text-sm md:text-base">
            We offer the printing of graphics, text, logos, and other branding elements onto packaging materials...
          </p>
        </Reveal>
      </div>

      <div className="flex gap-3 mb-16 overflow-x-auto pb-4 no-scrollbar">
        {["All", "Photography", "Video Coverage", "Website Development", "Graphic Design"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-8 py-3 rounded-full text-[11px] font-bold transition-all whitespace-nowrap border ${
              activeCat === cat
                ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-xl shadow-[#FF6B35]/20"
                : "bg-white border-black/5 text-black/40 hover:border-black/20"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-black/5 rounded-[40px]" />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Link to={`/portfolio/${project.slug}`} className="group flex flex-col h-full">
                <div className="relative aspect-square rounded-[40px] overflow-hidden mb-6 shadow-2xl border border-black/5 bg-white">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <div className={`p-8 rounded-[32px] flex items-center justify-between transition-all duration-500 flex-1 min-h-[120px] ${
                  project.active 
                    ? "bg-[#FF6B35] text-white shadow-2xl shadow-[#FF6B35]/30" 
                    : "bg-white text-black border border-black/5 group-hover:border-[#FF6B35]/30"
                }`}>
                  <span className="text-xl font-bold tracking-tight leading-tight pr-4">
                    {project.title}
                  </span>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    project.active ? "bg-white/20 text-white" : "bg-[#FF6B35]/10 text-[#FF6B35]"
                  }`}>
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-black/20 font-bold text-xl tracking-widest uppercase">No Projects Found In Database</p>
        </div>
      )}
    </section>
  );
}
