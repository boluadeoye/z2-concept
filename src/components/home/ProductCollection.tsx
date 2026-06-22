import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { getWooProducts } from "../../lib/woocommerce";

const BasketIcon = ({ className = "w-4.5 h-4.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 10h16" /><path d="M5 10l1.5 8.5A2 2 0 0 0 8.5 20h7a2 2 0 0 0 2-1.5L19 10" /><path d="M9 10l3-6 3 6" /><line x1="10" y1="14" x2="10" y2="16" /><line x1="14" y1="14" x2="14" y2="16" />
  </svg>
);

interface ProductCollectionProps {
  title?: string;
  badge?: string;
  variant?: "default" | "minimal";
}

export default function ProductCollection({ 
  title = "Explore Our Frame Products", 
  badge = "Our Collections", 
  variant = "default" 
}: ProductCollectionProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      // RESTORED: Dynamic WooCommerce fetch query
      const data = await getWooProducts("frame-products");
      if (data && data.length > 0) {
        // ENFORCED: Limit rendering strictly to first 8 products in your database
        setProducts(data.slice(0, 8));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const isMinimal = variant === "minimal";

  return (
    <section className={`
      ${isMinimal ? "pt-16" : "py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]"} 
      text-center w-full
    `}>
      <div className="max-w-7xl mx-auto">
        
        {/* DYNAMIC HEADER */}
        <Reveal>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit mx-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
            <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">{badge}</span>
          </div>
          <h2 className={`text-3xl md:text-5xl font-black text-black tracking-tight leading-[1.1] mx-auto ${isMinimal ? "mb-12" : "mb-4 max-w-3xl"}`}>
            {title}
          </h2>
          {!isMinimal && (
            <p className="text-black/60 text-sm md:text-base leading-relaxed max-w-[50ch] mx-auto mb-16">
              We offer the printing of graphics, text, logos, and other branding elements onto packaging materials...
            </p>
          )}
        </Reveal>

        {loading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <span className="text-xs font-bold text-black/20 uppercase tracking-widest animate-pulse">Syncing Live WordPress Catalog...</span>
          </div>
        ) : (
          /* GRID: Sharp Edges & Correct Mobile Gutter (8 Items Max) */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 mb-20 text-left">
            {products.map((p: any) => (
              <Reveal key={p.id}>
                <Link to={`/product/${p.id}`} className="group block">
                  <div className="relative aspect-square rounded-none overflow-hidden mb-5 border border-black/5 shadow-sm bg-white">
                    <img src={p.images?.[0]?.src} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="flex items-end justify-between px-1">
                    <div className="max-w-[70%]">
                      <h3 className="text-[13px] md:text-[14px] font-bold text-black tracking-tight mb-1 truncate">{p.name}</h3>
                      <p className="text-black/40 text-[10px] md:text-xs font-bold">₦{Number(p.price || 0).toLocaleString()}</p>
                    </div>
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-black/10 bg-white text-black transition-all duration-300 group-hover:bg-[#FF6B35] group-hover:border-[#FF6B35] group-hover:text-white group-hover:shadow-lg">
                      <BasketIcon className="w-4 h-4 md:w-4.5 md:h-4.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {!isMinimal && (
          <Reveal>
            <Link to="/store" className="inline-flex items-center gap-3 px-10 py-5 rounded-full border border-black/10 bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] shadow-sm hover:bg-black hover:text-white transition-all">
              View All Products <ArrowUpRight size={16} strokeWidth={3} />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
