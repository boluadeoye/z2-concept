import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Inbox } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { getGalleryItems, getGalleryCategories } from "../../lib/woocommerce";

const WP_DOMAIN = "https://sleigh.staymedia.ng";

const normalizeUrl = (url: string): string => {
  if (!url) return "";
  let clean = url.replace(/\\/g, "").replace(/"/g, "");
  if (clean.startsWith(WP_DOMAIN)) return clean.replace(WP_DOMAIN, "");
  return clean;
};

export default function PortfolioGrid() {
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initGallery() {
      setLoading(true);
      try {
        const [catData, itemData] = await Promise.all([
          getGalleryCategories(),
          getGalleryItems()
        ]);
        setCategories(catData || []);
        setProjects(itemData || []);
      } catch (error) {
        console.error("Gallery Init Error:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
    initGallery();
  }, []);

  const handleFilter = async (id: number | null) => {
    setActiveCat(id);
    setLoading(true);
    try {
      const filteredData = await getGalleryItems(id || undefined);
      setProjects(filteredData || []);
    } catch (error) {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#FDF8F0]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <Reveal>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white w-fit mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
            <span className="text-[10px] font-bold text-black/60 uppercase tracking-widest">Our Gallery</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-[1.1] max-w-[20ch]">
            Kefee Home Productions X Z2 Concepts Your Media Partner
          </h2>
        </Reveal>
      </div>

      <div className="flex gap-3 mb-16 overflow-x-auto pb-4 no-scrollbar">
        <button
          onClick={() => handleFilter(null)}
          className={`px-8 py-3 rounded-full text-[11px] font-bold transition-all whitespace-nowrap border ${
            activeCat === null ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-xl" : "bg-white border-black/5 text-black/40"
          }`}
        >
          ALL
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.id)}
            className={`px-8 py-3 rounded-full text-[11px] font-bold transition-all whitespace-nowrap border ${
              activeCat === cat.id ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-xl" : "bg-white border-black/5 text-black/40"
            }`}
          >
            {cat.name.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3].map((i) => <div key={i} className="aspect-square bg-black/5 rounded-[40px]" />)}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <Link to={`/gallery/${project.slug}`} className="group flex flex-col h-full">
                <div className="relative aspect-square rounded-[40px] overflow-hidden mb-6 shadow-2xl border border-black/5 bg-white">
                  <img 
                    src={normalizeUrl(project._embedded?.['wp:featuredmedia']?.[0]?.source_url)} 
                    alt={project.title?.rendered} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <div className={`p-8 rounded-[32px] flex items-center justify-between transition-all duration-500 flex-1 min-h-[120px] ${
                  i === 1 ? "bg-[#FF6B35] text-white shadow-2xl" : "bg-white text-black border border-black/5"
                }`}>
                  <span className="text-xl font-bold tracking-tight leading-tight pr-4">{project.title?.rendered}</span>
                  <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center mb-6">
            <Inbox size={32} className="text-black/20" />
          </div>
          <h3 className="text-2xl font-black text-black mb-2">No Projects Found In Our Gallery</h3>
          <p className="text-black/40 max-w-xs mx-auto">We are currently updating our portfolio. Please check back soon for our latest works.</p>
        </div>
      )}
    </section>
  );
}
