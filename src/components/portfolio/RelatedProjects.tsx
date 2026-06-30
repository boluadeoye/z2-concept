import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { getGalleryItems } from "../../lib/woocommerce";

const WP_DOMAIN = "https://sleigh.staymedia.ng";

const normalizeUrl = (url: string): string => {
  if (!url) return "";
  let clean = url.replace(/\\/g, "").replace(/"/g, "");
  if (clean.startsWith(WP_DOMAIN)) return clean.replace(WP_DOMAIN, "");
  return clean;
};

export default function RelatedProjects({ currentSlug }: { currentSlug?: string }) {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function loadRelated() {
      const data = await getGalleryItems();
      if (data && data.length > 0) {
        const filtered = data
          .filter((p: any) => p.slug !== currentSlug)
          .slice(0, 3);
        setProjects(filtered);
      }
    }
    loadRelated();
  }, [currentSlug]);

  if (projects.length === 0) return null;

  return (
    <div className="pt-24 border-t border-black/5">
      <Reveal>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit mx-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
          <span className="text-[10px] font-bold text-black/60 uppercase tracking-widest">More From Our Gallery</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-black text-center mb-16 tracking-tight">Related Projects</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <Reveal key={p.id}>
            <Link to={`/gallery/${p.slug}`} className="group block">
              <div className="relative aspect-square rounded-[32px] overflow-hidden mb-6 shadow-lg border border-black/5">
                <img 
                  src={normalizeUrl(p._embedded?.["wp:featuredmedia"]?.[0]?.source_url)} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={p.title?.rendered} 
                />
              </div>
              <div className="bg-white p-8 rounded-[24px] flex items-center justify-between border border-black/5 group-hover:border-[#FF6B35] transition-all">
                <h3 className="text-lg font-bold text-black tracking-tight pr-4">{p.title?.rendered}</h3>
                <div className="w-10 h-10 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center">
                  <ArrowUpRight size={20} strokeWidth={3} className="rotate-45" />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
