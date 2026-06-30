import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../shared/Reveal";
import { getWooProducts, getCategoryIdBySlug, sanitizeImageUrl } from "../../lib/woocommerce";

export default function ProductGridV2() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const catId = await getCategoryIdBySlug("frame-products");
      const data = await getWooProducts(catId || undefined);
      setProducts(data.slice(0, 6));
      setLoading(false);
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
            <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter">Premium Frames</h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading ? (
            [1,2,3].map(i => <div key={i} className="aspect-square bg-black/5 animate-pulse" />)
          ) : (
            products.map((p: any) => (
              <Reveal key={p.id}>
                <Link to={`/product/${p.id}`} className="group block">
                  <div className="relative aspect-square overflow-hidden mb-6 border border-black/5 bg-white">
                    <img 
                      src={sanitizeImageUrl(p.images?.[0]?.src)} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" 
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-tight text-black">{p.name}</h3>
                      <p className="text-[#FF6B35] text-xs font-bold">₦{Number(p.price).toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
