import React, { useState, useEffect } from "react";
import { Reveal } from "../shared/Reveal";
import { getWPGalleries, sanitizeImageUrl } from "../../lib/woocommerce";

const categories = [
  { name: "All", slug: "" },
  { name: "Wedding", slug: "wedding" },
  { name: "Birthday", slug: "birthday" },
  { name: "Graduation", slug: "graduation" }
];

export default function GalleryGrid() {
  const [items, setItems] = useState<any[]>([]);
  const [activeCat, setActiveCat] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      setLoading(true);
      const data = await getWPGalleries(activeCat);
      const mapped = data.map((item: any) => ({
        id: item.id,
        img: sanitizeImageUrl(item._embedded?.['wp:featuredmedia']?.[0]?.source_url || "")
      }));
      setItems(mapped);
      setLoading(false);
    }
    loadGallery();
  }, [activeCat]);

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-20">
          <Reveal>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">Our Gallery</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-[1.1] max-w-2xl">
              Kefee Home Productions X Z2 Concepts Your Media Partner
            </h2>
          </Reveal>
        </div>

        {/* FILTER BAR */}
        <div className="flex overflow-x-auto no-scrollbar gap-3 mb-16 pb-4 border-b border-black/5">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCat(cat.slug)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCat === cat.slug 
                  ? "bg-[#FF6B35] text-white shadow-xl" 
                  : "bg-white border border-black/5 text-black/40 hover:border-black/20"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* IMAGE GRID */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-black/5 rounded-[32px]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05}>
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-xl border border-black/5 group bg-white">
                  <img 
                    src={item.img} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Gallery Item" 
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
