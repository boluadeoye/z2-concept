import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../shared/Reveal";
import { getWooProducts, sanitizeImageUrl } from "../../lib/woocommerce";

const BasketIcon = ({ className = "w-4.5 h-4.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 10h16" /><path d="M5 10l1.5 8.5A2 2 0 0 0 8.5 20h7a2 2 0 0 0 2-1.5L19 10" /><path d="M9 10l3-6 3 6" /><line x1="10" y1="14" x2="10" y2="16" /><line x1="14" y1="14" x2="14" y2="16" />
  </svg>
);

export default function ProductGridV2() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getWooProducts("frame-products");
      if (data && data.length > 0) {
        // STRICT: Lock to exactly 6 items (3x2 Grid)
        setProducts(data.slice(0, 6));
      }
    }
    loadData();
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <Reveal>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 mb-6 w-fit mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span className="font-mono text-[10px] text-black/60 font-bold uppercase tracking-widest">Shop</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight">Premium Frames</h2>
          </Reveal>
        </div>

        {/* 3-COLUMN, 2-ROW GRID (No rounded edges) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p: any) => (
            <Reveal key={p.id}>
              <Link to={`/product/${p.id}`} className="group block">
                <div className="relative aspect-square rounded-none overflow-hidden mb-6 border border-black/5 shadow-sm bg-white">
                  <img src={sanitizeImageUrl(p.images?.[0]?.src)} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex items-end justify-between px-1">
                  <div className="max-w-[70%]">
                    <h3 className="text-[14px] font-bold text-black tracking-tight mb-1 truncate">{p.name}</h3>
                    <p className="text-black/40 text-xs font-bold">₦{Number(p.price || 0).toLocaleString()}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-black/10 bg-white text-black transition-all duration-300 group-hover:bg-[#FF6B35] group-hover:border-[#FF6B35] group-hover:text-white group-hover:shadow-lg">
                    <BasketIcon />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
