import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { getWooProducts } from "../../lib/woocommerce";

export default function ProductCollection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getWooProducts("frame-products");
      if (data && data.length > 0) setProducts(data);
    }
    loadData();
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12">
          {products.map((p: any, i: number) => (
            <Reveal key={p.id}>
              <Link to={`/product/${p.id}`} className="group block">
                <div className="relative aspect-square rounded-[24px] overflow-hidden mb-6 border border-black/5 shadow-sm bg-white">
                  <img src={p.images?.[0]?.src} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex items-end justify-between px-1">
                  <div className="max-w-[70%]">
                    <h3 className="text-[13px] font-bold text-black uppercase tracking-tight mb-1 truncate">{p.name}</h3>
                    <p className="text-black/40 text-[11px] font-bold">₦{p.price}</p>
                  </div>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                    i % 4 === 2 ? "bg-[#FF6B35] border-[#FF6B35] text-white shadow-lg" : "bg-white border-black/10 text-black hover:border-[#FF6B35]"
                  }`}>
                    <ShoppingBag size={16} strokeWidth={2.5} />
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
