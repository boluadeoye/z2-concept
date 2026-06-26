import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { Reveal } from "../shared/Reveal";
import { getWooProducts, sanitizeImageUrl } from "../../lib/woocommerce";
import { useCart } from "../../context/CartContext";

const BasketIcon = ({ className = "w-4.5 h-4.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 10h16" /><path d="M5 10l1.5 8.5A2 2 0 0 0 8.5 20h7a2 2 0 0 0 2-1.5L19 10" /><path d="M9 10l3-6 3 6" /><line x1="10" y1="14" x2="10" y2="16" /><line x1="14" y1="14" x2="14" y2="16" />
  </svg>
);

export default function StoreGrid() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadStore() {
      const data = await getWooProducts("frame-products");
      if (data && data.length > 0) setProducts(data);
    }
    loadStore();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p: any) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [products, searchQuery]);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#FDF8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-16">
          <div className="relative w-full md:w-64">
            <select className="w-full bg-white border border-black/5 rounded-xl px-6 py-4 text-[11px] font-bold uppercase tracking-widest appearance-none outline-none">
              <option>Select All Categories</option>
            </select>
            <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" />
          </div>
          <div className="relative w-full md:w-80">
            <input type="text" placeholder="Search Product" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white border border-black/5 rounded-xl px-6 py-4 text-[11px] font-bold uppercase tracking-widest outline-none focus:border-[#FF6B35]" />
            <Search size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-black/40" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-16 mb-20">
          {filteredProducts.map((p: any) => (
            <Reveal key={p.id}>
              <Link to={`/product/${p.id}`} className="group block">
                <div className="relative aspect-square rounded-none overflow-hidden mb-6 border border-black/5 shadow-sm bg-white">
                  <img 
                    src={sanitizeImageUrl(p.images?.[0]?.src)} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <div className="flex items-end justify-between px-1">
                  <div className="max-w-[70%]">
                    <h3 className="text-[14px] font-bold text-black tracking-tight mb-1 truncate">{p.name}</h3>
                    <p className="text-black/40 text-xs font-bold">₦{Number(p.price || 0).toLocaleString()}</p>
                  </div>
                  <button onClick={(e) => { e.preventDefault(); addToCart(p, 1); }} className="w-10 h-10 rounded-full flex items-center justify-center border border-black/10 bg-white text-black transition-all duration-300 group-hover:bg-[#FF6B35] group-hover:border-[#FF6B35] group-hover:text-white group-hover:shadow-lg">
                    <BasketIcon />
                  </button>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
