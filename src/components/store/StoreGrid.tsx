import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, ChevronDown, ChevronRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { getWooProducts } from "../../lib/woocommerce";

export default function StoreGrid() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadStore() {
      const data = await getWooProducts("frame-products");
      if (data && data.length > 0) setProducts(data);
    }
    loadStore();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p: any) => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div className="relative w-full md:w-64">
            <select className="w-full bg-white border border-black/5 rounded-xl px-6 py-4 text-[11px] font-bold uppercase tracking-widest appearance-none outline-none">
              <option>Select All Categories</option>
            </select>
            <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" />
          </div>
          <div className="relative w-full md:w-80">
            <input 
              type="text"
              placeholder="Search Product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-black/5 rounded-xl px-6 py-4 text-[11px] font-bold uppercase tracking-widest outline-none focus:border-[#FF6B35]"
            />
            <Search size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 mb-20">
          {filteredProducts.map((p: any, i: number) => (
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
                    i % 4 === 2 ? "bg-[#FF6B35] border-[#FF6B35] text-white shadow-lg scale-110" : "bg-white border-black/10 text-black hover:border-[#FF6B35]"
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
