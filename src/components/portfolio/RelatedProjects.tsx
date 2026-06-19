import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { getWPPortfolios } from "../../lib/woocommerce";

interface RelatedProjectsProps {
  currentSlug?: string;
}

export default function RelatedProjects({ currentSlug }: RelatedProjectsProps) {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function loadRelated() {
      const data = await getWPPortfolios();
      if (data && data.length > 0) {
        const filtered = data
          .filter((p: any) => p.slug !== currentSlug)
          .slice(0, 3)
          .map((p: any) => ({
            title: p.title?.rendered,
            slug: p.slug,
            img: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url
          }))
          .filter((p: any) => p.img); // Only show if it has an image
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
          <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">More From Our Portfolio</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-black text-center mb-16 tracking-tight">Related Projects</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <Reveal key={i}>
            <Link to={`/portfolio/${p.slug}`} className="group block cursor-pointer">
              <div className="relative aspect-square rounded-[32px] overflow-hidden mb-6 shadow-lg border border-black/5">
                <img src={p.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.title} />
              </div>
              <div className="bg-white p-8 rounded-[24px] flex items-center justify-between border border-black/5 group-hover:border-[#FF6B35] transition-all">
                <h3 className="text-lg font-bold text-black tracking-tight pr-4">{p.title}</h3>
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
