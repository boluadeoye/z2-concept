import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, AlertTriangle, Inbox } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { getGalleryItems, getGalleryCategories, sanitizeImageUrl, extractContentImage } from "../../lib/woocommerce";

export default function PortfolioGrid() {
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const mapGalleryData = (data: any[]) => {
    return (data || []).map((item: any) => {
      // 1. Try Featured Image
      const featured = item._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      // 2. Fallback to Content Image (Greedy Parser)
      const contentImg = extractContentImage(item.content?.rendered || "");
      
      return {
        id: item.id,
        slug: item.slug,
        title: item.title?.rendered || "Untitled Project",
        img: sanitizeImageUrl(featured || contentImg)
      };
    });
  };

  useEffect(() => {
    async function initGallery() {
      setLoading(true);
      try {
        const [catData, itemData] = await Promise.all([
          getGalleryCategories(),
          getGalleryItems()
        ]);
        setCategories(catData || []);
        setProjects(mapGalleryData(itemData));
      } catch (error) {
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
      const data = await getGalleryItems(id || undefined);
      setProjects(mapGalleryData(data));
    } catch (e) {
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

      {categories.length > 0 && (
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
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3].map((i) => <div key={i} className="aspect-square bg-black/5 rounded-[40px]" />)}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <Link 
                to={`/gallery/${project.slug}`} 
                className="group flex flex-col h-full min-h-[450px] relative"
              >
                <div className="relative aspect-square rounded-[40px] overflow-hidden mb-6 shadow-2xl border border-black/5 bg-white flex-shrink-0">
                  {project.img ? (
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x600/FDF8F0/8B7E3D?text=Media+Loading";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black/5 text-black/20 font-black text-xs gap-2">
                      <AlertTriangle size={24} />
                      <p>MEDIA MISSING</p>
                    </div>
                  )}
                </div>
                <div className="p-8 rounded-[32px] bg-white text-black border border-black/5 flex items-center justify-between transition-all duration-500 group-hover:bg-[#FF6B35] group-hover:text-white group-hover:shadow-2xl group-hover:shadow-[#FF6B35]/30 flex-1">
                  <span className="text-xl font-bold tracking-tight leading-tight pr-4">
                    {project.title}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center justify-center text-center">
          <Inbox size={48} className="text-black/10 mb-4" />
          <h3 className="text-2xl font-black text-black mb-2">No Projects Found</h3>
          <p className="text-black/40">Check back soon for our latest works.</p>
        </div>
      )}
    </section>
  );
}
